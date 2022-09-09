const Discord = require('discord.js');
const bot = require('../../config/bot.json');
const ee = require('../../config/embed.json');

module.exports = {
    name: 'botstatus',
    description: 'Pushes an embed to display in the channel about a certain update.',
    usage: `/botstatus Status Message`,
    ownerOnly: 1,
    options: [
        {
            name: 'message',
            description: 'What would you like to say?',
            type: 3,
            required: true
        }
    ],
    async execute(interaction, client) {

        const channel = client.channels.cache.find(channel => channel.id === bot.announcementsId); // test announcements 1014995248163852298 or real bot.announcementsId
        const reason = interaction.options.getString('message');


        let embed = new Discord.EmbedBuilder()
            .setColor(ee.bot_status)
            .setTitle('Hello, Erin has a new update for you!')
            .setDescription(reason)
            .setTimestamp()
            .setFooter({text: 'Want to suggest a feature for the bot? Use /suggest'});
        interaction.reply({ content: `I have sent the announcement for you. Please check ${channel}.`})
        channel.send({ content: `Hey, <@&772154227459883019>,`, embeds: [embed] }) // Subreddit Updates 780111997861363742 or Bot Updates 772154227459883019 or Server Updates 772153457111990282

    }
};