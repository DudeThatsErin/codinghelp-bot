const config = require('../../config/config.json');
module.exports = {
  name: 'tech',
  description: 'Refers user to the Techway Server for additional technical help.',
  aliases: ['tw', 'techway', 'tech-help', 'th'],
  usage: `${config.prefix}tech`,
  example: `${config.prefix}tech or ${config.prefix}tw`,
  execute(message) {

      message.channel.send('Hey! Not sure if you knew this but you can visit the Techway server for additional help. Here is the invite link: https://discord.gg/cBUetVq');
  },

};