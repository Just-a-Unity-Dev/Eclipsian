const { Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "set",
    description: "Set a user's balance to the database. Only usable by workers",
    type: 'CHAT_INPUT',
    options: [
        {
            name: "user",
            description: "User to register to the database.",
            type: "USER",
            required: true,
        },
        {
            name: "amount",
            description: "Amount to set to the database.",
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
        if (!interaction.member.roles.cache.has("928135978844033065")) {return interaction.reply("You are not a worker!")}
        if (interaction.author) {}
        //TODO
        //Add a restriction to regulars that prevent them from using this command
        const accountSchema = require("../../models/account")
        const [ user, amount ] = args;
        const member = interaction.guild.members.cache.get(user)

        const data = await accountSchema.findOne({ user_id: member.id})

        if (data) {
            // lazy way but it works, dnc
            await accountSchema.deleteOne({
                user_id: member.id
            })
            new accountSchema({
                user_id: member.user.id,
                neothereum: amount,
            }).save();
            console.log(await accountSchema.findOne({ user_id: member.id}))
            interaction.followUp(`User **${member.user}**'s balance has been set to **${amount}** Neothereum`)
        } else {
            new accountSchema({
                user_id: member.user.id,
                neothereum: amount,
            }).save();
            interaction.followUp(`User **${member.user}** has been registered in the database with starting balance of **${amount}** Neotheruem.`)
        }

    },
};