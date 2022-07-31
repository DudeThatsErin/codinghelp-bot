const Discord = require('discord.js');
const connection = require('../../database.js');
const config = require('../../config/config.json');

module.exports = {
    name: 'remove-submissions',
    description: 'This allows **mods** to remove responses to challenges.',
    aliases: ['rs', 'rmsubs', 'rm-subs', 'removesubmissions', 'remove-submission', 'removesubmission', 'rmsub'],
    usage: `${config.prefix}remove-submissions [message ID]`,
    example: `${config.prefix}remove-submissions 841301824115965952`,
    challengeMods: 1,
    async execute (message, args) {
        let name = message.author.id;
        const modname = await message.client.users.fetch(name).catch(err => {console.log(err);});
        let submission = args[0];

        if (!submission) {
            message.react('❌');
                message.channel.send({content:'Please include the message ID of the submission you want to remove. Thank you!'});
                return;
            } else {
                const results = await connection.query(
                    `SELECT * FROM Submissions WHERE msgId = ? AND guildId = ?;`,
                    [submission, message.guild.id]
                )
                    const player = results[0][0].author;
                    const user = await message.client.users.fetch(player).catch(err => {console.log(err);});
                    const username = user.username;
                    const Submissions = results[0][0].message;
                    const dayNo = results[0][0].challengeNo;

                    const embed = new Discord.EmbedBuilder()
                        .setColor(0xd4a066)
                        .setTitle(`The submission by ${username} for Challenge ${dayNo} has been removed.`)
                        .setDescription(`Their submission is as follows:\n${Submissions}\n\nThe moderator that removed it was: ${modname}.`)
                        .setFooter({text:'If there is a problem with this, please report this!'});

                message.channel.send({ embeds: [embed] });

                        await connection.query(
                            `DELETE FROM Submissions WHERE msgId = ? AND guildId = ?;`,
                            [submission, message.guild.id]
                        );
                }
                }
}