const Discord = require('discord.js');
const bot = require('../../config/bot.json');

module.exports = {
    name: 'welcome',
    description: 'Displays information about our server.',
    usage: `/welcome`,
    modOnly: 1,
    execute(interaction) {

        const welcomeEmbed = new Discord.EmbedBuilder()
            .setColor(0x000000)
            .setTitle('Welcome to r/CodingHelp\'s Discord Server!')
            .setDescription('We are a Discord Server dedicated to helping people learn how to code. We have over 2.6k members and can\'t wait to welcome more! Come join the community of people that are looking to share their knowledge with new programmers!\n\nYou can also find us on [Reddit](https://reddit.com/r/CodingHelp) with over 55k members or on our new [Knowledgebase](https://codinghelp.site)!')
            .setImage('https://images-ext-1.discordapp.net/external/r__1ELtLocROQQFz8W5GmWQzOA5wlP4Tag7XTbGqQpY/https/media.discordapp.net/attachments/586293598996135953/757414290058903712/FxSHhhK.png')
            .addFields(
                { name: 'Current Staff', value: 'Owner: <@455926927371534346>\nDiscord Mods: <@541305895544422430> & <@732667572448657539>\nSubreddit Mods: <@248491088355131396>, <@391653195912577025>, <@137956696210407424>, <@959483587940458519>, <@320861867062853632> & <@136611109007261696>' },
                { name: 'How can I become part of the staff team?', value: 'You can apply by using <@575252669443211264>. Send the <@575252669443211264> bot a DM and we will respond. We accept applications all year long though becoming a mod happens randomly. We will post in <#359760352470368281> when we are opening moderator positions for any of our locations.' },
            )
            .setFooter({ text: 'Logo by Matt aka v4#1503.'});

            const fetchedChannel = interaction.guild.channels.cache.get(bot.announcementsId); // test bot: 1014995248163852298
            fetchedChannel.send({ embeds: [welcomeEmbed], components: [
            {
              type: 1,
              components: [
                {
                  type: 2,
                  style: 5,
                  label: 'Invite your friends!',
                  url: `https://discord.gg/geQEUBm`
                }, {
                  type: 2,
                  style: 5,
                  label: 'Visit our Knowledgebase!',
                  url: `https://codinghelp.site`
                }
              ]
            }
          ] });

          interaction.reply({content: `I have done it, please check ${fetchedChannel}!`, ephemeral: true})
    }
  };