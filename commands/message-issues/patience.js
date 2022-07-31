const { MessageActionRow, MessageButton } = require('discord.js');
const config = require('../../config/config.json');

module.exports = {
	name: 'patience',
	description: 'Tells people to be patient when waiting for advice.',
	aliases: ['wait', 'bepatient', 'justwait'],
	usage: `${config.prefix}patience <@username or ID>`,
	example: `${config.prefix}patience @DudeThatsErin#8736`,
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

    if(message.reference === null) { // just a regular message
		  const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
		  if(!user) {
		    message.channel.send({ content: 'You need to specify a user via mention or the ID.'});
		    message.delete();
		    return;
		  }
		  else {
		    let usr = message.mentions.members.first();
		    usr.send({ content: `Hey, ${usr.username}!\n\nPlease give our users some time to review your question. We understand your excitment and appreciate it but our users need time to look over your question and give you the proper information.\n**Please wait 1 hour before pinging one of the language roles unless you are a Server Booster.**\nPlease only post your question once every 48 hours and do not ask for help in multiple channels.\nYou can also check out our the links below to see if your question was answered there.`, components: [row]});
		  }
		  message.reply({content: `📨 I just sent them a DM! Please check it!`});

    } else { // new reply type

      const usr = message.mentions.repliedUser;
		  usr.send({ content: `Hey, ${usr.username}!\n\nPlease give our users some time to review your question. We understand your excitment and appreciate it but our users need time to look over your question and give you the proper information.\n**Please wait 1 hour before pinging one of the language roles unless you are a Server Booster.**\nPlease only post your question once every 48 hours and do not ask for help in multiple channels.\nYou can also check out our the links below to see if your question was answered there.`, components: [row]});

		  message.channel.send({ content: `📨 I just sent them a DM! Please check it!`});
    }

	},

};