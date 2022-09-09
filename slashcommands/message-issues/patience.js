const { ActionRowBuilder, ButtonBuilder } = require('discord.js');

module.exports = {
	name: 'patience',
	description: 'Tells people to be patient when waiting for advice.',
	usage: `/patience <@username or ID>`,
	example: `/patience @DudeThatsErin#8736`,
	options: [
    {
      name: 'user',
      description: 'Who needs to be patient?',
      required: true,
      type: 6
    }
  ],
	execute(interaction) {
    const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setLabel('Our Website')
        .setStyle(5)
        .setURL('https://codinghelp.site'),
      new ButtonBuilder()
        .setLabel('Our Subreddit')
        .setStyle(5)
        .setURL('https://reddit.com/r/CodingHelp')
    );

		  const user = interaction.options.getUser('user');
		  user.send({ content: `Hey, ${user.username}!\n\nPlease give our users some time to review your question. We understand your excitment and appreciate it but our users need time to look over your question and give you the proper information.\n**Please wait 1 hour before pinging one of the language roles unless you are a Server Booster.**\nPlease only post your question once every 48 hours and do not ask for help in multiple channels.\nYou can also check out our the links below to see if your question was answered there.`, components: [row]});
      interaction.reply({ content: `📨 Hey, ${user} I just sent you a DM about being patient! Please check it!` });

	},

};