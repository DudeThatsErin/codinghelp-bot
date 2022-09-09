const config = require('../../config/config.json');
const bot = require('../../config/bot.json');
const owner = require('../../config/owner.json');
const { ActionRowBuilder, ButtonBuilder } = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Makes sure the bot can hear commands.',
    usage: `/ping `,
    cooldown: 5,
    execute(interaction, client) {
        let days = Math.floor(client.uptime / 86400000);
        let hours = Math.floor(client.uptime / 3600000) % 24;
        let minutes = Math.floor(client.uptime / 60000) % 60;
        let seconds = Math.floor(client.uptime / 1000) % 60;

        const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setLabel('Our Subreddit')
            .setStyle(5)
            .setURL('https://reddit.com/r/CodingHelp'),
          new ButtonBuilder()
            .setLabel('Our Website')
            .setStyle(5)
            .setURL('https://codinghelp.site'),
          new ButtonBuilder()
            .setLabel('Our Discord')
            .setStyle(5)
            .setURL('https://discord.gg/geQEUBm')
        );

        let embed = {
          color: 0xffffff,
          title: `${bot.name} is online!`,
          url: bot.url,
          thumbnail: {
            url: bot.avatar
          },
          description:`Thanks for checking if ${bot.name} was online. ${bot.name} has been awake for \`${days}d ${hours}h ${minutes}m ${seconds}s\`! That is the last time ${owner.name} reset ${bot.name}. You can see the uptime of my website [here](${bot.uptime})!\nMy prefix is \`${config.prefix}\`\nI am the official bot of the [CodingHelp](${bot.url}) Discord Server! If you want to see all of my commands run \`/help\` or [check here](${bot.commands}).\nIf you want to know exactly how I am coded, you can see all of my pieces parts on my [GitHub Repo](${bot.github}).\n\nYou can find CodingHelp at these locations:\n[Reddit](${bot.reddit})\n\nIf you have found an issue with the bot, please run \`/report\` to report the issue!`,
          timestamp: new Date(),
          footer: {
            text: `Thanks for using ${bot.name}!`,
            icon_url: bot.avatar
          }
        }

        interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
    }
};