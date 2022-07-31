const Discord = require('discord.js');
const connection = require('../../database.js');
const config = require('../../config/config.json');

module.exports = {
    name: 'editsugg',
    aliases: ['edits', 'es', 'editsuggestion', 'editsuggestions', 'editsuggs', 'us', 'updatesuggestion', 'updatesugg', 'updates', 'edit-suggestions', 'edit-suggestion', 'update-suggestion', 'update-suggestions', 'updatesuggestions'],
    description: 'Users can update their suggestion with this command.\n**Note:** Only the original poster\'s of the suggestion can edit the message. Meaning someone posts a suggestion and only that person can edit the suggestion, no one else.',
    usage: `${config.prefix}editsugg messageID [updated message]`,
    example: `${config.prefix}editsugg 847580954306543616 I need to update my suggestion!`,
    async execute(message, args) {

        const threadAuthor = message.member.displayName;

        const msgId = args[0];
        const result = await connection.query(
            `SELECT noSugg from Suggs WHERE noSugg = ?;`,
            [msgId]
        );
        const mId = result[0][0].noSugg;

        const result2 = await connection.query(
            `SELECT Author from Suggs WHERE noSugg = ?;`,
            [msgId],
        );
        const author = result2[0][0].Author;

        const result3 = await connection.query(
            `SELECT Message from Suggs WHERE noSugg = ?;`,
            [msgId],
        );
        const suggestion = result3[0][0].Message;

        const result4 = await connection.query(
            `SELECT Avatar from Suggs WHERE noSugg = ?;`,
            [msgId],
        );
        const avatar = result4[0][0].Avatar;

        const stats = args.slice(1).join(' ');
        if(!stats) return message.channel.send({text:'You need to include the updated suggestion as well as the message ID.'});

        const update = 'OP Updated their own suggestion.';

        connection.query(
            `UPDATE Suggs SET Message = ?, stat = ? WHERE noSugg = ?;`,
            [stats, update, msgId],
        );

        const result8 = await connection.query(
            `SELECT Message FROM Suggs WHERE noSugg = ?;`,
            [msgId]
        );
        const upStatus = result8[0][0].Message;

        const edited = new Discord.MessageEmbed()
            .setColor(0x1C3D77)
            .setAuthor({name: author, iconURL: avatar})
            .setDescription('Your suggestion has been updated!')
            .addFields(
                [{ name: 'Your old suggestion:', value: suggestion},
                { name: 'Your new suggestion:', value: upStatus },]
            )
            .setTimestamp()
            .setFooter({text: 'If you do\'t understand this reason, please contact the moderator that updated your suggestion. Thank you!'});
        message.author.send({ embeds: [edited] });
            message.delete()

        const editedTwo = new Discord.MessageEmbed()
            .setColor(0x004d4d)
            .setAuthor({name: author, iconURL: avatar})
            .setDescription(upStatus)
            .setFooter({text:'If you are interested in submitting a suggestion please use: h!suggestion'});

            const channel = message.guild.channels.cache.find(c => c.name === 'suggestions');
            channel.messages.fetch(mId).then(message => {
                message.edit({ embeds: [editedTwo] });
                }
            )

    }

};