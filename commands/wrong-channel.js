module.exports = {
    name: 'wrong-channel',
    description: 'Tells people to ask in a different channel and deletes their message. This deletes 2 messages, the one where you ping the bot and the one right above that.',
    aliases: ['diffch', 'different-channel'],
    usage: '++wrong-channel @username or user ID',
    inHelp: 'yes',
    category: 'Messages',
    execute(message, args) {
  
      const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
      if(!user) {
        message.channel.send('You need to specificy a user via mention or the ID.');
        message.delete();
        return;
      }
      else { 
        let usr = message.mentions.members.first();
             message.channel.send(`Hey, ${usr}!` + ' This isn\'t the correct channel for your question. Please check our channel list on the left and ask repost in a different channel. Thank you!');
      }
      message.channel.bulkDelete(2);
    },
    
  };