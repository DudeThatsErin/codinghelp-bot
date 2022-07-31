const connection = require('../../database.js');
const config = require('../../config/config.json');

module.exports = {
    name: 'purge-submissions',
    description: 'This gives **Erin** the ability to purge all submissions from the submissions database. *Note:* This does *not* delete them from the channel within discord.',
    aliases: ['purges', 'psubmissions', 'psubs', 'purgesubs', 'deletesubs', 'delete-subs'],
    usage: `${config.prefix}purge-submissions`,
    example: `${config.prefix}purge-submissions`,
    ownerOnly: 1,
    async execute (message, args) {

            connection.query(
                `DELETE FROM Submissions WHERE guildId = ?;`,
                [message.guild.id]
            );
        message.react('✅');



    }
}