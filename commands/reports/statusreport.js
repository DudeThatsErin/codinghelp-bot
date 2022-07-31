const connection = require('../../database.js');
const bot = require('../../config/bot.json');
const config = require('../../config/config.json');

module.exports = {
    name: 'statusreport',
    description: 'You can check the status of a previous report you sent.',
    aliases: ['status-report', 'statr', 'reportcheck', 'check-report', 'checkreport'],
    usage: `${config.prefix}statusreport <messageID>`,
    example: `${config.prefix}statusreport 852197394828230716`,
    async execute(message, args, client) {

        let messageId = args[0];
        if (messageId < 0) {
            message.react('❓');
            message.reply('Please include the message ID for the report you want to check the status on.');
            return;
        } else {
            const results = await connection.query(
                `SELECT * FROM reports WHERE messageId = ?;`,
                [messageId]
            );
            const OG = results[0][0].authorId;
            let usr = message.guild.members.cache.get(OG);
            const author = client.users.cache.find(user => user.id === OG);
            const authorUsername = author.username;
            const original = results[0][0].description;
            const avatar = results[0][0].avatar;
            const file = results[0][0]?.file || 'No file was uploaded';
            const status = results[0][0]?.stat || 'I have not started working on it yet. I will get to it as soon as I can. Thank you!';

            const report = {
                color: 0x5241CE,
                title: 'This is the current status of your bug report...',
                author: {
                    name: authorUsername,
                    icon_url: avatar
                },
                thumbnail: {
                    url: avatar
                },
                description: status + `\n**This is your original report:**\n${original}\n\n**Did you upload a file?**\n${file}`,
                fields: [
                    {
                        name: 'Original Message ID:',
                        value: `\`${messageId}\``
                    }, {
                        name: 'Use this to check the status of your report in the future:',
                        value: `\`${config.prefix}statusreport ${messageId}\``
                    }
                ],
                timestamp: new Date(),
                footer: {
                    text: 'If you don\'t understand this status, please ask Erin about it.',
                    icon_url: bot.avatar
                }
            };

            message.react('📨');
            usr.send({ embeds: [report] })
        }

    }
}