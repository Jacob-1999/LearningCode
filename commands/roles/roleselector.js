const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js")

module.exports = {
  name: "roleselector",
  category: "roles",
  devOnly: true,
  run: async ({client, message, args}) => {
    message.channel.send({
      embeds: [
        new MessageEmbed().setTitle("Select role").setDescription("Select roles from buttons below").setColor("BLURPLE")
      ],
      components: [
        new MessageActionRow().addComponents([
          new MessageButton().setCustomId("role-953410735390752858").setStyle("PRIMARY").setLabel("Special")
        ])
      ]
    })
  }
}