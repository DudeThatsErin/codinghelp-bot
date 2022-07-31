const connection = require('../../database.js');
const config = require('../../config/config.json');

module.exports = {
    name: 'clearsuggs',
    aliases: ['clearsuggestions', 'cleardb', 'cdb', 'emptydb', 'emptysuggestions', 'clear-suggs'],
    description: 'Emptys the Suggestion Database.',
    usage: `${config.prefix}clearsuggs`,
    ownerOnly: 1,
    async execute(message) {

        connection.query(`TRUNCATE TABLE Suggs;`);


        message.channel.bulkDelete(99);

    }
};