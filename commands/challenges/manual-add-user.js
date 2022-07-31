const Discord = require('discord.js');
const connection = require('../../database.js');
const config = require('../../config/config.json');

module.exports = {
    name: 'add-user',
    description: 'This allows **mods** to manually add users to the participants database.',
    aliases: ['add-user', 'manualadd-user', 'manual-add-user', 'manualadduser', 'mau'],
    usage: `${config.prefix}manual-add-user`,
    example: `${config.prefix}manual-add-user 839863262026924083`,
    challengeMods: 1,
    async execute(message, args, client) {
        const g = message.guild.id;
        const mmbr = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || client.users.cache.get(args[0]) || await client.users.fetch(args[0]).catch(() => { });
        console.log(mmbr.id)
        const tag = mmbr.tag;
        if (!mmbr) {
            message.reply({text:'You need to include a user ID or mention of the user you want to add to the database.'});
        } else {
            const isAlreadyPlaying = await connection.query(
                `SELECT player FROM Challenges WHERE player = ? AND guildId = ?;`,
                [mmbr.id, message.guild.id]
            );
            if (!isAlreadyPlaying[0][0]?.player) {
                message.channel.send({ content: `I have added ${tag} to the database. 👍` });
                connection.query(
                    `INSERT INTO Challenges (guildId, player) VALUES (?, ?);`,
                    [message.guild.id, mmbr.id]
                );
            } else {
                message.react('❌');
                message.reply({text:`That user has already been added to the database. I am not able to add them to the database again. If believe they are not in the database, please run the \`s.check-participants\` command. If you have confirmed they are not in the database with that command, please report this error to the dev using the \`${config.prefix}report\` command.`});
                return;
            }
        }

    }
}