const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const bot = require('../../config/bot.json');
const token = require('../../config/config.json').token;

module.exports = {
  name: 'createcommands',
  aliases: ['startslash', 'create-commands'],
  description: 'Allows Erin to create the Slash Commands.',
  ownerOnly: 1,
  execute(message) {
    const rest = new REST({ version: '10' }).setToken(token);

    (async () => {
        try {

          //console.log('client ', message.client.slashCommands)

            await rest.put(
                Routes.applicationGuildCommands(bot.id, bot.serverId),
                { body: message.client.slashCommands },
            );

            message.reply('created client.slashCommands')

            await rest.put(
                Routes.applicationGuildCommands(bot.id, bot.testServerId),
                { body: message.client.erinCommands },
            );

            message.reply('created client.slashCommands & client.erinCommands')

        } catch (error) {
            console.error(error);
            message.react('❌');
            message.reply({content: `There was an error... ${error}`});
        }
    })();

    message.reply({content: 'Created the commands!'});
  }
}