const { Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "pay",
    description: "Set a user's balance to the database. Only usable by workers",
    type: 'CHAT_INPUT',
    options: [
        {
            name: "user",
            description: "User to get paid.",
            type: "USER",
            required: true,
        },
        {
            name: "amount",
            description: "Amount to send.",
            type: "NUMBER",
            required: true
        }
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const accountSchema = require("../../models/account")
        const [ user, amount ] = args;
        const author = interaction.member
        const member = interaction.guild.members.cache.get(user)

        if (amount < 0) { amount *= -1 }

        const data = await accountSchema.findOne({ user_id: member.id})
        const authorData = await accountSchema.findOne({ user_id: author.id})

        if (data && authorData) {
            if ((authorData.neothereum - amount) < 0) {return interaction.followUp(`You need ${(authorData.neothereum - amount) * -1} more Neothereum to do this transaction!`) }
            // lazy way but it works, dnc
            const authorPreviousAmount = authorData.neothereum
            const userPreviousAmount = data.neothereum
            await accountSchema.deleteOne({
                user_id: member.user.id
            })
            await accountSchema.deleteOne({
                user_id: author.user.id
            })
            new accountSchema({
                user_id: member.user.id,
                neothereum: userPreviousAmount + amount,
            }).save();
            new accountSchema({
                user_id: author.user.id,
                neothereum: authorPreviousAmount - amount,
            }).save();
            console.log(await accountSchema.findOne({ user_id: member.id}))
            interaction.followUp(`User **${member.user}**'s balance has been increased to **${amount}** Neothereum`)
        } else {
            interaction.followUp(`You or the other party does not exist in the database! Check their and your balance to see if they have an account!`)
        }

    },
};