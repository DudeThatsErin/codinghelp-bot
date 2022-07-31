const Discord = require('discord.js');
const connection = require('../../database.js');
const config = require('../../config/config.json');

module.exports = {
    name: 'prog-sugg',
    aliases: ['inprogsugg', 'workingsugg', 'workingsuggestion', 'inprogresssuggestion', 'inprogresssuggestions', 'workingsuggestions', 'worksugg', 'ps', 'ws'],
    description: 'Allows **mods** to mark a particular suggestion as *in progress*.',
    usage: `${config.prefix}prog-sugg messageID [status message]`,
    example: `${config.prefix}prog-sugg 847580954306543616 This is the in-progress status for this suggestion.`,
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
                    message.reply({text: 'There was an error grabbing the ID from the database. Please report this!'});
                    console.log(error);
                }

            const result2 = await connection.query(
                `SELECT Author from Suggs WHERE noSugg = ?;`,
                [msgId],
            );
            const OGauthor = result2[0][0].Author;
            let name = (await message.client.users.cache.get(`${OGauthor}`)).tag;

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
            if(!stats) return message.channel.send({text: 'You need to include the status of the suggestion as well as the message ID.'});

            try {
                connection.query(
                    `UPDATE Suggs SET stat = ?, Moderator = ? WHERE noSugg = ?;`,
                    [stats, mod, msgId],
                );
            } catch (error) {
                message.reply({text: 'There was an error updating the suggestion in the database. Please report this!'});
                console.log(error);
            }

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

            const inprogress = new Discord.MessageEmbed()
                .setColor(0x004d4d)
                .setAuthor({name: name, iconURL: avatar})
                .setDescription(suggestion)
                .addFields(
                    [{ name: 'Current Status', value: upStatus},
                    { name: 'The moderator that last updated this was', value: moderate},]
                )
                .setFooter({text: `If you would like to suggest something, use ${config.prefix}suggestions`});

            const updated = new Discord.MessageEmbed()
                .setColor(0x3EA493)
                .setAuthor({name: name, iconURL: avatar})
                .setDescription(suggestion)
                .addFields(
                    [{ name: 'Your suggestion has been updated! This is the current status:', value: upStatus},
                    { name: 'Moderator that updated your suggestion:', value: moder},]
                )
                .setTimestamp()
                .setFooter({text: 'If you don\'t understand this status, please contact the moderator that updated your suggestion. Thank you!'});

                (await message.client.users.cache.get(OGauthor)).send({ embeds: [updated] });
                message.react('✅');
            message.channel.send({text: `The suggestion has been updated in the channel and the message was sent. 😃`});

            const chnnel = await message.guild.channels.cache.find(c => c.name === 'suggestions');
            chnnel.messages.fetch(msgId).then(message => {
                if (message) message.edit({ embeds: [inprogress] });
                    if(message) message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
                }
            ).catch(console.error);
            }
    }
};