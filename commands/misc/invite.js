const { MessageActionRow, MessageButton } = require('discord.js');
const config = require('../../config/config.json');

module.exports = {
    name: 'invite',
    description: 'Provides a link to users to allow them to invite other users to the server.',
    aliases: ['join', 'linky', 'invitation'],
    usage: `${config.prefix}invite`,
    example: `${config.prefix}invite or ${config.prefix}join`,
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
          message.reply({ content: 'So, you want to invite someone to our server? Use this link: https://discord.gg/geQEUBm', components: [row]});
        } else {
          message.channel.send({ content: 'So, you want to invite someone to our server? Use this link: https://discord.gg/geQEUBm', components: [row]});
        }
    },
  };