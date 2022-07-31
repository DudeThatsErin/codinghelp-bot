const moment = require('moment');
const config = require('../../config/config.json');

module.exports = {
    name: 'userinfo',
    description: 'This allows users to find out more information about themselves or another user they ping or provide the ID for.',
    aliases: ['user', 'person', 'useri', 'user-info'],
    usage: `${config.prefix}userinfo`,
    example: `${config.prefix}userinfo`,
    execute (message) {

      if (message.reference === null) { // just a regular message
        const member = message.mentions.users.first() || message.author || message.member;
        let userinfo = {};
        userinfo.createdat = member.createdAt;
        userinfo.discrim = member.discriminator;
        userinfo.id = member.id;
        userinfo.tag = member.tag;
        userinfo.nick = message.guild.members.cache.get(member.id).displayName;
        userinfo.uname = member.username;
        userinfo.avatar = member.displayAvatarURL({ dynamic: true });
        const memberMention = message.mentions.members.first() || message.member;
        const rolesOfTheMember = memberMention.roles.cache.filter(r => r.name !== '@everyone').map(role => role.name).join(', ');
        console.log(userinfo)

        var myInfo = {
          color: '#7DCE87',
          author: {
            name: userinfo.uname,
            icon_url: userinfo.avatar
          },
          title: 'About this user...',
          thumbnail: {
            url: userinfo.avatar
          },
          fields: [
            {
              name: 'Username',
              value: userinfo.uname,
              inline: true,
            },
            {
              name: 'Discriminator',
              value: userinfo.discrim,
              inline: true,
            },
            {
              name: 'Nickname',
              value: userinfo.nick,
              inline: true,
            },
            {
              name: 'User ID',
              value: userinfo.id,
              inline: true,
            },
            {
              name: 'Tag',
              value: userinfo.tag,
              inline: true,
            },
            {
              name: 'Joined server on',
              value: `\`${moment(message.guild.members.cache.get(member.id).joinedAt).format('MMM DD YYYY')}\``,
              inline: true,
            },
            {
              name: 'Joined Discord on',
              value: `\`${moment(member.createdAt).format('MMM DD YYYY')}\``,
              inline: true,
            },
            {
              name: 'Roles',
              value: rolesOfTheMember,
              inline: true,
            }
          ],
          timestamp: new Date(),
          footer: {
            text: 'If anything is wrong, please report this!',
            icon_url: message.guild.iconURL({ dynamic: true })
          }
        }
        message.channel.send({ embeds: [myInfo] });
        //console.log(myInfo)

        } else {
          const member = message.mentions.repliedUser;
          let userinfo = {};
          userinfo.createdat = member.createdAt;
          userinfo.discrim = member.discriminator;
          userinfo.id = member.id;
          userinfo.tag = member.tag;
          userinfo.nick = message.guild.members.cache.get(member.id).displayName;
          userinfo.uname = member.username;
          userinfo.avatar = member.displayAvatarURL({ dynamic: true });
          const memberMention = message.mentions.members.first() || message.member;
          const rolesOfTheMember = memberMention.roles.cache.filter(r => r.name !== '@everyone').map(role => role.name).join(', ')

          var myInfo = {
            color: '#7DCE87',
            author: {
              name: userinfo.uname,
              icon_url: userinfo.avatar
            },
            title: 'About this user...',
            thumbnail: {
              url: userinfo.avatar
            },
            fields: [
              {
                name: 'Username',
                value: userinfo.uname,
                inline: true,
              },
              {
                name: 'Discriminator',
                value: userinfo.discrim,
                inline: true,
              },
              {
                name: 'Nickname',
                value: userinfo.nick,
                inline: true,
              },
              {
                name: 'User ID',
                value: userinfo.id,
                inline: true,
              },
              {
                name: 'Tag',
                value: userinfo.tag,
                inline: true,
              },
              {
                name: 'Joined server on',
                value: `\`${moment(message.guild.members.cache.get(member.id).joinedAt).format('MMM DD YYYY')}\``,
                inline: true,
              },
              {
                name: 'Joined Discord on',
                value: `\`${moment(member.createdAt).format('MMM DD YYYY')}\``,
                inline: true,
              },
              {
                name: 'Roles',
                value: rolesOfTheMember,
                inline: true,
              }
            ],
            timestamp: new Date(),
            footer: {
              text: 'If anything is wrong, please report this!',
              icon_url: message.guild.iconURL({ dynamic: true })
            }
          }

          message.channel.send({ embeds: [myInfo] });
        }


    }

};