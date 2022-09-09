const { ActionRowBuilder, ButtonBuilder } = require('discord.js');

module.exports = {
	name: 'poorly-phrased',
	description: 'Asks people to explain their questions better.',
	usage: `/poorly-phrased`,
	execute(interaction) {
    const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setLabel('What have you tried?')
        .setStyle(5)
        .setURL('https://mattgemmell.com/what-have-you-tried/'),
      new ButtonBuilder()
        .setLabel('How to ask a question?')
        .setStyle(5)
        .setURL('https://en.wikipedia.org/wiki/Wikipedia:Reference_desk/How_to_ask_a_software_question'),
      new ButtonBuilder()
        .setLabel('Writing the Perfect Question')
        .setStyle(5)
        .setURL('https://blogs.msmvps.com/jonskeet/2010/08/29/writing-the-perfect-question/')
    );
		interaction.reply({content: `Can you please phrase your question better? We do not understand what you are asking. Check the links below to see how you could phrase your question better.`, components: [row]});

	},

};