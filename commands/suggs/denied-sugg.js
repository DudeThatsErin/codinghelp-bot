const Discord = require('discord.js');
const connection = require('../../database.js');
const config = require('../../config/config.json');

module.exports = {
    name: 'denied-sugg',
    aliases: ['deniedsugg', 'denys', 'nosugg', 'deniedsuggestion', 'deniedsuggestions', 'denysugg'],
    description: 'Allows **mods** to deny a particular suggestion.',
    usage: `${config.prefix}deniedsugg messageID [reason]`,
    example: `${config.prefix}deniedsugg 847580954306543616 I don\'t want to do what you suggested! GO AWAY!`,
    modOnly: 1,
    async execute(message, args) {

        const msgId = args[0];
        if(msgId > 0 ) {
            try {
                const result = await connection.query(
                    `SELECT noSugg from Suggs WHERE noSugg = ?;`,
                    [msgId]
                );
                const mId = result[0][0].noSugg;
            } catch(error) {
                message.reply('There was an error grabbing the ID from the database. Please report this!');
                console.log(error);
            }

        const result2 = await connection.query(
            `SELECT Author from Suggs WHERE noSugg = ?;`,
            [msgId],
        );
        const OGauthor = result2[0][0].Author;
        const aut = OGauthor.tag;

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

        const mod = message.author.id;

        const stats = args.slice(1).join(' ');
        if(!stats) return message.channel.send({text:'You need to include the status of the suggestion as well as the message ID.'});

        connection.query(
            `UPDATE Suggs SET stat = ?, Moderator = ? WHERE noSugg = ?;`,
            [stats, mod, msgId],
        );

        const result8 = await connection.query(
            `SELECT stat FROM Suggs WHERE noSugg = ?;`,
            [msgId]
        );
        const upStatus = result8[0][0].stat;

        const moderator = await connection.query(
            `SELECT Moderator FROM Suggs WHERE noSugg = ?;`,
            [msgId]
        );
        const moder = moderator[0][0].Moderator;
        const moderate = moder.tag || message.author.tag;
        
        const denied = new Discord.MessageEmbed()
            .setColor(0xA4503E)
            .setAuthor({ name: aut, iconURL: avatar})
            .setDescription(suggestion)
            .addFields(
                [{ name: 'Unfortunately, your suggestion was denied. This is the reason:', value: upStatus},
                { name: 'Moderator that denied your suggestion:', value: moderate},]
            )
            .setTimestamp()
            .setFooter({text: 'If you don\'t understand this reason, please contact the moderator that updated your suggestion. Thank you!'});
            message.client.users.cache.get(OGauthor).send({ embeds: [denied] });
            message.channel.send({text:`That has been denied and the suggestion has been deleted. 😃`});
            message.react('✅');
                try {
                    await connection.query(
                        `DELETE FROM Suggs WHERE noSugg = ? AND Author = ?;`,
                        [msgId, OGauthor],
                    );
                } catch (error) {
                    message.reply({text:'There was an error deleting the suggestion from the database. Please report this!'});
                    console.log(error);
                }
            const chnnel = await message.guild.channels.cache.find(c => c.name === 'suggestions');
            chnnel.messages.fetch(msgId).then(message => {
                    message.delete();
                }
            )
     }
    }
};