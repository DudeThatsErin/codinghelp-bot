const Discord = require('discord.js');
const connection = require('/root/codinghelp-bot/database.js');


module.exports = {
    name: 'remove-points',
    description: 'This allows **mods** to automatically remove points from a participant\'s challenge in the Challenges database.',
    aliases: ['removepnts', 'minuspnts', 'minuspoints', 'mpnts', 'removepoints'],
    usage: '++remove-points <message ID> <number of points>',
    inHelp: 'yes',
    example: '++remove-points 850726247050903562 3',
    async execute (message, args) {
        let role = message.member.roles.cache.has('839863262026924083') || !message.member.roles.cache.has('718253309101867008');
        if(!role){ 
            message.channel.send('You do not have permission to run this command. Only moderators can run this command!');
            return;
        } else {
            let msgId = args[0];
            let author = message.author.username;
            let name = message.author.id;
            let points = args[1];
            const results = await connection.query(
                `SELECT * FROM Submissions WHERE msgId = ?;`,
                [msgId]
            );
            let player = results[0][0].author;
            let playerID = await message.client.users.fetch(player).catch(err => {console.log(err);});
            let playerName = playerID.username;
    
            if(!msgId){ 
                message.channel.send('You need to include the submission\'s message ID of the submission you want to add points to.');
                return;
            } else {
                    
                    let embed = new Discord.MessageEmbed()
                        .setColor('#c9a066')
                        .setTitle(`I have removed ${points} points from ${playerName}!`)
                        .setDescription(`Thank you for that, ${author}!`)
                        .setFooter('If there is a problem with this, please report it!');
                    
                    connection.query(
                        `UPDATE Submissions SET moderator = ?, points = points - ? WHERE msgId = ?;`,
                        [name, points, msgId]
                    );
                    message.channel.send(embed);    

            }
        }    

    }
}