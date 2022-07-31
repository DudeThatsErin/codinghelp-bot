const Discord = require('discord.js');
const bot = require('../../config/bot.json');
const ee = require('../../config/embed.json');
const config = require('../../config/config.json');

module.exports = {
    name: 'sub-status',
    aliases: ['sub-update', 'substatus', 'subupdate'],
    description: 'Pushes an embed to display in the channel about a certain update.',
    usage: `${config.prefix}sub-status Status Message`,
    modOnly: 1,
    async execute(message, args, client) {

        const reason = args.slice(0).join(" ");
        if (!reason) return message.reply({text:'You forgot to include a status message. SMH'});

        const channel = client.channels.cache.find(channel => channel.id === bot.announcementsId); //bot.announcementsId or '907763264635695144' which is todo ch id
        let embed = new Discord.EmbedBuilder()
            .setColor(ee.sub_status)
            .setTitle('Hello, The Moderators have a new update for you!')
            .setDescription(`${reason}`)
            .setTimestamp()
            .setFooter({ text: 'Want to suggest a feature for the website? Use ++suggest' });
        message.react('👍');
        channel.send({ content: `Hello <@&780111997861363742>,`, embeds: [embed] })


    }
};