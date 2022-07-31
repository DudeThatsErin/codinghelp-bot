const config = require('../config/config.json');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const bot = require('../config/bot.json');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log('|-----------------------------------|')
        console.log('          Logging In...             ')
        console.log('|-----------------------------------|')
        console.log(`   ${client.user.tag} is\n   logged in and ready!`);
        console.log('|-----------------------------------|')
        console.log('          Error Logs...             ')
        console.log('|-----------------------------------|')

        client.user.setPresence({ activities: [{ name: 'Use ++ prefix' }] });

        const rest = new REST({ version: '9' }).setToken(config.token);

        (async () => {
            try {
                console.log('Started refreshing application (/) commands.');

                await rest.put(
                    Routes.applicationCommands(bot.id),
                    { body: client.slashCommands },
                );

                console.log('Successfully reloaded application (/) commands.');
            } catch (error) {
                console.error(error);
            }
        })();

    }
}