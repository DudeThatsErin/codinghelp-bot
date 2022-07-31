const Discord = require('discord.js');
const connection = require('../../database.js');
const config = require('../../config/config.json');

module.exports = {
    name: 'clear-points',
    description: 'This gives **mods** the ability to mark a submission as unreviewed.',
    aliases: ['clearpoints', 'cp'],
    usage: `${config.prefix}clear-points [message ID]`,
    example: `${config.prefix}clear-points 841330343641874532`,
    challengeMods: 1,
    async execute (message, args) {

        let msgId = args[0];
        let author = message.author.username;
        let name = message.author.id;

        if (!msgId) {
            message.react('❌');
            message.channel.send({text:'You need to include the submission\'s message ID of the submission you want to remove points from.'});
            return;
        } else {

                let embed = new Discord.EmbedBuilder()
                    .setColor(0xc9a066)
                    .setTitle(`I have removed all points from ${player}! Their submission is not unreviewed.`)
                    .setDescription(`Thank you for that, ${author}!`)
                    .setFooter({text:'If there is a problem with this, please report it!'});

                connection.query(
                    `UPDATE Submissions SET mod = ? AND points = ? WHERE msgId = ?;`,
                    [NULL, NULL, msgId]
                );
                message.client.users.cache.get(name).send({ embeds: [embed] });
                message.channel.send({text:'📨 I have sent you a private message.'})

        }


    }
}