const { Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "exists",
    description: "Query a user to the database.",
    type: 'CHAT_INPUT',
    options: [
        {
            name: "user",
            description: "User to query in the database.",
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
        const member = client.users.fetch(user)

        const data = await accountSchema.findOne({ user_id: member.user.id})

        if (data) {
            interaction.followUp("User is already registered!")
        } else {
            interaction.followUp("User is not registered!")
        }

    },
};