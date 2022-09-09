const connection = require('../../database.js');
const Discord = require('discord.js');
const bot = require('../../config/bot.json')

module.exports = {
    name: 'deniedreport',
    description: 'This allows **Erin** to mark bug reports as denied and delete them from the channel.',
    usage: `/deniedreport <message ID> <description>`,
    example: `/deniedreport 852197394828230716 The bot is broken!`,
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
                .setTitle(`Your bug has been denied!`)
                .setAuthor({name: authorUsername, iconURL: avatar})
                .setDescription(`**This is the original report:**\n${original}\n\n**This is the current status:**\n${description}\n\n`)
                .setFooter({text:'If this is incorrect please report this!', iconURL: bot.avatar})

            channel.messages.fetch(messageId).then(message => {
                if (message) message.delete();
            });

            (await client.users.cache.get(OG)).send({ embeds: [report] });

            await connection.query(
                `DELETE FROM reports WHERE messageId = ?;`,
                [messageId]
            );
           interaction.reply({content: 'I have denied the report and sent the user a message telling them.'});

    }
}