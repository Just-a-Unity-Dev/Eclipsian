require('dotenv').config()
const { Client, Collection } = require("discord.js");

const client = new Client({ 
    intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_PRESENCES', 'GUILD_BANS', 'GUILD_VOICE_STATES', 'GUILD_MEMBERS', 'DIRECT_MESSAGES'],
    partials: ['CHANNEL']
});
module.exports = client;

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");

// Initializing the project
require("./handler")(client);

client.login(process.env.TOKEN);