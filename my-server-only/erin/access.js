// at the top of your file
const Discord = require('discord.js');
const bot = require('../../config/bot.json');

module.exports = {
    name: 'access',
    description: 'Displays an embed telling people how to get access to our server.',
    usage: `/access`,
    ownerOnly: 1,
    execute(interaction) {

        const accessEmbed = new Discord.EmbedBuilder()
            .setColor(0xFFA500)
            .setTitle('Get Access to Our Server!')
            .setDescription('Please check <#703989632110690324> and react to the correct message to get access to our server!');

        const fetchedChannel = interaction.guild.channels.cache.get(bot.announcementsId); // test bot: 1014995248163852298
        fetchedChannel.send({ embeds: [accessEmbed] });

        interaction.reply({content: `I have done it, please check ${fetchedChannel}!`, ephemeral: true});

    },

};