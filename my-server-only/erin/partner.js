// at the top of your file
const Discord = require('discord.js');
const ee = require('../../config/embed.json');
const bot = require('../../config/bot.json');

module.exports = {
    name: 'partners',
    description: 'Displays all the information on the #partners channel.',
    usage: `/partners`,
    modOnly: 1,
    execute(interaction) {

        const aboutPartner = new Discord.EmbedBuilder()
            .setColor(ee.rand_color)
            .setTitle('What is a Discord Partner?')
            .setDescription('That is someone that has partnered with our server as they believe in it as much as the staff team does.')
            .addFields(
                { name: 'How do I become a Discord Partner?', value: 'All you need to do is message the mods and ask. To message the mods you will want to use our Modmail bot: <@575252669443211264> Be sure to include the invite link to your server.\nAlternatively, you can [visit our website](https://codinghelp.site/) to fill out our application and we will get back to you.\nNote: Small servers will not be accepted. Your server will need to be established with at least 1,000 members. This doesn\'t mean you will be accepted with that minimum, just that we will consider you with at least that many members.' },
            )

        const smartWatch = new Discord.EmbedBuilder()
            .setColor(ee.rand_color)
            .setTitle('Smart Watch')
            .setImage('https://media.discordapp.net/attachments/792764567649517582/793749473959346186/Banner.png')
            .setDescription('The server for the intellectual watch wearer. Smartwatch is a place to talk with other watch wearers and get help on making your smartwatch part of your daily life, with Support teams for the major wearable brands. We offer community & brand events, as well as up to date news about your favorite brands.')
            .addFields(
                { name: 'Representative', value: '<@521656100924293141>', inline: true },
                { name: '♾️Link', value: 'https://discord.gg/geQEUBm', inline: true },
            );


            const fetchedChannel = interaction.guild.channels.cache.get(bot.announcementsId); // test bot: 1014995248163852298
            fetchedChannel.send({ embeds: [aboutPartner, smartWatch] });

        interaction.reply({content: `I have done it, please check ${fetchedChannel}!`, ephemeral: true});

    },

};