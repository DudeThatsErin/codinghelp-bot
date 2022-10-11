/*
  r/CodingHelp
  USING DISCORD.JS V14.3.0
*/
const fs = require('fs');
const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages ], partials: [Partials.Channel] });


// configurations
const config = require('./config/config.json');
client.commands = new Collection();
client.slashCommands = new Collection();
client.cooldowns = new Collection();
client.slashCooldowns = new Collection();
client.erinCommands = new Collection();
const { cooldowns, slashCooldowns } = client;

// ghost ping detector
// const GhostPing = require('discord.js-ghost-ping');

// client.on('messageDelete', (message) => {
// 	GhostPing.detector("messageDelete", message, {
//     title: 'Ghost Ping Detected',
//     color: '0xC0C0C0',
//     picture: 'https://i.imgur.com/k6pLhtU.png',
//     footer: 'Don\'t Ghost Ping, smh',
// })
// })

// client.on('messageUpdate', (oldMessage, newMessage) => {
// 	GhostPing.detector('messageUpdate', oldMessage, newMessage);
// })

// for all commands
let data = [];
function readFilesFromPath(pathString) {
  const directoryEntries = fs.readdirSync(pathString, { withFileTypes: true });

  return directoryEntries.reduce((filteredEntries, dirEnt) => {
    if (dirEnt.isDirectory()) {
      // If the entry is a directory, call this function again
      // but now add the directory name to the path string.
      filteredEntries.push(...readFilesFromPath(`${pathString}/${dirEnt.name}`))
    } else if (dirEnt.isFile()) {
      // Check if the entry is a file instead. And if so, check
      // if the file name ends with `.js`.
      if (dirEnt.name.endsWith('.js')) {
        // Add the file to the command file array.
        filteredEntries.push(`${pathString}/${dirEnt.name}`);
      }
    }

    return filteredEntries;
  }, []);
}

console.log('|-----------------------------------|');
console.log('       Loading Challenge Commands... ');
console.log('|-----------------------------------|');
// Call the read files function with the root folder of the commands and
// store all the file paths in the constant.
const commandFilePaths = readFilesFromPath('./commands');

// Loop over the array of file paths and set the command on the client.
commandFilePaths.forEach((filePath) => {
  const command = require(filePath);

  client.commands.set(command.name, command);
  console.log(command.name + ' loaded successfully!');
});


// create slash commands
console.log('|-----------------------------------|')
console.log('      Loading Slash Commands...      ')
console.log('|-----------------------------------|')
const commandFilePaths1 = readFilesFromPath('./slashcommands');

commandFilePaths1.forEach((filePath) => {
  const cmd = require(filePath);

  let object = {};
  if (cmd.name) { object.name = cmd.name; }
  if (cmd.description) { object.description = cmd.description; }
  if (cmd.options) { object.options = cmd.options; }

  data.push(object);
  //client.commands.delete(cmd.name, cmd);
  client.slashCommands.set(cmd.name, cmd);
  console.log(cmd.name + ' loaded successfully!');
});

// create test server only slash commands
console.log('|-----------------------------------|')
console.log('     Loading Erin Slash Commands...  ')
console.log('|-----------------------------------|')

const commandFilePaths2 = readFilesFromPath('./my-server-only');

commandFilePaths2.forEach((filePath) => {
  const cmdd = require(filePath);
  let object = {};
  if (cmdd.name) { object.name = cmdd.name; }
  if (cmdd.description) { object.description = cmdd.description; }
  if (cmdd.options) { object.options = cmdd.options; }

  data.push(object);
  //client.erinCommands.delete(cmd.name, cmd);
  client.erinCommands.set(cmdd.name, cmdd);
  // CHANGE THIS TO slashCommands ON TEST BOT.
  console.log(cmdd.name + ' loaded successfully!');
});

// events
console.log('|-----------------------------------|')
console.log('       Loading Event Files...        ')
console.log('|-----------------------------------|')
const eventFiles = fs.readdirSync(`${__dirname}/events`).filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
  const event = require(`${__dirname}/events/${file}`);
  if (event.once) client.once(event.name, (...args) => event.execute(...args, client));
  else client.on(event.name, (...args) => event.execute(...args, client));
  console.log(event.name + ' loaded successfully!');
}


// end of file
(async () => {
  connection = await require('./database.js');
  await client.login(config.token);
})();