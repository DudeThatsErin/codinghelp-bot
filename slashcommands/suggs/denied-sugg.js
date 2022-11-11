const Discord = require('discord.js');
const connection = require('../../database.js');
const bot = require('../../config/bot.json');

module.exports = {
    name: 'denied-sugg',
    description: 'Allows **mods** to deny a particular suggestion.',
    usage: `/deniedsugg messageID [reason]`,
    example: `/deniedsugg 847580954306543616 I don\'t want to do what you suggested! GO AWAY!`,
    modOnly: 1,
    options: [
        {
            name: 'messageid',
            description: 'What is the message ID for the suggestion you would like to deny?',
            type: 3,
            required: true
        },
        {
            name: 'message',
            description: 'What is the denial message?',
            type: 3,
            required: true
        }
    ],
    async execute(interaction, client) {

        const msgId = interaction.options.getString('messageid');
            try {
                await connection.query(
                    `SELECT noSugg from Suggs WHERE noSugg = ?;`,
                    [msgId]
                );
            } catch(error) {
                interaction.reply({content: 'There was an error grabbing the ID from the database. Please report this!'});
                console.log(error);
                return;
            }

        const result2 = await connection.query(
            `SELECT Author from Suggs WHERE noSugg = ?;`,
            [msgId],
        );
        const OGauthor = result2[0][0].Author;
        const aut = await interaction.guild.members.fetch(OGauthor);
        const name = aut.user.username;

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
        const mod = interaction.user.id;
        const stats = interaction.options.getString('message');

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
        const moderate = moder.tag || interaction.user.tag;
        
        const denied = new Discord.EmbedBuilder()
            .setColor(0xA4503E)
            .setAuthor({ name: name, iconURL: avatar})
            .setDescription(suggestion)
            .addFields(
                [{ name: 'Unfortunately, your suggestion was denied. This is the reason:', value: stats},
                { name: 'Moderator that denied your suggestion:', value: moderate},]
            )
            .setTimestamp()
            .setFooter({text: 'If you don\'t understand this reason, please contact the moderator that updated your suggestion. Thank you!'});
            interaction.client.users.cache.get(OGauthor).send({ embeds: [denied] });
            interaction.reply({text:`That has been denied and the suggestion has been deleted. 😃`});
                try {
                    await connection.query(
                        `DELETE FROM Suggs WHERE noSugg = ? AND Author = ?;`,
                        [msgId, OGauthor],
                    );
                } catch (error) {
                    interaction.reply({text:'There was an error deleting the suggestion from the database. Please report this!'});
                    console.log(error);
                    return;
                }

            const chnnel = await client.channels.cache.find(c => c.id === bot.suggestionsId);
            chnnel.messages.fetch(msgId).then(message => {
                    message.delete();
                }
            )
    }
};