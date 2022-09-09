const Discord = require('discord.js');
const bot = require('../../config/bot.json');
const ee = require('../../config/embed.json');

module.exports = {
    name: 'sub-status',
    description: 'Pushes an embed to display in the channel about a certain update.',
    usage: `/sub-status Status Message`,
    modOnly: 1,
    options: [
        {
            name: 'message',
            description:'What would you like to announce?',
            type: 3,
            required: true
        }
    ],
    async execute(message, args, client) {

        const reason = interaction.options.getString('message');
        const channel = client.channels.cache.find(channel => channel.id === bot.announcementsId); //bot.announcementsId or '907763264635695144' which is todo ch id
        let embed = new Discord.EmbedBuilder()
            .setColor(ee.sub_status)
            .setTitle('Hello, The Moderators have a new update for you!')
            .setDescription(`${reason}`)
            .setTimestamp()
            .setFooter({ text: 'Want to suggest a feature for the website? Use /suggest' });
        interaction.reply({ content: `I have sent the announcement for you. Please check ${channel}.`, ephemeral: true})
        channel.send({ content: `Hello <@&780111997861363742>,`, embeds: [embed] })


    }
};