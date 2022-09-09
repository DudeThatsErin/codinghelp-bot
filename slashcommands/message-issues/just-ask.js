const { ActionRowBuilder, ButtonBuilder } = require('discord.js');

module.exports = {
  name: 'justask',
  description: 'Tells users to just ask their question.',
  usage: `/justask @username or userID`,
  example: `/justask @DudeThatsErin#8736`,
  options: [
    {
      name: 'user',
      description: 'Who?',
      required: true,
      type: 6
    }
  ],
  execute(interaction) {
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

      const user = interaction.options.getUser('user');
      user.send({ content: `Hey, ${user}!\n\nPlease just ask your question according to our rules. Rule 2 explains that you should just ask instead of asking any of the following questions. Click either of the links below as your question could have been answered there as well.\n**Do not ask the following quesitons:**\n\`\`\`css\nIs anyone available?\nCan someone please help me?\nWhenever someone gets online, can you help me?\n\`\`\``, components: [row] });
      interaction.reply({ content: `📨 Hey, ${user.username} I just sent you a DM! Please check it!` });
  },

};