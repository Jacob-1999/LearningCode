const Discord = require("discord.js")
require("dotenv").config()

const client = new Discord.Client({
  intents: [
    "GUILDS",
    "GUILD_MESSAGES",
    "GUILD_MEMBERS"
  ]
})

let bot = {
  client,
  prefix: "!",
  owners: ["203580370132795392"]
}

client.commands = new Discord.Collection()
client.events = new Discord.Collection()

client.loadEvents = (bot, reload) => require("./handlers/events")(bot, reload)
client.loadCommands = (bot, reload) => require("./handlers/commands")(bot, reload)

client.loadEvents(bot, false)
client.loadCommands(bot, false)

module.exports = bot

// client.on("ready", () => {
//   console.log(`Logged into ${client.user.tag}`)
// })

// client.on("messageCreate", (message) => {
//   if (message.content == "ping"){
//     message.reply("pong")
//   }
// })

// const welcomeChannelID = "956721846240301077"

// client.on("guildMemberAdd", (member) => {
//   member.guild.channels.cache.get(welcomeChannelID).send(`(${member.id}) **${member.user.tag}** has joined.`)
// })

client.login(process.env.TOKEN)