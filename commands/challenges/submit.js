const Discord = require('discord.js');
const connection = require('/root/codinghelp-bot/database.js');

module.exports = {
    name: 'submit',
    description: 'This is how users can submit answers to the challenge questions.',
    aliases: ['submits', 'answer'],
    usage: '++submit [challenge number] [answer]',
    example: '\`\`\`++submit 1 ` ` `language\n//code here ` ` `\nadditional information here.\n\`\`\`\nPlease remove the spaces between the backticks before language and after \`//code here\`. If you are submitting a link, please use this format: \`\`\`++submit 1 https://github.com\`\`\` Meaning keep it all on the same line. Not formatting it this way will cause issues with our system.',
    inHelp: 'yes',
    async execute (message, args) {

        let msgId = message.id;
        let guildId = message.guild.id;
        let dayNo = args[0];
        let answer = args.slice(1).join(' ');

        const result = await connection.query(
            `SELECT * FROM Submissions WHERE guildId = ?;`,
            [guildId]
        );
        if (result == undefined) {
            message.reply('You already made a submission to this challenge. You may not submit more than one answer per challenge question. If you need to modify your submission, please use the \`s.modify-answer [challenge number] [answer]\` command. Thank you!');
            return;
        } else {

            let author = message.author.id;
            let tag = message.author.username;
    
            if(!dayNo) {
                message.reply('Please include the challenge number you are submitting your answer to.');
                return;
            } else {
                if(!answer) {
                    message.reply('Please include your answer to the challenge number you are trying to answer. The mods cannot give you points for no answer. That\'s cheating.');
                    return;
                } else {
    
                    connection.query(
                        `INSERT INTO Submissions (guildId, msgId, author, message, challengeNo) VALUES (?, ?, ?, ?, ?);`,
                        [guildId, msgId, author, answer, dayNo]
                    ).catch(err => {console.log(err)})
    
                let embed = new Discord.MessageEmbed()
                    .setColor('#616169')
                    .setTitle(`Thank you, ${tag}, for submitting your answer for challenge ${dayNo}.`)
                    .setDescription(`The answer you submitted was:\n${answer}\n\nIf you want to modify your answer, please use this message id: \`${msgId}\``)
                    .setFooter(`If you need to modify your answer please run the ++modify-answer command. Thank you!`);
            
                    message.delete();
                message.client.users.cache.get(`${author}`).send(embed);
    
                }
            }


        }

    }
}