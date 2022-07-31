const Discord = require('discord.js');
const connection = require('../../database.js');
const config = require('../../config/config.json');

module.exports = {
    name: 'remove-user',
    description: 'This allows **mods** to manually remove users to the participants database.',
    aliases: ['remove-people', 'removeuser'],
    usage: `${config.prefix}remove-user <tag user or ID>`,
    example: `${config.prefix}remove-user @DudeThatsErin`,
    challengeMods: 1,
    execute (message, args) {


            const mmbr = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            const id = mmbr.user.id;
            const tag = mmbr.user.tag;
            if(!mmbr) {
                message.reply({content:'You need to include a user ID or mention of the user you want to add to the database.'});
            } else {
                    let embed = new Discord.EmbedBuilder()
                        .setColor('RED')
                        .setTitle(`User I have removed from the database`)
                        .setDescription(tag)
                        .setFooter({text:'If this is wrong, please report this.'});
                message.channel.send({ embeds: [embed] });
                   connection.query(
                        `DELETE FROM Challenges WHERE guildId = ? AND player = ?;`,
                        [message.guild.id, id]
                    );
                }

    }
}