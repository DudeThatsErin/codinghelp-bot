// at the top of your file
const Discord = require('discord.js');
const ee = require('../../config/embed.json');
const config = require('../../config/config.json');

module.exports = {
    name: 'access',
    description: 'Displays an embed telling people how to get access to our server.',
    usage: `${config.prefix}access`,
    ownerOnly: 1,
    execute(message, args) {

        const accessEmbed = new Discord.EmbedBuilder()
            .setColor(ee.orange)
            .setTitle('Get Access to Our Server!')
            .setDescription('Please check <#703989632110690324> and react to the correct message to get access to our server!');

        message.channel.send({ embeds: [accessEmbed] });


    },

};