const connection = require('../../database.js');
const config = require('../../config/config.json');

module.exports = {
    name: 'end-challenge',
    description: 'This gives **mods** the ability to end the challenge that was just being played.',
    aliases: ['endchallenge', 'echallenge', 'exitchallenge', 'exitc', 'over'],
    usage: `${config.prefix}end-challenge`,
    example: `${config.prefix}end-challenge`,
    challengeMods: 1,
    async execute (message, args) {

            connection.query(
                `DELETE FROM Challenge WHERE guildId = ?;`,
                [message.guild.id]
            );
            connection.query(
                `DELETE FROM Challenges WHERE guildId = ?;`,
                [message.guild.id]
            );
            connection.query(
                `DELETE FROM Submissions WHERE guildId = ?;`,
                [message.guild.id]
            );

        message.react('✅');

    }
}