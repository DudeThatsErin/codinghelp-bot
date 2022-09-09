const connection = require('../../database.js');
const Discord = require('discord.js');
const bot = require('../../config/bot.json')

module.exports = {
    name: 'deletereport',
    description: 'This allows users to delete reports they may have sent in error.',
    usage: `/deletereport <message ID> <description>`,
    example: `/deletereport 852197394828230716 The bot is broken!`,
    options: [
        {
            name: 'messageid',
            description: 'Please provide the message ID to delete.',
            required: true,
            type: 3
        }
    ],
    type: 1,
    async execute(interaction, client) {
        const channel = client.channels.cache.find(channel => channel.id === bot.reportsChId);

        let messageId = interaction.options.getString('messageid');

            const results = await (await connection).query(
                `SELECT * FROM reports WHERE messageId = ?;`,
                [messageId]
            );
            const OG = results[0][0].authorId;
            const author = client.users.cache.find(user => user.id === OG);
            const authorUsername = author.username;
            const original = results[0][0].description;
            const avatar = results[0][0].avatar;

            let report = new Discord.EmbedBuilder()
                .setColor(0x138D75)
                .setTitle(`Your bug has been deleted!`)
                .setAuthor({name: authorUsername, iconURL: avatar})
                .setDescription(`**This is the latest message on the report:**\n${original}`)
                .setFooter({text:'If this is incorrect please report this!', iconURL: bot.avatar})

            channel.messages.fetch(messageId).then(message => {
                if (message) message.delete();
            });

            (await client.users.cache.get(OG)).send({ embeds: [report] });

            await connection.query(
                `DELETE FROM reports WHERE messageId = ?;`,
                [messageId]
            );
           interaction.reply({content: 'I have deleted the report you sent in from Erin\'s Server as well as the database. It is like it never happened! POOF!', ephemeral: true});

    }
}