const Discord = require('discord.js');
const ee = require('../../config/embed.json');

module.exports = {
    name: 'djslangfirst',
    description: 'Asks users to learn JavaScript before trying to learn Discord.js',
    usage: `/djslangfirst`,
    execute(interaction) {
        const embed = new Discord.EmbedBuilder()
            .setColor(0x39D897)
            .setTitle('It is great that you want to learn Discord.js but...')
            .setDescription('There are prequisites to it. Meaning there are things you **need** to learn first _before_ learning Discord.js. One of the biggest things is **JavaScript** itself. While making a bot with very little JavaScript and programming knowledge, trying to do so without understanding the language first will only hinder you. You may get stuck on many uncomplicated issues, struggle with solutions to incredibly easy problems, and all-in-all end up frustrated. Sounds annoying right?\n\n**We recommend checking out the Before You Begin guide on the Discord.js website for more information:** https://discordjs.guide/#before-you-begin')
            .setFooter({ text: 'You received this message because it seems you do not know the basics.', iconURL: ee.footericon });
        interaction.reply({ embeds: [embed] });
    }
}