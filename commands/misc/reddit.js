const { MessageActionRow, MessageButton } = require('discord.js');
const config = require('../../config/config.json');

module.exports = {
    name: 'reddit',
    description: 'Provides a link to our Subreddit.',
    aliases: ['subreddit', 'other'],
    usage: `${config.prefix}reddit`,
    example: `${config.prefix}reddit or ${config.prefix}subreddit`,
    execute(message) {
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setLabel('Our Website')
            .setStyle('LINK')
            .setURL('https://codinghelp.site'),
          new MessageButton()
            .setLabel('Our Subreddit')
            .setStyle('LINK')
            .setURL('https://reddit.com/r/CodingHelp'),
          new MessageButton()
            .setLabel('Our Discord')
            .setStyle('LINK')
            .setURL('https://discord.gg/geQEUBm')
        );
        if (message.reference === null) { // just a regular message
          message.reply({ content: 'So, you want a link to our subreddit? Here it is! https://reddit.com/r/CodingHelp', components: [row]});
        } else {
          message.channel.send({ content: 'So, you want a link to our subreddit? Here it is! https://reddit.com/r/CodingHelp', components: [row]});
        }
    },
  };