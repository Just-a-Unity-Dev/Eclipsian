const { Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "balance",
    description: "Query a user's Neothereum amount to the database.",
    type: 'CHAT_INPUT',
    options: [
        {
            name: "user",
            description: "User to register to the database.",
            type: "USER",
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
        const [ user ] = args;
        const member = interaction.guild.members.cache.get(user)

        const data = await accountSchema.findOne({ user_id: member.id })

        if (data) {
            interaction.followUp(`User **${member.user}** has a balance of ${data.neothereum} Neothereum.`)
            console.log(data)
        } else {
            new accountSchema({
                user_id: member.user.id,
                neothereum: 0,
            }).save();
            interaction.followUp(`User **${member.user}** has a balance of 0 Neothereum.`)
        }

    },
};