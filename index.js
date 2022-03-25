const Discord = require("discord.js")
const slashcommands = require("./handlers/slashcommands")
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
client.slashcommands = new Discord.Collection()

client.loadEvents = (bot, reload) => require("./handlers/events")(bot, reload)
client.loadCommands = (bot, reload) => require("./handlers/commands")(bot, reload)
client.loadSlashCommands = (bot, reload) => require("./handlers/slashcommands")(bot, reload)

client.loadEvents(bot, false)
client.loadCommands(bot, false)
client.loadSlashCommands(bot, false)

client.on("interactionCreate", (interaction) => {
  if (!interaction.isCommand()) return
  if (!interaction.inGuild()) return interaction.reply("This command can only be used in a server.")

  const slashcmd = client.slashcommands.get(interaction.commandName)
  if (!slashcmd) return interaction.reply("Invalid slash command.")

  if (slashcmd.perms && !interaction.member.permissions.has(slashcmd.perm))
    return interaction.reply("You do not have permission to run this command.")

  slashcmd.run(client, interaction)
  })


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