const {
  token
} = require('../config.json')
const {
  Client,
  Collection,
  GatewayIntentBits
} = require('discord.js')
const fs = require('fs')

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.DirectMessages]
})

client.commands = new Collection()
client.commandArrayGlobal = []
client.commandArrayLocal = []

const functionFolders = fs.readdirSync('./src/functions')
for (const folder of functionFolders) {
  const functionFiles = fs.readdirSync(`./src/functions/${folder}`).filter(file => file.endsWith('.js'))
  for (const file of functionFiles) require(`./functions/${folder}/${file}`)(client)
}

client.handleEvents()
client.handleGlobalCommands()
client.handleLocalCommands()
client.login(token)

// Expired Cooldowns
const blacklistedGuilds = require('./models/blacklistGuild')
const blacklistedUsers = require('./models/blacklistUser')
const commandCooldowns = require('./models/cooldowns')
const robCooldowns = require('./models/robCooldowns')
const robCooldownsSus = require('./models/robCooldownsSus')
const recentCommandSchema = require('./models/recentCommands')

const check = async () => {
  const query = {
    expires: {
      $lt: new Date()
    },
  }

  await blacklistedGuilds.deleteMany(query)
  await blacklistedUsers.deleteMany(query)
  await commandCooldowns.deleteMany(query)
  await robCooldowns.deleteMany(query)
  await robCooldownsSus.deleteMany(query)
  await recentCommandSchema.deleteMany(query)
  setTimeout(check, 1000 * 1)
}
check()