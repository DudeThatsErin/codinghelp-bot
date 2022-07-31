const moment = require('moment');
const { MessageActionRow, MessageButton } = require('discord.js');
const config = require('../../config/config.json');
const filterLevels = {
    DISABLED: 'Off',
    MEMBERS_WITHOUT_ROLES: 'No Role',
    ALL_MEMBERS: 'Everyone'
};

const verificationLevels = {
    NONE: 'None',
    LOW: 'Low',
    MEDIUM: 'Medium',
    HIGH: '(╯°□°）╯︵ ┻━┻',
    VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
};

module.exports = {
    name: 'serverinfo',
    description: 'This allows users to find out more information about the server they run this command in.',
    aliases: ['server', 'club', 'serveri', 'server-info'],
    usage: `${config.prefix}serverinfo`,
    inHelp:'yes',
    example: `${config.prefix}serverinfo`,
    async execute (message) {
      const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setLabel('Our Website')
          .setStyle('LINK')
          .setURL('https://codinghelp.site'),
        new MessageButton()
          .setLabel('Our Subreddit')
          .setStyle('LINK')
          .setURL('https://reddit.com/r/CodingHelp'),
        new MessageButton()
          .setLabel('Our Discord')
          .setStyle('LINK')
          .setURL('https://discord.gg/geQEUBm')
      );
        const owner = await message.guild.fetchOwner();
        const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
        const emojis = message.guild.emojis.cache;
        const channels = message.guild.channels.cache.size;

        let serverEmbed = {
          color: '#CDC9CE',
          title: 'r/CodingHelp Server Info',
          thumbnail: {
            url: message.guild.iconURL({ dynamic: true })
          },
          fields: [
            {
              name: '**Name & ID:**',
              value: `${message.guild.name} - \`${message.guild.id}\``,
              inline: true
            },
            {
              name: '**Owner:**',
              value: `${owner.user.username} - \`${message.guild.ownerId}\``,
              inline: true
            },
            {
              name: '**Members:**',
              value:  `${message.guild.memberCount}`,
              inline: true
            },
            {
              name: '**Boost Tier:**',
              value: `${message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : 'None'}`,
              inline: true
            },
            {
              name: '**Explicit Filter:**',
              value: `${filterLevels[message.guild.explicitContentFilter]}`,
              inline: true
            },
            {
              name: '**Verification Level:**',
              value: `${verificationLevels[message.guild.verificationLevel]}`,
              inline: true
            },
            {
              name: '**Boost Count:**',
              value: `${message.guild.premiumSubscriptionCount || '0'}`,
              inline: true
            },
            {
              name: '**Time Created:**',
              value: `${message.guild.createdAt.toLocaleString()}`,
              inline: true
            },
            {
              name: '**Role Count:**',
              value: `${roles.length}`,
              inline: true
            },
            {
              name: '**Emoji Count:**',
              value: `${emojis.size}`,
              inline: true
            },
            {
              name: '**Regular Emoji Count:**',
              value: `${emojis.filter(emoji => !emoji.animated).size}`,
              inline: true
            },
            {
              name: '**Animated Emoji Count:**',
              value: `${emojis.filter(emoji => emoji.animated).size}`,
              inline: true
            },
            {
              name: '**Channels:**',
              value: `${channels}`,
              inline: true
            }
          ],
          timestamp: new Date(),
          footer: {
            text: 'If anything is wrong, please report this!',
            icon_url: message.guild.iconURL({ dyanmic: true })
          }
        }
            message.channel.send({ embeds: [serverEmbed], components: [row] });
    }
}