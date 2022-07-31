const { MessageActionRow, MessageButton } = require('discord.js');
const config = require('../../config/config.json');

module.exports = {
	name: 'poorly-phrased',
	description: 'Asks people to explain their questions better.',
	aliases: ['pp', 'poorphrase', 'betterexplanation', 'betterexplain'],
	usage: `${config.prefix}poorly-phrased <@username or ID>`,
	example: `${config.prefix}poorly-phrased @DudeThatsErin or ${config.prefix}pp @DudeThatsErin`,
	execute(message, args) {
    const row = new MessageActionRow()
    .addComponents(
      new MessageButton()
        .setLabel('What have you tried?')
        .setStyle('LINK')
        .setURL('https://mattgemmell.com/what-have-you-tried/'),
      new MessageButton()
        .setLabel('How to ask a question?')
        .setStyle('LINK')
        .setURL('https://en.wikipedia.org/wiki/Wikipedia:Reference_desk/How_to_ask_a_software_question'),
      new MessageButton()
        .setLabel('Writing the Perfect Question')
        .setStyle('LINK')
        .setURL('https://blogs.msmvps.com/jonskeet/2010/08/29/writing-the-perfect-question/')
    );

    if(message.reference === null) { // just a regular message
		  const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
		  if(!user) {
		    message.channel.send({ content: 'You need to specify a user via mention or the ID.'});
		    message.delete();
		    return;
		  }
		  else {
		    let usr = message.mentions.members.first();
		    usr.send({ content: `Hey, ${usr.username}!\n\nCan you please phrase your question better? We do not understand what you are asking. Check the links below to see how you could phrase your question better.`, components: [row]});
		  }
		  message.reply({content: `📨 I just sent them a DM! Please check it!`});

    } else { // new reply type

      const usr = message.mentions.repliedUser;
		  usr.send({ content: `Hey, ${usr.username}!\n\nCan you please phrase your question better? We do not understand what you are asking. Check the links below to see how you could phrase your question better.`, components: [row]});

		  message.channel.send({ content: `📨 I just sent them a DM! Please check it!`});
    }

	},

};