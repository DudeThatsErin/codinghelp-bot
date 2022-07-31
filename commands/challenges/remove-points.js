const Discord = require('discord.js');
const connection = require('../../database.js');
const config = require('../../config/config.json');

module.exports = {
    name: 'remove-points',
    description: 'This allows **mods** to automatically remove points from a participant\'s challenge in the Challenges database.',
    aliases: ['removepnts', 'minuspnts', 'minuspoints', 'mpnts', 'removepoints', 'clearpoints', 'clear-points'],
    usage: `${config.prefix}remove-points <message ID> <number of points>`,
    example: `${config.prefix}remove-points 850726247050903562 3`,
    challengeMods: 1,
    async execute (message, args) {

            let msgId = args[0];
            let author = message.author.username;
            let name = message.author.id;
            let points = args[1];
            const results = await connection.query(
                `SELECT * FROM Submissions WHERE msgId = ?;`,
                [msgId]
            );
            let player = results[0][0].author;
            let playerID = await message.client.users.fetch(player).catch(err => {console.log(err);});
            let playerName = playerID.username;

        if (!msgId) {
            message.react('❌');
                message.channel.send({content:'You need to include the submission\'s message ID of the submission you want to add points to.'});
                return;
            } else {

                    let embed = new Discord.EmbedBuilder()
                        .setColor(0xc9a066)
                        .setTitle(`I have removed ${points} points from ${playerName}!`)
                        .setDescription(`Thank you for that, ${author}!`)
                        .setFooter({text:'If there is a problem with this, please report it!'});

                    connection.query(
                        `UPDATE Submissions SET moderator = ?, points = points - ? WHERE msgId = ?;`,
                        [name, points, msgId]
                    );
            message.channel.send({ embeds: [embed] });

            }

    }
}