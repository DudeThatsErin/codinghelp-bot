const connection = require('../../database.js');

module.exports = {
    name: 'clearsuggs',
    description: 'Emptys the Suggestion Database.',
    usage: `/clearsuggs`,
    ownerOnly: 1,
    async execute(interaction) {

        connection.query(`TRUNCATE TABLE Suggs;`);
        const fetchedChannel = interaction.guild.channels.cache.get(bot.suggestionsId);
        fetchedChannel.channel.bulkDelete(99, true);

        interaction.reply({content: 'I have deleted everything from the server AND the database! If there are any messages left, that is because they are older than 14 days old.'})

    }
};