// main.js or index.js, however you want to call it
const token = process.env['token']
const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
  ]
});

const accountSchema = require("./schemas/account.js")

const mongoose = require('mongoose')

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
    
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

client.once('ready', async () => {
	console.log('Ready!');
  await mongoose.connect(
    process.env['connectionString'],
    {
      'keepAlive': true
    }
  )

  setTimeout(async () => {
    await new accountSchema({
      
    }).save()
  }, 1000)
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(client, interaction);
	} catch (error) {
		console.error(error);
		return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(token);