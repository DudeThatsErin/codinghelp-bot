const Discord = require('discord.js');
const config = require('../../config/config.json');
const ee = require('../../config/embed.json');
const db = require('../../config/database.json');
const bot = require('../../config/bot.json');
const me = require('../../config/owner.json');

module.exports = {
    name: 'erin-json',
    aliases: ['me-json', 'dev-json', 'json', 'erinjson', 'mejson', 'devjson'],
    cooldown: 0,
    ownerOnly: 1,
    usage: `${config.prefix}erin-json`,
    description: `Sends an embed that Erin uses to see what is stored in the json files so she doesn\'t have to open her file editor to see what is in them.`,
    execute(message) {

        const files = new Discord.EmbedBuilder()
            .setColor(ee.rand_color)
            .setTitle('This is how all of the json files are set up...')
            .addFields(
                {
                    name: 'MYSQL',
                    value: `${db.host}\n${db.user}\nDB PASSWORD\n${db.database}`,
                    inline: true
                },
                {
                    name: 'CONFIG JSON',
                    value: `PREFIX\n\`${config.prefix}\` or \`/\`\nTOKEN\nnot here for security purposes`,
                    inline: true
                },
                {
                    name: 'DEVELOPER:',
                    value: `${me.name}\n${me.username}\n${me.tag}\nmy id: \n\`${me.id}\`\n${me.url}`,
                    inline: true
                },
                {
                    name: 'embed JSON:',
                    value: `Good Color: ${ee.good_color} - \`good_color\`\nBad Color: ${ee.bad_color} - \`bad_color\`\nImportant Message Color: ${ee.impmsg_color} - \`impmsg_color\`\nBlue: ${ee.blue}- \`blue\`\nRed: ${ee.red}- \`red\`\nGreen: ${ee.green}- \`green\`\nYellow: ${ee.yellow}- \`yellow\`\nPurple: ${ee.purple}- \`purple\`\nPink: ${ee.pink}- \`pink\`\nOrange: ${ee.orange}- \`orange\`\nBlack: ${ee.black}- \`black\`\nWhite: ${ee.white}- \`white\`\nGrey: ${ee.grey}- \`grey\`\nSub Status: ${ee.sub_status} - \`sub_status\`\nServer Status: ${ee.server_status}- \`server_status\`\nBot Status: ${ee.bot_status}- \`bot_status\`\nDM Color: ${ee.dm_color}- \`dm_color\`\nFormat: ${ee.format}- \`format\`\nFooter Text: ${ee.footertext}- \`footertext\`\nFooter Icon: ${ee.footericon}- \`footericon\``
                },
                {
                    name: 'BOT JSON:',
                    value: `${bot.tag}\n${bot.name}\nserver link: \n${bot.server}\navatar link: \n${bot.avatar}\ngithub link: \n${bot.github}\nreddit: ${bot.reddit}\nurl: \n${bot.url}\nch's server ID:\n\`${bot.serverId}\`\ntest server's ID: \n\`${bot.testServerId}\`\nreports ch ID:\n\`${bot.reportsChId}\`\nchannel guide ch ID:\n\`${bot.channelGuideId}\`\nannouncements ch ID:\n\`${bot.announcementsId}\`\nsuggestions ch ID:\n\`${bot.suggestionsId}\`\nchallenges ch ID:\n\`${bot.challengesId}\`\nchallenge leaderboard ch ID:\n\`${bot.chLeaderboardId}\`\nslash commands ID:\n\`${bot.commandsId}\``
                }
                )
            .setTimestamp()
            .setFooter({ text: 'These were last updated on 1-14-2022 @ 7:00pm EST.', icon_url: ee.footericon });
        message.channel.send({ embeds: [files] });
    }
}