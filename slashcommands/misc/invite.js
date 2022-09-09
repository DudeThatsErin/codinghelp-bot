const { ActionRowBuilder, ButtonBuilder } = require('discord.js');

module.exports = {
    name: 'invite',
    description: 'Provides a link to users to allow them to invite other users to the server.',
    usage: `/invite`,
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

        interaction.reply({ content: 'So, you want to invite someone to our server? Use this link: https://discord.gg/geQEUBm', components: [row], ephemeral: true});

    },
  };