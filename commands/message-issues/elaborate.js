const config = require('../../config/config.json');
module.exports = {
	name: 'elaborate',
	description: 'Asks people to elaborate by including code or by including more information.',
	aliases: ['explain', 'more-info', 'moreinfo'],
	usage: `${config.prefix}elaborate @username or user ID`,
	example: `${config.prefix}elaborate @DudeThatsErin`,
	execute(message) {
    if (message.reference === null) { // just a regular message
		const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
		if(!user) {
		  message.channel.send({content: 'You need to specify a user via mention or the ID.'});
		  message.delete();
		  return;
		}
		else {
		  let usr = message.mentions.members.first();
			message.channel.send({content: `Hey, ${usr}! Please elaborate. Our members are unable to help you unless you give us more information like the specific code you are working with or more details. If you are unsure what to include, feel free to ask what we need. 😄`});
		}
  }
    else {
      const user = message.mentions.repliedUser;
      message.channel.send({content: `Hey, ${usr}! Please elaborate. Our members are unable to help you unless you give us more information like the specific code you are working with or more details. If you are unsure what to include, feel free to ask what we need. 😄`});
    }

	},

};