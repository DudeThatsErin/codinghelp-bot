const connection = require('../../database.js');
const Discord = require('discord.js');
const bot = require('../../config/bot.json');

module.exports = {
    name: 'progressreport',
    description: 'This allows **Erin** to set a report as \"in progress\" with a status message.',
    usage: `/progressreport <report>`,
    example: `/progressreport The bot is broken!`,
    ownerOnly: 1,
    options: [
        {
            name: 'messageid',
            description: 'Please provide the message ID to mark completed.',
            required: true,
            type: 3
        },
        {
            name: 'message',
            description: 'Please give detailed information on what happened.',
            required: true,
            type: 3
        }
    ],
    type: 1,
    async execute(interaction, client) {

        let description = interaction.options.getString('message');
        const chnnel = client.channels.cache.find(channel => channel.id === bot.reportsChId);

        let msgId = interaction.options.getString('messageid');
            const results = await (await connection).query(
                `SELECT * FROM reports WHERE messageId = ?;`,
                [msgId]
            );
            const OG = results[0][0].authorId;
            const author = client.users.cache.find(user => user.id === OG);
            const authorUsername = author.username;
            const original = results[0][0].description;
            const avatar = results[0][0].avatar;

            chnnel.messages.fetch(msgId).then(message => {
                let report = new Discord.EmbedBuilder()
                    .setColor(0xB3B6B7)
                    .setTitle(`This is the update you provided for the bug report...`)
                    .setAuthor({name: authorUsername, iconURL: avatar})
                    .setDescription(`**This is the original report:**\n${original}\n\n**This is the updated status:**\n${description}`)
                    .addFields([
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
                            value: `\`/progressreport ${msgId} [progress message here]\``
                        },
                        {
                            name: 'Use this to complete a report (deny or whatever):',
                            value: `\`/completedreport ${msgId} [completed message here]\``
                        }
                    ])
                    .setTimestamp()
                    .setFooter({text:'Last Updated on', iconURL: bot.avatar});
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
                        value: `\`/statusreport ${msgId}\``
                    },
                    {
                        name: 'Use this to edit your own report:',
                        value: `\`/editreport ${msgId}\``
                    },
                    {
                        name: 'Use this to delete your own report:',
                        value: `\`/deletereport ${msgId}\``
                    }
                ])
                .setTimestamp()
                .setFooter({text: 'If this is not correct, please report this!', iconURL: bot.avatar});

            (await client.users.cache.get(OG)).send({ embeds: [report2] });

            interaction.reply({content: 'I have marked the report as in progress and sent the user a DM.'});

            await connection.query(
                `UPDATE reports SET moderator = ? AND stat = ? WHERE messageId = ?;`,
                [bot.ownerId, description, msgId]
            );

    }
}