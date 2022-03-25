const Discord = require("discord.js")
require("dotenv").config()

const client = new Discord.Client({
  intents: [
    "GUILDS",
    "GUILD_MESSAGES",
    "GUILD_MEMBERS"
  ]
})

client.on("ready", () => {
  console.log(`Logged into ${client.user.tag}`)
})

client.on("messageCreate", (message) => {
  if (message.content == "ping"){
    message.reply("pong")
  }
})

const welcomeChannelID = "956721846240301077"

client.on("guildMemberAdd", (member) => {
  member.guild.channels.cache.get(welcomeChannelID).send(`(${member.id}) **${member.user.tag}** has joined.`)
})

client.login(process.env.TOKEN)