const Discord = require('discord.js');
const bot = require('../../config/bot.json');
const ee = require('../../config/embed.json');
const config = require('../../config/config.json');

module.exports = {
    name: 'site-status',
    aliases: ['site-update', 'sitestatus', 'siteupdate'],
    description: 'Pushes an embed to display in the channel about a certain update.',
    usage: `${config.prefix}site-status Status Message`,
    modOnly: 1,
    async execute(message, args, client) {

        const reason = args.slice(0).join(" ");
        if (!reason) return message.reply({content: 'You forgot to include a status message. SMH'});

        const channel = client.channels.cache.find(channel => channel.id === bot.announcementsId);
        let embed = new Discord.EmbedBuilder()
            .setColor(ee.sub_status)
            .setTitle('Hello, Erin has a new update for you!')
            .setDescription(`${reason}`)
            .setTimestamp()
            .setFooter({ text: 'Want to suggest a feature for the website? Use ++suggest'});
        message.react('👍');
        channel.send({ content: `Hey, <@&772153399336632330>,`, embeds: [embed] }) // Subreddit Updates 780111997861363742 or Bot Updates 772154227459883019 or Server Updates 772153457111990282

    }
};