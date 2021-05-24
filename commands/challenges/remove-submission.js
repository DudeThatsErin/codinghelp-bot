const Discord = require('discord.js');
const connection = require('/root/codinghelp-bot/database.js');


module.exports = {
    name: 'remove-submissions',
    description: 'This allows **mods** to remove responses to challenges.',
    aliases: ['rs', 'rmsubs', 'rm-subs', 'removesubmissions', 'removesubmission', 'rmsub'],
    usage: '++remove-submissions [message ID]',
    example: '++remove-submissions 841301824115965952',
    inHelp: 'yes',
    async execute (message, args) {
        let name = message.author.id;
        const modname = await message.client.users.fetch(name).catch(err => {console.log(err);});

        let submission = args[0];
        if(!message.member.roles.cache.has('839863262026924083') ){ 
            message.channel.send('You can\'t use this command, only mods can use this command. If you are a mod and you are seeing this, it is because only users with the <@839863262026924083> role can use this command.').cleanContent;
            return;
        } else {
            if(!submission) {
                message.channel.send('Please include the message ID of the submission you want to remove. Thank you!');
                return;
            } else {
                const results = await connection.query(
                    `SELECT * FROM Submissions WHERE msgId = ? AND guildId = ?;`,
                    [submission, message.guild.id]
                )
                    const player = results[0][0].Author;
                    const user = await message.client.users.fetch(player).catch(err => {console.log(err);});
                    const username = user.username;
                    const Submissions = results[0][0].Message;
                    const dayNo = results[0][0].dayNo;

                    const embed = new Discord.MessageEmbed()
                        .setColor('#d4a066')
                        .setTitle(`The submission by ${username} for Challenge ${dayNo} has been removed.`)
                        .setDescription(`Their submission is as follows:\n${Submissions}\n\nThe moderator that removed it was: ${modname}.`)
                        .setFooter('If there is a problem with this, please report this!');

                        message.channel.send(embed);

                        await connection.query(
                            `DELETE FROM Submissions WHERE msgId = ? AND guildId = ?;`,
                            [submission, message.guild.id]
                        );
                }
                }
                }
}