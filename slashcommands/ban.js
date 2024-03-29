const run = async (client, interaction) => {
  let member = interaction.options.getMember("user")
  let reason = interaction.options.getString("reason") || "No reason given."

  if (!member) return interaction.reply("Invalid user")

  try {
    await interaction.guild.bans.create(member, {
      reason
    })
    return interaction.reply(`<:ic_ban:958054549606789250> ${member.user.tag} has been banned (\`${reason}\`)`)
  }
  catch(err){
    if (err)
      console.log(err)
      return interaction.reply(`<:ic_interactionfail:958054549996863558> Failed to ban ${member.user.tag}`)
  }
}

module.exports = {
  name: "ban",
  description: "Ban a user",
  perm: "BAN_MEMBERS",
  options: [
    {
      name: "user", description: "The user to ban",
      type: "USER", required: true
    },
    {
      name: "reason",
      description: "Reason for ban",
      type: "STRING",
      required: false
    }
  ], run
}