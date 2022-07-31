const connection = require('../../database.js');
const Discord = require('discord.js');
const config = require('../../config/config.json');
const bot = require('../../config/bot.json');

module.exports = {
    name: 'progressreport',
    description: 'This allows **Erin** to set a report as \"in progress\" with a status message.',
    aliases: ['progress-report', 'pr', 'progreport', 'prgrpt'],
    usage: `${config.prefix}progressreport <report>`,
    example: `${config.prefix}progressreport The bot is broken!`,
    ownerOnly: 1,
    async execute(message, args, client) {

        let description = args.slice(1).join(' ');
        if (!args[1]) {
            message.react('❓');
            message.reply('Please include the status Erin, sheesh.')
        }
        const chnnel = client.channels.cache.find(channel => channel.id === bot.reportsChId);

        let msgId = args[0];
        if (msgId < 0) {
            message.react('❓');
            message.reply('Please include the message ID for the report you want to update.')
            return;
        } else {
            const results = await (await connection).query(
                `SELECT * FROM reports WHERE messageId = ?;`,
                [msgId]
            );
            const OG = results[0][0].authorId;
            const author = client.users.cache.find(user => user.id === OG);
            const authorUsername = author.username;
            const original = results[0][0].description;
            const avatar = results[0][0].avatar;

            let report = new Discord.EmbedBuilder()
                .setColor(0xB3B6B7)
                .setTitle(`This is the update you provided for the bug report...`)
                .setAuthor({name: authorUsername, iconURL: avatar})
                .setDescription(`**This is the original report:**\n${original}\n\n**This is the updated status:**\n${description}`)
                .setTimestamp()
                .setFooter({text:'Last Updated on', iconURL: bot.avatar})


            chnnel.messages.fetch(msgId).then(message => {
                report.addFields([
                    {
                        name: 'Original Author:',
                        value: `${authorUsername} - \`${OG}\``
                    },
                    {
                        name: 'This is the message ID for commands:',
                        value: `\`${msgId}\``
                    },
                    {
                        name: 'Use this to mark the report as **In Progress**:',
                        value: `\`${config.prefix}progressreport ${msgId} [progress message here]\``
                    },
                    {
                        name: 'Use this to complete a report (deny or whatever):',
                        value: `\`${config.prefix}completedreport ${msgId} [completed message here]\``
                    }
                ])
                if (message) message.edit({ embeds: [report] });
            });

            const report2 = new Discord.EmbedBuilder()
                .setColor(0xB3B6B7)
                .setTitle('Your bug report is being worked on!')
                .setAuthor({name: authorUsername, iconURL: avatar})
                .setDescription(`**This is the original report:**\n${original}\n\n**This is the updated status:**\n${description}`)
                .addFields([
                    {
                        name: 'Use this to check the status of your report in the future:',
                        value: `\`${config.prefix}statusreport ${msgId}\``
                    }
                ])
                .setTimestamp()
                .setFooter({text: 'If this is not correct, please report this!', iconURL: bot.avatar})

            (await message.client.users.cache.get(OG)).send({ embeds: [report2] });

            message.react('✅');

            await connection.query(
                `UPDATE reports SET moderator = ? AND stat = ? WHERE messageId = ?;`,
                [bot.ownerId, description, msgId]
            );
        }

    }
}