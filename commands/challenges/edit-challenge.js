const Discord = require('discord.js');
const connection = require('/root/codinghelp-bot/database.js');


module.exports = {
    name: 'edit-challenge',
    description: 'This gives **mods** the ability to edit the challenge questions that get asked.',
    aliases: ['editchal', 'editchallenge', 'modify-challenge', 'ec'],
    usage: '++edit-challenge [challenge number] <number of points> [message ID]',
    async execute (message, args) {

        if(!message.member.roles.cache.has('839863262026924083') ){ 
            message.channel.send('You can\'t use this command, only mods can use this command. If you are a mod and you are seeing this, it is because only users with the \`MANAGE_MESSAGES\` permission can use this command.');
            return;
        } else {
            let day = args[0];
            let title = args.slice(1).join(' ');

            const result = await connection.query(
                `SELECT * FROM Challenge WHERE guildId = ?;`,
                [message.guild.id]
            );
            const msgId = result[0][0].msgId;
            const ch = result[0][0].channelD;
            const channel = message.guild.channels.cache.find(c => c.id === `${ch}`);


            channel.messages.fetch(msgId).then(message => {
                if(message) message.edit(embed);
            });

            connection.query(
                `UPDATE Challenge SET title = ? WHERE msgId = ? AND guildId = ?`,
                [title, msgId, message.guild.id]
            );

            let embed = new Discord.MessageEmbed()
                .setColor('BLUE')
                .setTitle(`Challenge ${day}`)
                .setDescription(`${title}`)
                .setFooter('Run the ++submit to submit answers to this challenge.');

            message.delete();
            message.reply('Thanks! I have updated the message you gave me the ID for.');

        }


    }
}