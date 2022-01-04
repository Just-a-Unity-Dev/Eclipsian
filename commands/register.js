const { SlashCommandBuilder, Permissions } = require('@discordjs/builders');
const accountSchema = require("./../schemas/account.js")
// register a user (admin only)

const mongoose = require('mongoose')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('register')
		.setDescription('Register a user')
    .addUserOption(option => option.setName('user').setDescription('The user to register').setRequired(true)),
	async execute(client, interaction) {
    if (!interaction.member.roles.cache.has('926788900083630102')) { return interaction.reply(`${interaction.member}, you are not a Worker!`) }
    const query = await accountSchema.findOne({
      user_id: String(interaction.member.user.id)
    })
    console.log(query)
    if (query != null){

    }
    console.log("thing: " + String(interaction.member.user.id))
		return interaction.reply(`${query}`);
	},
};