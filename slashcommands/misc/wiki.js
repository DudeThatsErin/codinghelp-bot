const { ActionRowBuilder, ButtonBuilder } = require('discord.js');

module.exports = {
    name: 'wiki',
    description: 'Provides a link to our Website.',
    usage: `/wiki`,
    execute(interaction) {
      const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setLabel('Our Subreddit')
            .setStyle(5)
            .setURL('https://reddit.com/r/CodingHelp'),
          new ButtonBuilder()
            .setLabel('Our Discord')
            .setStyle(5)
            .setURL('https://discord.gg/geQEUBm')
        );
          interaction.reply({ content: 'So, you want a link to our wiki? Here it is! https://codinghelp.site', components: [row]});
    },
  };