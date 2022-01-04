const { SlashCommandBuilder } = require('@discordjs/builders');
// ping command

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(client, interaction) {
		return interaction.reply(`:ping_pong: Pong! API Latency is: ${Math.round(client.ws.ping)}ms`);
	},
};