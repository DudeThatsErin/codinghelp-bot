const config = require('../../config/config.json');
module.exports = {
  name: 'wrong-channel',
  description: 'Tells people to ask in a different channel and deletes their message. This deletes 2 messages, the one where you ping the bot and the one right above that.',
  aliases: ['diffch', 'different-channel', 'wrong-ch', 'wrongchannel', 'wrongch'],
  usage: `${config.prefix}wrong-channel @username or user ID`,
  example: `${config.prefix}wrong-channel @DudeThatsErin`,
  execute(message, args) {

    if (message.reference === null) { // just a regular message
      const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
      if (!user) {
        message.channel.send({ content: 'You need to specify a user via mention or the ID.' });
        message.delete();
        return;
      }
      else {
        let usr = message.mentions.members.first();
        message.channel.send({ content: `Hey, ${usr}! This isn\'t the correct channel for your question. Please check our <#1006278480968810516> on the left and ask repost in a different channel. Thank you!` });
      }
    } else {
      const user = message.mentions.repliedUser;
      message.channel.send({content: `Hey, ${user}! This isn\'t the correct channel for your question. Please check our <#1006278480968810516> on the left and ask repost in a different channel. Thank you!`});
    }
  }
};