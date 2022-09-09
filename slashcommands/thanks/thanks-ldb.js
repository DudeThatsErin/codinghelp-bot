const Discord = require('discord.js');
const connection = require('../../database.js');

module.exports = {
    name: 'thanks-leaderboard',
    description: 'This gives users the ability to see the top 10 users on the leaderboard.',
    usage: `/thanks-leaderboard`,
    async execute (interaction, client) {
        let author = interaction.user.id;
        let aUsername = interaction.user.username;

        let userNames = '';
        let points = '';


        const results = await connection.query(
            `SELECT * FROM Thanks WHERE user = ?;`,
            [author]
        );

        const top10 = await connection.query(
            `SELECT user, SUM(CAST(thanks AS UNSIGNED)) AS total FROM Thanks GROUP BY user ORDER BY total DESC LIMIT 10;`
        );

        for (let i = 0; i < top10[0].length; i++) {
            const data = top10[0];
            const user = data[i].user;
            let membr = await client.users.fetch(user).catch(err => {console.log(err);});
            let username = membr.username;

            userNames += `${i + 1}. ${username}\n`;
            points += `${data[i].total}\n`;

        }


        if(top10 === undefined || top10[0] === undefined || top10[0][0] === undefined) {
            interaction.reply({content: 'No one is on the leaderboard yet.', ephemeral: true});
        } else if(results === undefined || results[0] === undefined || results[0][0] === undefined) {


            let embed2 = new Discord.EmbedBuilder()
            .setTitle('This is the current thanks leaderboard.')
            .setColor(0xAD66A0)
            .addFields(
                [{name: `Top 10`, value: userNames, inline: true},
                {name: 'Thanks', value: points, inline: true},
                {name: 'How many thanks do you have?', value: `${aUsername}, you currently have \`0\` thank(s).`}]
            )
            .setFooter({text:'If there is an error here, please report this!'});

            interaction.reply({ embeds: [embed2], ephemeral: true });

         } else {
            const ponts = await connection.query(
                `SELECT thanks, SUM(CAST(thanks AS UNSIGNED)) AS total FROM Thanks WHERE user = ?;`,
                [author]
            );
            const p = ponts[0][0].total;
            let embed2 = new Discord.EmbedBuilder()
                .setTitle('This is the current thanks leaderboard.')
                .setColor(0xc9ca66)
                .addFields(
                    [{name: `Top 10`, value: userNames, inline: true},
                    {name: 'Thanks', value: points, inline: true},
                    {name: 'How many thanks do you have?', value: `${aUsername}, you currently have \`${p}\` thank(s).`}]
                )
                .setFooter({text:'If there is an error here, please report this!'});

            interaction.reply({ embeds: [embed2], ephemeral: true });
                }
    }
}