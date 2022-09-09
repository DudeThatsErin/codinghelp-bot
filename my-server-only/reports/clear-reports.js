const connection = require('../../database.js');
const bot = require('../../config/bot.json');

module.exports = {
    name: 'clearreports',
    description: 'Allows **Erin** to clear out all of the reports in the system.',
    usage: `/clearreports`,
    ownerOnly: 1,
    async execute(interaction) {
        await connection.query(
            `TRUNCATE TABLE reports;`
        );
        const fetchedChannel = interaction.guild.channels.cache.get(bot.reportsChId);
        fetchedChannel.bulkDelete(99, true);

        interaction.reply({ content: 'I have cleared out the reports channel AND the reports database! If messages did **not** get deleted then that means they are over 14 days old.'});
    }
}