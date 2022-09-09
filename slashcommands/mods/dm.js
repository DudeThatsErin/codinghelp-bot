const { ActionRowBuilder, ButtonBuilder } = require('discord.js');

module.exports = {
  name: 'dm',
  description: 'Shoots an official embed to a user that is replied to or pinged.',
  usage: `/dm <@username> [message to them here]`,
  example: `/dm @DudeThatsErin Please stop spamming the server. Thank you!`,
  options: [
		{
			name: 'user',
			description: 'Who are you sending this message to?',
			required: true,
			type: 6
		},
    {
      name: 'message',
      description: 'What would you like to say to them?',
      required: true,
      type: 3
    }
	],
  modOnly: 1,
  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const saying = interaction.options.getString('message');

    const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setLabel('Our Website')
        .setStyle(5)
        .setURL('https://codinghelp.site'),
      new ButtonBuilder()
        .setLabel('Our Subreddit')
        .setStyle(5)
        .setURL('https://reddit.com/r/CodingHelp')
    );
    //console.log('args 0 ', args[0])

      const dm = {
        color: 0x1e1b49,
        title: `You received a DM from r/CodingHelp`,
        thumbnail: {
          url: 'https://imgur.com/U6cwQxj.png'
        },
        description: `<@${interaction.user.id}> sent you the following message:\n\n${saying}\n\nIf you have any questions, please send a message to <@575252669443211264>.`,
        timestamp: new Date(),
        footer: {
          text: `This is not an official warning.`,
          icon_url: 'https://imgur.com/U6cwQxj.png'
        }
      }
      user.send({ content: `Hey, ${user.username}!`, embeds: [dm], components: [row] });
      interaction.reply({content: 'I have sent your message to the user!', ephemeral: true})
  },

}