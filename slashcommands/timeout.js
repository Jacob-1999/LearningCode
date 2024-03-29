const durations = [
  { name: "60 seconds", value: 60 * 1000 },
  { name: "5 minutes", value: 5 * 60 * 1000 },
  { name: "10 minutes", value: 10 * 60 * 1000 },
  { name: "30 minutes", value: 30 * 60 * 1000 },
  { name: "1 hour", value: 60 * 60 * 1000 },
  { name: "1 day", value: 24 * 60 * 60 * 1000 },
  { name: "1 week", value: 7 * 24 * 60 * 60 * 1000 },
]

const run = async (client, interaction) => {
  let member = interaction.options.getMember("user")
  let duration = interaction.options.getNumber("duration")
  let reason = interaction.options.getString("reason") || "No reason given."

  if (!member) return interaction.reply("Invalid user")

  try {
    await member.timeout(duration, reason)
    return interaction.reply(`<:ic_timeout:958054710273794118> ${member.user.tag} has been timedout for ${durations.find(d=> duration === d.value)?.name} (\`${reason}\`)`)
  }
  catch(err){
    if (err)
      console.log(err)
      return interaction.reply(`<:ic_interactionfail:958054549996863558> Failed to timeout ${member.user.tag}`)
  }
}

module.exports = {
  name: "timeout",
  description: "Timeout a user",
  perm: "MODERATE_MEMBERS",
  options: [
    {
      name: "user", description: "The user to timeout",
      type: "USER", required: true
    },
    {
      name: "duration",
      description: "The duration of the timeout",
      type: "NUMBER",
      choices: durations,
      required: true

    },
    {
      name: "reason",
      description: "Reason for timeout",
      type: "STRING",
      required: false
    }
  ], run
}