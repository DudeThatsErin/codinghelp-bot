const connection = require('../../database.js');
const bot = require('../../config/bot.json');
const config = require('../../config/config.json');

module.exports = {
    name: 'clear-reports',
    description: 'Allows **Erin** to clear out all of the reports in the system, she usually just uses this for testing purposes.',
    aliases: ['clearreports', 'deletereports', 'delete-reports'],
    usage: `${config.prefix}clear-reports`,
    ownerOnly: 1,
    example: `${config.prefix}clear-reports`,
    async execute(message) {
        await connection.query(
            `TRUNCATE TABLE reports;`
        );
        const fetchedChannel = message.guild.channels.cache.get(bot.reportsChId);
        fetchedChannel.bulkDelete(99);

        message.react('✅');
    }
}