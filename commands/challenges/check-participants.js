const connection = require('../../database.js');
const config = require('../../config/config.json');

module.exports = {
    name: 'check-participants',
    description: 'This allows **mods** to check who has the participants role in their server.',
    aliases: ['cp', 'contestants', 'challenge-users', 'check-users'],
    usage: `${config.prefix}check-participants`,
    challengeMods: 1,
    async execute (message, args) {

                const result = await connection.query(
                    `SELECT * FROM Challenges WHERE guildId = ?`,
                    [message.guild.id]
                );
                    message.channel.send('These are the members with the \`Participants\` role in the \`Challenges\` Database. If something is wrong here, please report it!');
                for (const row of result[0]){
                    const Members = row.player;
                    const name = await message.guild.members.cache.find(members => members.id == Members);
                    const tag = name.user.tag;
                    message.channel.send({text: [tag]})
                  }


                }
}