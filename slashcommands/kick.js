const run = async (client, interaction) => {
  let member = interaction.options.getMember("user")
  let reason = interaction.options.getString("reason") || "No reason given."

  if (!member) return interaction.reply("Invalid user")

  try {
    await interaction.guild.members.kick(member, reason)
    return interaction.reply(`<:ic_kick:958054550005227581> ${member.user.tag} has been kicked (\`${reason}\`)`)
  }
  catch(err){
    if (err)
      console.log(err)
      return interaction.reply(`<:ic_interactionfail:958054549996863558> Failed to kick ${member.user.tag}`)
  }
}

module.exports = {
  name: "kick",
  description: "Kick a user",
  perm: "KICK_MEMBERS",
  options: [
    {
      name: "user", description: "The user to kick",
      type: "USER", required: true
    },
    {
      name: "reason",
      description: "Reason for kick",
      type: "STRING",
      required: false
    }
  ], run
}