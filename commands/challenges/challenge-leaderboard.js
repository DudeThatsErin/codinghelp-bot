const Discord = require('discord.js');
const connection = require('../../database.js');
const config = require('../../config/config.json');

module.exports = {
    name: 'leaderboard',
    description: 'This gives users the ability to see the top 10 users on the leaderboard and also their position on the leaderboard.',
    aliases: ['ldbd', 'challenge-leaderboard', 'cleaderboard', 'cldbd', 'lbd', 'ldb'],
    usage: `${config.prefix}leaderboard`,
    example: `${config.prefix}leaderboard or ${config.prefix}ldb or ${config.prefix}lbd`,
    challengeMods: 1,
    async execute (message, args) {
        let guild = message.guild.id;
        let author = message.author.id;
        let aUsername = message.author.username;

        let userNames = '';
        let points = '';

        const results = await connection.query(
            `SELECT * FROM Submissions WHERE author = ? AND guildId = ?;`,
            [author, guild]
        );

        const top10 = await connection.query(
            `SELECT author, SUM(CAST(points AS UNSIGNED)) AS total FROM Submissions WHERE guildId = ? GROUP BY author ORDER BY total DESC LIMIT 10;`,
            [guild]
        );

        for (let i = 0; i < top10[0].length; i++) {
            const data = top10[0];
            const user = top10[0][i].author;
            let membr = await message.client.users.fetch(user).catch(err => {console.log(err);});
            let username = membr.username;

            userNames += `${i + 1}. ${username}\n`;
            points += `${data[i].total}\n`;
        }

        if(top10 === undefined || top10[0] === undefined || top10[0][0] === undefined) {
            message.channel.send('No one is on the leaderboard yet.');
        } else if(results === undefined || results[0] === undefined || results[0][0] === undefined) {


            let embed2 = new Discord.EmbedBuilder()
            .setTitle('This is the current challenge leaderboard.')
            .setColor(0xc9ca66)
            .addFields(
                {name: `Top 10`, value: userNames, inline: true},
                {name: 'Points', value: points, inline: true},
                {name: 'How many points do you have?', value: `${aUsername}, you currently have \`0\` point(s).`}
            )
            .setFooter({text:'If there is an error here, please report this!'});

            message.channel.send({ embeds: [embed2] });

         } else {
            const ponts = await connection.query(
                `SELECT points, SUM(CAST(points AS UNSIGNED)) AS total FROM Submissions WHERE guildId = ? AND author = ?;`,
                [guild, author]
            );
            const p = ponts[0][0].total;
            let embed2 = new Discord.EmbedBuilder()
                .setTitle('This is the current challenge leaderboard.')
                .setColor(0xc9ca66)
                .addFields(
                    {name: `Top 10`, value: userNames, inline: true},
                    {name: 'Points', value: points, inline: true},
                    {name: 'How many points do you have?', value: `${aUsername}, you currently have \`${p}\` point(s).`}
                )
                .setFooter({text:'If there is an error here, please report this!'});

            message.channel.send({ embeds: [embed2] });
                }
    }
}