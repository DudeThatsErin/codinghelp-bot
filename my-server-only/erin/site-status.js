const Discord = require('discord.js');
const bot = require('../../config/bot.json');
const ee = require('../../config/embed.json');

module.exports = {
    name: 'site-status',
    description: 'Pushes an embed to display in the channel about a certain update.',
    usage: `/site-status Status Message`,
    modOnly: 1,
    options: [
        {
            name: 'message',
            description:'What would you like to announce?',
            type: 3,
            required: true
        }
    ],
    async execute(interaction, client) {

        const reason = interaction.options.getString('message');
        const channel = client.channels.cache.find(channel => channel.id === bot.announcementsId);
        let embed = new Discord.EmbedBuilder()
            .setColor(ee.sub_status)
            .setTitle('Hello, Erin has a new update for you!')
            .setDescription(`${reason}`)
            .setTimestamp()
            .setFooter({ text: 'Want to suggest a feature for the website? Use /suggest'});
        interaction.reply({ content: `I have sent the announcement for you. Please check ${channel}.`, ephemeral: true})
        channel.send({ content: `Hey, <@&772153399336632330>,`, embeds: [embed] }) // Subreddit Updates 780111997861363742 or Bot Updates 772154227459883019 or Server Updates 772153457111990282

    }
};