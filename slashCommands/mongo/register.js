const { Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "register",
    description: "Register a user to the database. Only usable by workers",
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
        if (!interaction.member.roles.find(r => r.id === "926788900083630102")) {return interaction.reply("You are not a worker!")}
        // above is the error

        const accountSchema = require("../../models/account")
        const [ user ] = args;
        const member = interaction.guild.members.cache.get(user)

        const data = await accountSchema.findOne({ user_id: member.id})

        if (data) {
            interaction.followUp("User is already registered!")
        } else {
            new accountSchema({
                user_id: member.user.id,
                neothereum: 0,
                
            }).save();
            interaction.followUp(`User **${member.user}** has been registered in the database with starting balance of 0 Neothereum.`)
        }

    },
};