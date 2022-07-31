const { MessageActionRow, MessageButton } = require('discord.js');
const config = require('../../config/config.json');

module.exports = {
  name: 'faq',
  description: 'Tells users to check out our FAQ channel and docs to get their simple questions answered.',
  aliases: ['question', 'frequent', 'q'],
  usage: `${config.prefix}faq @username or user ID`,
  execute(message, args) {
    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setLabel('Our Website')
          .setStyle('LINK')
          .setURL('https://codinghelp.site'),
        new MessageButton()
          .setLabel('Our Subreddit')
          .setStyle('LINK')
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
        usr.send({ content: `Hey, ${user.username}! Please check out the <#742604331215487006> channel or the <#742594501922652260> channel as we have a lot of questions answered in those two places. If it isn\'t answered there then you may leave your question here for others to help you answer. Thank you!\nYou can also check the links below to see if your question was answered.`, components: [row] });
      }
      message.channel.send({ content: `📨 Hey, ${user} I just sent you a DM with a link to our FAQs! Please check it!` });
    } else {
      const user = message.mentions.repliedUser;
      user.send({ content: `Hey, ${user.username}! Please check out the <#742604331215487006> channel or the <#742594501922652260> channel as we have a lot of questions answered in those two places. If it isn\'t answered there then you may leave your question here for others to help you answer. Thank you!\nYou can also check the links below to see if your question was answered.`, components: [row] });
      message.channel.send({content: `📨 Hey, ${user} I just sent you a DM with a link to our FAQs! Please check it!`});
    }
  },

};