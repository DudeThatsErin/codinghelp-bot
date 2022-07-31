const Discord = require('discord.js');
const ee = require('../../config/embed.json');
const config = require('../../config/config.json');

module.exports = {
    name: 'erin',
    aliases: ['me', 'dev', 'owner'],
    description: 'Shows Erin what commands she can run.',
    usage: `${config.prefix}erin`,
    example: `${config.prefix}erin or ${config.prefix}dev`,
    ownerOnly: 1,
    execute(message) {

        const embed = new Discord.EmbedBuilder()
            .setColor(ee.rand_color)
            .setTitle('Here are all of the commands you can use, Erin!')
            .setDescription('\`\`\`css\nclearsuggs\nclearreports\nerin\nfileUpload\nserver\nstatus\nall-jsons\n\`\`\`')
            .setTimestamp()
            .setFooter({text: 'Run /help <command> to see what these do and how to use them.'});
        message.channel.send({ embeds: [embed] });
    }
}