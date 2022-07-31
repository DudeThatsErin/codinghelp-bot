const config = require('../../config/config.json');
const { MessageBuilder } = require('discord.js');

module.exports = {
    name: 'avatar',
    aliases: ['av', 'icon', 'profileicon', 'ava'],
    description: 'Displays a user\'s profile picture as well as links to view them in JPEG, PNG, and WEBP.',
    usage: `${config.prefix}avatar or ${config.prefix}avatar [other person\'s username]`,
    example: `${config.prefix}avatar or ${config.prefix}avatar @DudeThatsErin#8736`,
    execute(message, args) {

        const myEmbed = new MessageBuilder()
            .setColor(0x38A6BC)
            .setTitle('Your Avatar')
            .setDescriptions(`${message.author.displayAvatarURL({ format: 'png', dynamic: true})}`)
            .addFields(
                {
                    name: 'PNG',
                    value: message.author.displayAvatarURL({ fomrat: 'png', dynamic: true })
                },
                {
                    name: 'JPEG',
                    value: message.author.displayAvatarURL({ format: 'jpeg', dynamic: true })
                },
                {
                    name: 'WEBP',
                    value: message.author.displayAvatarURL({ fomrat: 'webp', dynamic: true})
                }
                )
            .setThumbnail(message.author.displayAvatarURL({ format: 'png', dynamic: true}))
            .setTimestamp()
            .setFooter({ text: `Requested by ${message.author.username}`, icon_url: message.author.displayAvatarURL({ format: 'png', dynamic: true })});

        if(!args) return message.channel.send({ embeds: [myEmbed] });

        const theirEmbed = new MessageBuilder()
            .setColor(0x38A6BC)
            .setTitle(`These are the avatars you wanted to see...`)
            .setTimestamp()
            .setFooter({ text: `Requested by ${message.author.username}`, icon_url: message.author.displayAvatarURL({ format: 'png', dynamic: true}) });

        const avatarList = message.mentions.users.map(user => {
            theirEmbed.setDescription(`${user.username}\'s avatar:\n` + user.displayAvatarURL({ format: 'png', dynamic: true}))
            theirEmbed.addFields({ name: `PNG`, value: user.displayAvatarURL({ format: 'PNG', dynamic: true})}, { name: `JPEG`, value: user.displayAvatarURL({ format: 'JPEG', dynamic: true})}, { name: 'WEBP', value: user.displayAvatarURL({ format: 'WEBP', dynamic: true})})
        });

        message.channel.send({ embeds: [theirEmbed] })

    }
}