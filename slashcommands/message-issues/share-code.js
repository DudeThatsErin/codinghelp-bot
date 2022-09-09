const config = require('../../config/config.json');

module.exports = {
	name: 'share-code',
	description: 'Tells people to share their code as shown in the <#383032186317832202> channel.',
	usage: `/share-code @username or user ID`,
	example: `/share-code @DudeThatsErin`,
	options: [
    {
      name: 'user',
      description: 'Who?',
      required: true,
      type: 6
    }
  ],
	execute(interaction) {
		const user = interaction.options.getUser('user');
    user.send({ content: `Hey, ${user}!` + ' Please share your code as shown in our wiki. If it is too long for Discord, please upload it to a place like CodeShare.io and share the link to the code here so we can take a look at it. Thank you!\nSee here: https://codinghelp.site/Rules-for-Participating-on-r-CodingHelp-cb011ca7106148af9fb9ba64b295c969'});
		interaction.reply({ content: `📨 Hey, I just sent them a DM about sharing your code! Please check it!`});
	},

};