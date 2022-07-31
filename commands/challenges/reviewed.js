const Discord = require('discord.js');
const connection = require('../../database.js');
const config = require('../../config/config.json');

module.exports = {
    name: 'reviewed',
    description: 'This gives **mods** the ability to review submissions.',
    aliases: ['mark', 'review'],
    usage: `${config.prefix}reviewed [challenge number] <number of points> [message ID]`,
    example: `${config.prefix}reviewed 1 1 841143871689064448`,
    challengeMods: 1,
    async execute (message, args) {
                let challengeNo = args[0];
                let points = args[1];
                let msgId = args[2];
                let moderator = message.author.id;

            if (!challengeNo) {
                message.react('❌');
                    message.channel.send({content:'You need to tell me what challenge number you would like to review.'});
                    return;
                } else {
                    if (!points) {
                        message.react('❓');
                        message.channel.send({content:'You need to tell me how many points to give the original author of this submission.'});
                        return;
                    } else {
                        if (!msgId) {
                            message.react('❓');
                            message.channel.send({content:'You need to include the message ID for the submission you would like to review. Without this I will not know which message to review.'});
                            return;
                        } else {
                            connection.query(
                                `UPDATE Submissions SET moderator = ? WHERE msgId = ? AND guildId = ?;`,
                                [moderator, msgId, message.guild.id]
                            );
                            const result = await connection.query(
                                `SELECT author FROM Submissions WHERE msgId = ? AND guildId = ?;`,
                                [msgId, message.guild.id]
                            );
                            let user = result[0][0].author;
                            const Author = message.client.users.cache.get(user);
                            connection.query(
                                `UPDATE Submissions SET points = ? AND moderator = ? WHERE msgId = ?;`,
                                [points, moderator, msgId]
                            );

                            message.react('👍');
                        }
                    }
                }

    }
}