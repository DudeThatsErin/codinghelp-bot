const { ActionRowBuilder, ButtonBuilder } = require('discord.js');
const config = require('../../config/config.json');

module.exports = {
  name: 'justask',
  description: 'Tells users to just ask their question instead of asking if someone is here or if someone can help them.',
  aliases: ['ja', 'ask', 'just-ask'],
  usage: `${config.prefix}justask @username or userID`,
  example: `${config.prefix}justask @DudeThatsErin#8736`,
  execute(message, args) {
    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel('Our Website')
          .setStyle('Link')
          .setURL('https://codinghelp.site'),
        new ButtonBuilder()
          .setLabel('Our Subreddit')
          .setStyle('Link')
          .setURL('https://reddit.com/r/CodingHelp')
      );

    if (message.reference === null) { // just a regular message
      const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
      if (!user) {
        message.channel.send({ content: 'You need to specify a user via mention or the ID.' });
        message.delete();
        return;
      }
      else {
        let usr = message.mentions.members.first();
        usr.send({ content: `Hey, ${usr}!\n\nPlease just ask your question according to our rules. Rule 2 explains that you should just ask instead of asking any of the following questions. Click either of the links below as your question could have been answered there as well.\n**Do not ask the following quesitons:**\n\`\`\`css\nIs anyone available?\nCan someone please help me?\nWhenever someone gets online, can you help me?\n\`\`\``, components: [row] });
      }
      message.channel.send({ content: `📨 Hey, ${user.username} I just sent you a DM! Please check it!` });
    } else {
      let user = message.mentions.repliedUser;
      user.send({ content: `Hey, ${user.username}!\n\nPlease just ask your question according to our rules. Rule 2 explains that you should just ask instead of asking any of the following questions. Click either of the links below as your question could have been answered there as well.\n**Do not ask the following quesitons:**\n\`\`\`css\nIs anyone available?\nCan someone please help me?\nWhenever someone gets online, can you help me?\n\`\`\``, components: [row] });
      message.channel.send({ content: `📨 Hey, ${user.username} I just sent you a DM! Please check it!` });
    }
  },

};