const { ActionRowBuilder, ButtonBuilder } = require('discord.js');

module.exports = {
  name: 'faq',
  description: 'Tells users to check out our FAQ channel and docs to get their simple questions answered.',
  usage: `/faq @username or user ID`,
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
      user.send({ content: `Hey, ${user.username}! Please check out the <#742604331215487006> channel or the <#742594501922652260> channel as we have a lot of questions answered in those two places. If it isn\'t answered there then you may leave your question here for others to help you answer. Thank you!\nYou can also check the links below to see if your question was answered.`, components: [row] });
      interaction.reply({ content: `📨 Hey, ${user} I just sent you a DM with a link to our FAQs! Please check it!` });

  },

};