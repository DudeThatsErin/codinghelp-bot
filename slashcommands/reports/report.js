const connection = require('../../database.js');
const bot = require('../../config/bot.json');
const me = require('../../config/owner.json');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'report',
    description: 'You can report problems with the bot to the developers so that they can fix it.',
    usage: `/report <report>`,
    example: `/report The bot is broken!`,
    options: [
        {
            name: 'message',
            description: 'Please give detailed information on what happened.',
            required: true,
            type: 3
        },
        {
            name: 'attachment',
            description: 'Would you like to attach a screenshot to this report? If you do, it helps Erin a lot.',
            required: false,
            type: 11
        }
    ],
    async execute(interaction, client) {
        let author = interaction.user.id;
        let usr = interaction.guild.members.cache.get(author);
        let description = interaction.options.getString('message');
        const channel = client.channels.cache.find(channel => channel.id === bot.reportsChId);
        let authorUsername = interaction.user.username;
        let avatar = interaction.user.displayAvatarURL({ dynamic: true });
        const url = interaction.options.getAttachment('attachment') || 'No';

        const report = new EmbedBuilder()
        .setColor(0x8c1149)
        .setTitle('Oops! A *bug* has appeared!')
        .setAuthor({
            name: authorUsername,
            icon_url: avatar
        })
        .setDescription(`**This is the report:**\n${description}\n\n**Any files uploaded?**\n${url}`)
        .setTimestamp()
        .setFooter({
            text: 'This was all of the info I could grab from the report.',
            icon_url: bot.avatar
        });

        const msg = channel.send({ embeds: [report] }).then(async message => {
            const report3 = new EmbedBuilder()
                .setColor(0x8c1149)
                .setTitle('Oops! A *bug* has appeared!')
                .setAuthor({
                    name: authorUsername,
                    iconURL: avatar
                })
                .setDescription(`**This is the report:**\n${description}\n\n**Any files uploaded?**\n${url}`)
                .addFields(
                    {name: 'This is the message ID for commands:',value: `\`${message.id}\``},
                    {name: 'Use this to mark the report as **In Progress**:', value: `\`/progressreport ${message.id} [progress message here]\``},
                    {name: 'Use this to complete a report (deny or whatever):', value: `\`/completedreport ${message.id} [completed message here]\``}
                )
                .setTimestamp()
                .setFooter({
                    text: 'This was all of the info I could grab from the report.',
                    icon_url: bot.avatar
                });
            message.edit({ embeds: [report3] });
           


        let report2 = new EmbedBuilder()
            .setColor(0x11818C)
            .setTitle(`Your report has been sent to ${me.name} aka ${me.username}!`)
            .setAuthor({ name: authorUsername, icon_url: avatar })
            .setThumbnail(avatar)
            .setDescription(`**This is the report:**\n${description}\n\n**Any files uploaded?**\n${url}`)
            .setTimestamp()
            .setFooter({ text: 'This was all of the information I could grab from the report.', icon_url: bot.avatar });

        const reportNo = message.id;

        report2.addFields(
            { name: 'Please save this message ID! Message ID:', value: `\`${reportNo}\`` },
            { name: 'Use the following command to check the status of the report in the future:', value: `\`/statusreport ${reportNo}\`` },
            { name: 'Use the following command to edit your report:', value: `\`/editreport ${reportNo}\``},
            { name: 'Use the following command if you want to delete your report:', value: `\`/deletereport ${reportNo}\``}
            );
        await connection.query(
            `INSERT INTO reports (messageId, authorId, avatar, description, file) VALUES(?, ?, ?, ?, ?);`, [reportNo, author, avatar, description, url]
        );

        usr.send({ embeds: [report2] });

    });


        interaction.reply({content: 'I have sent your report. Check your DMs for a copy!', ephemeral: true});
    }
}