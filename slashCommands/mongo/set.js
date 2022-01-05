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
        console.log(interaction.author)
        if (interaction.author) {}
        //TODO
        //Add a restriction to regulars that prevent them from using this command
        const accountSchema = require("../../models/account")
        const [ user ] = args;
        const member = interaction.guild.members.cache.get(user)

        const data = await accountSchema.findOne({ user_id: member.id})

        if (data) {
            interaction.followUp("User is already registered!")
        } else {
            new accountSchema({
                user_id: member.user.id,
                neotheruem: 0,
            }).save();
            interaction.followUp(`User **${member.user}** has been registered in the database with starting balance of 0 Neotheruem.`)
        }

    },
};