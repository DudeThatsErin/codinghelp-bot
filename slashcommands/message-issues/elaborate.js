module.exports = {
	name: 'elaborate',
	description: 'Asks people to elaborate by including code or by including more information.',
	usage: `/elaborate @username or user ID`,
	example: `/elaborate @DudeThatsErin`,
	options: [
		{
			name: 'user',
			description: 'Who needs to elaborate?',
			type: 5,
			required: true
		}
	],
	execute(interaction) {

		const user = interaction.options.getUser('user');
    interaction.reply({content: `Hey, ${user.username}! Please elaborate. Our members are unable to help you unless you give us more information like the specific code you are working with or more details. If you are unsure what to include, feel free to ask what we need. 😄`});


	},

};