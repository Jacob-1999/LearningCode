module.exports = {
  name:"ready",
  run: async (bot) => {
    console.log("Logged into " + bot.client.user.tag)
  }
}