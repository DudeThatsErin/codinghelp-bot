const Discord = require('discord.js');
const connection = require('/root/codinghelp-bot/database.js');


module.exports = {
    name: 'remove-user',
    description: 'This allows **mods** to manually remove users to the participants database.',
    aliases: ['remove-people', 'removeuser'],
    usage: '++remove-user <tag user or ID>',
    example: '++remove-user @DudeThatsErin',
    inHelp: 'yes',
    execute (message, args) {
 
        if(!message.member.roles.cache.has('839863262026924083') ){ 
            message.channel.send('You can\'t use this command, only mods can use this command. If you are a mod and you are seeing this, it is because only users with the \`MANAGE_MESSAGES\` permission can use this command.');
        } else {
            const mmbr = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            const id = mmbr.user.id;
            const tag = mmbr.user.tag;
            if(!mmbr) {
                message.reply('You need to include a user ID or mention of the user you want to add to the database.');
            } else {
                    let embed = new Discord.MessageEmbed()
                        .setColor('RED')
                        .setTitle(`User I have removed from the database`)
                        .setDescription(`${tag}`)
                        .setFooter('If this is wrong, please report this.');
                    message.channel.send(embed);
                   connection.query(
                        `DELETE FROM Challenges WHERE guildId = ? AND player = ?;`,
                        [message.guild.id, id]
                    );
                    console.log('successfully added users in embed to the database!');
                } 
        }

    }
}