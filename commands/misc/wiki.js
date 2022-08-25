const { ActionRowBuilder, ButtonBuilder } = require('discord.js');
const config = require('../../config/config.json');

module.exports = {
    name: 'wiki',
    description: 'Provides a link to our Website.',
    aliases: ['kb', 'knowledgebase', 'site', 'website'],
    usage: `${config.prefix}wiki`,
    example: `${config.prefix}wiki or ${config.prefix}kb`,
    execute(message) {
      const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setLabel('Our Website')
            .setStyle('LINK')
            .setURL('https://codinghelp.site'),
          new ButtonBuilder()
            .setLabel('Our Subreddit')
            .setStyle('LINK')
            .setURL('https://reddit.com/r/CodingHelp'),
          new ButtonBuilder()
            .setLabel('Our Discord')
            .setStyle('LINK')
            .setURL('https://discord.gg/geQEUBm')
        );
        if (message.reference === null) { // just a regular message
          message.reply({ content: 'So, you want a link to our wiki? Here it is! https://codinghelp.site', components: [row]});
        } else {
          message.channel.send({ content: 'So, you want a link to our wiki? Here it is! https://codinghelp.site', components: [row]});
        }
    },
  };