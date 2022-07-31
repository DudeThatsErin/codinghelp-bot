const config = require('../../config/config.json');

module.exports = {
  name: 'requests',
  description: 'Refers people to the request-coders channel to hire someone.',
  aliases: ['hire', 'request-coders', 'rc'],
  usage: `${config.prefix}requests @username or user ID`,
  example: `${config.prefix}requests @DudeThatsErin`,
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
        message.channel.send({ content: `Hey, ${usr}! It looks like you are requesting for someone to help you individually. This question is better answered at <#756992144170024991>. Please repost it there.` });
      }
    } else {
      const user = message.mentions.repliedUser;
      message.channel.send({ content: `Hey, ${user.username}! It looks like you are requesting for someone to help you individually. This question is better answered at <#756992144170024991>. Please repost it there.` });
    }
  },

};