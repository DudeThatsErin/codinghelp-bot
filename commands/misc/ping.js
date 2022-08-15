const config = require('../../config/config.json');
const bot = require('../../config/bot.json');
const owner = require('../../config/owner.json');

module.exports = {
    name: 'ping',
    description: 'Makes sure the bot can hear commands.',
    aliases: ['pong', 'beep', 'online', 'bot', 'hello', 'hi'],
    example: `${config.prefix}ping or ${config.prefix}hi`,
    cooldown: 5,
    execute(message, client) {
        let days = Math.floor(message.client.uptime / 86400000);
        let hours = Math.floor(message.client.uptime / 3600000) % 24;
        let minutes = Math.floor(message.client.uptime / 60000) % 60;
        let seconds = Math.floor(message.client.uptime / 1000) % 60;

        let embed = {
          color: 0xffffff,
          title: `${bot.name} is online!`,
          url: bot.url,
          thumbnail: {
            url: bot.avatar
          },
          description:`Thanks for checking if ${bot.name} was online. ${bot.name} has been awake for \`${days}d ${hours}h ${minutes}m ${seconds}s\`! That is the last time ${owner.name} reset ${bot.name}. You can see the uptime of my website [here](${bot.uptime})!\nMy prefix is \`${config.prefix}\`\nI am the official bot of the [CodingHelp](${bot.url}) Discord Server! If you want to see all of my commands run \`/help\` or [check here](${bot.commands}).\nIf you want to know exactly how I am coded, you can see all of my pieces parts on my [GitHub Repo](${bot.github}).\n\nYou can find CodingHelp at these locations:\n[Reddit](${bot.reddit})\n\nIf you have found an issue with the bot, please run \`${config.prefix}report\` to report the issue!`,
          timestamp: new Date(),
          footer: {
            text: `Thanks for using ${bot.name}!`,
            icon_url: bot.avatar
          }
        }

        message.reply({ embeds: [embed] });
    }
};