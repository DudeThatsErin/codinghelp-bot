const Discord = require('discord.js');
const config = require('../../config/config.json');
module.exports = {
    name: 'boosters',
    description: 'Displays an embed with information on the benefits to becoming a server booster.',
    usage: `/boosters`,
    ownerOnly: 1,
    execute(interaction) {
      const boosters = new Discord.EmbedBuilder()
        .setColor(0xFFA500)
        .setTitle('Would you like to become a server booster?')
        .setDescription(`Thanks for wanting to become a server booster. We have tons of benefits which you receive just by boosting our server.`)
        .addFields(
          {
            name: 'Private Personal Coding Help Channel',
            value: 'We have several members of our server who have offered to provide assistance to our Server Boosters in a private channel. Each booster\'s channel is private and only they and our helpers can access it. You can ping <@455926927371534346> and the helpers as much as you want and we will be available as long as we are awake.'
          },
          {
            name: 'Free Small Discord Bot or (small) website hosting.',
            value: '<@455926927371534346> owns a VPS with [fantastic uptime](https://stats.uptimerobot.com/0pj23Sk01K). The Discord Bot hosting means that you can keep your bot online even when your PC is not on. The website hosting is for websites with 2-3 pages, like a portfolio or blog. This is perfect for a WordPress website as well. If you want to know more about what this entails, feel free to reach out via <@575252669443211264> and we can go over it with you.'
          },
          {
            name: 'Advertising for your project or discord server in Partners Channel for as long as you boost the server.',
            value: 'As long as you are boosting, you can advertise 1 project or 1 server in the channel.'
          },
          {
            name: 'If you decide to boost 2x, Erin will create you a small discord bot or small website from scratch.',
            value: '<@455926927371534346> will host it on her VPS (or if you have hosting we can use that). She will make it and it will be top priority for her until completed.'
          },
          {
            name: 'If you decide to boost 3x or more, Erin can make a bigger discord bot or website from scratch for you.',
            value: '<@455926927371534346> will also provide a free TLD name (.com, .org, .etc) as well as hosting for that and whatever projects you have while you are boosting the server.'
          },
          {
            name: 'There are more features to come...',
            value: 'We are always thinking over what features we want to add for Server Boosters. If you have any suggestions, run the \`/suggest\` command and we will think over your suggestion.'
          }
        )
        .setTimestamp()
        .setFooter({text: 'Thanks for your consideration for boosting the server! Happy Coding!'});

        const fetchedChannel = interaction.guild.channels.cache.get(bot.announcementsId); // test bot: 1014995248163852298
        fetchedChannel.send({ embeds: [boosters]});

        interaction.reply({content: `I have done it, please check ${fetchedChannel}!`, ephemeral: true})
    }

  }