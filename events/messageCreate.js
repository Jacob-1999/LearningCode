const Discord = require("discord.js")

module.exports = {
  name: "messageCreate",
  run: async function runAll(bot, message) {
    const {client, prefix, owners} = bot

    if(!message.guild) return

    if (message.author.bot) return

    if(!message.content.startsWith(prefix))
      return

    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const cmdstr = args.shift().toLowerCase()

    let command = client.commands.get(cmdstr)
    if (!command) return

    let member = message.member

    if (command.devOnly && !owners.includes(member.id)){
      return message.reply("<:ic_interactionfail:958054549996863558> This is an owner only command.")
    }

    if (command.permissions && member.permissions.missing(command.permissions).length !== 0){
      return message.reply("<:ic_interactionfail:958054549996863558> You do not have permission to run this command.")
    }

    try {
      await command.run({...bot, message, args})
    }
    catch (err) {
      let errMsg = err.toString()

      if (errMsg.startsWith("?")) {
        errMsg = errMsg.slice(1)
        await message.reply(errMsg)
      }
      else
        console.error(err)
    }
  } 
}