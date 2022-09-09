const { ActionRowBuilder, ButtonBuilder } = require('discord.js');

module.exports = {
    name: 'reddit',
    description: 'Provides a link to our Subreddit.',
    usage: `/reddit`,
    execute(interaction) {
      const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setLabel('Our Website')
            .setStyle(5)
            .setURL('https://codinghelp.site'),
          new ButtonBuilder()
            .setLabel('Our Discord')
            .setStyle(5)
            .setURL('https://discord.gg/geQEUBm')
        );

          interaction.reply({ content: 'So, you want a link to our subreddit? Here it is! https://reddit.com/r/CodingHelp', components: [row]});

    },
  };