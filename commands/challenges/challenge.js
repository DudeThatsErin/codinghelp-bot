const Discord = require('discord.js');
const connection = require('../../database.js');
const config = require('../../config/config.json');

module.exports = {
    name: 'challenge',
    description: 'This command allows **mods** to add additional challenge questions to the Challenge System.',
    aliases: ['new-challenge', 'chall', 'c'],
    usage: `${config.prefix}challenge [challenge number] [question]`,
    example: `${config.prefix}challenge 1 What is my favorite color?`,
    challengeMods: 1,
    async execute (message, args) {

        let msgId = message.id;
        let guildId = message.guild.id;
        let challengeNo = args[0];
        let answer = args.slice(1).join(' ');
        let moderator = message.author.id;

        const result = await connection.query(
            `SELECT * FROM Challenge WHERE guildId = ?;`,
            [guildId]
        );
        const announcementsChannel = result[0][0].channelD;


        if (!challengeNo) {
                const challenge = await connection.query(
                    `SELECT * FROM Challenge WHERE guildId = ? ORDER BY challengeNo DESC LIMIT 1;`,
                    [guildId]
                );
            const challengeNo = challenge[0][0].challengeNo;
            message.react('❓');
                message.reply({text:`What challenge number are you trying to add to the database? The last challenge number in the database is ${challengeNo}.`});
                return;
        } else {
            if (!answer) {
                message.react('❓');
                message.reply({text:'What is the challenge that you want to submit? You can\'t submit a blank challenge.'});
                return;
            } else {

                let embeD = new Discord.EmbedBuilder()
                    .setColor(0x848099)
                    .setTitle(`Challenge ${challengeNo}`)
                    .setDescription(answer)
                    .setFooter({text:`Run the ${config.prefix}submit command to submit answers to this challenge.`});


                message.guild.channels.cache.get(announcementsChannel).send({text:`Hey, <@&850732454770901002> A new challenge is up!`, embeds: [embeD]}).then(message => {
                    const msg = message.id;
                    connection.query(
                        `INSERT INTO Challenge (guildId, msgId, moderator, title, challengeNo) VALUES (?, ?, ?, ?, ?)`,
                        [guildId, msg, moderator, answer, challengeNo]
                    );
                });
                const results = await connection.query(
                    `SELECT * FROM Challenge WHERE guildId = ? AND challengeNo = ?;`,
                    [guildId, challengeNo]
                );
                const res = results[0][0];
                const mes = res.msgId;
                let embed = new Discord.EmbedBuilder()
                    .setColor(0x92caa0)
                    .setTitle(`I have added Challenge number ${challengeNo} to the \`Challenge\` Database.`)
                    .setDescription(`The submission is as follows: ${answer} You can see it here: <#${announcementsChannel}>.\n\nThe message ID for the challenge is: \`${mes}\``)
                    .setFooter('If this is in error, please report this!');

                message.channel.send({ embeds: [embed] })
                message.delete();
                }
            }


    }
}