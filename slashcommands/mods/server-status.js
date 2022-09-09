const Discord = require('discord.js');
const bot = require('../../config/bot.json');
const ee = require('../../config/embed.json');

module.exports = {
    name: 'server-status',
    description: 'Pushes an embed to display in the channel about a certain update.',
    usage: `/server-status Status Message`,
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
        const channel = client.channels.cache.find(channel => channel.id === bot.announcementsId);
        const reason = interaction.options.getString('message');


        let embed = new Discord.EmbedBuilder()
            .setColor(ee.server_status)
            .setTitle('Hello, The Moderators have a new update for you!')
            .setDescription(reason)
            .setTimestamp()
            .setFooter({text: 'Want to suggest a feature for the server? Use /suggest'});
        interaction.reply({ content: `I have sent the announcement for you. Please check ${channel}.`, ephemeral: true})
        channel.send({ content: `Hey, <@&772153457111990282>,`, embeds: [embed]})  // Subreddit Updates 780111997861363742 or Bot Updates 772154227459883019 or Server Updates 772153457111990282

    }
};