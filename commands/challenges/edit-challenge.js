const Discord = require('discord.js');
const connection = require('../../database.js');
const config = require('../../config/config.json');

module.exports = {
    name: 'edit-challenge',
    description: 'This gives **mods** the ability to edit the challenge questions that get asked.',
    aliases: ['editchal', 'editchallenge', 'modify-challenge', 'ec'],
    usage: `${config.prefix}edit-challenge [challenge number] [new question]`,
    challengeMods: 1,
    example: `${config.prefix}ec 5 What type of pizza is Erin\'s favorite?`,
    async execute (message, args) {

        // THIS CURRENTLY DOES NOT LOOK FOR THE CHALLENGE NUMBER. NEED TO UPDATE IT SO THE CHALLNEGE NUMBER IS USED IN THE DB TO FIND THE EXACT ONE THAT NEEDS TO BE UPDATED.
            let day = args[0];
            let title = args.slice(1).join(' ');

            const result = await connection.query(
                `SELECT * FROM Challenge WHERE guildId = ?;`,
                [message.guild.id]
            );
            const msgId = result[0][0].msgId;
            const ch = result[0][0].channelD;
            const channel = message.guild.channels.cache.find(c => c.id === ch);

            connection.query(
                `UPDATE Challenge SET title = ? WHERE msgId = ? AND guildId = ?`,
                [title, msgId, message.guild.id]
            );

            let embed = new Discord.EmbedBuilder()
                .setColor(0x848099)
                .setTitle(`Challenge ${day}`)
                .setDescription(`${title}`)
                .setFooter({text:`Run the ${config.prefix}submit to submit answers to this challenge.`});

        channel.messages.fetch(msgId).then(message => {
            if (message) message.edit({ embeds: [embed] });
        });

            message.react('✅');



    }
}