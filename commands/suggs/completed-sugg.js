const Discord = require('discord.js')
const connection = require('../../database.js');
const config = require('../../config/config.json');

module.exports = {
    name: 'completedsugg',
    aliases: ['cs', 'dones', 'donesugg', 'completed-suggestion', 'completed-sugg', 'completedsugg', 'ok-sugg', 'ok-suggestion', 'completedsuggestion', 'completedsuggestions', 'acceptedsugg', 'acceptedsuggestions', 'acceptedsuggestion', 'oksugg', 'oks'],
    description: 'Marks a specific suggestion as completed.',
    usage: `${config.prefix}completedsugg messageID [reason]`,
    example: `${config.prefix}completedsugg 847580954306543616 I have completed your suggestion!`,
    modOnly: 1,
    async execute(message, args) {

            const msgId = args[0];
            if(msgId > 0 ) {
                try {
                    const result = await connection.query(
                        `SELECT noSugg from Suggs WHERE noSugg = ?;`,
                        [msgId]
                    );
                    const mId = result[0][0].noSugg;
                } catch(error) {
                    message.reply({text:'There was an error grabbing the ID from the database. Please report this!'});
                    console.log(error);
                }

                const result2 = await connection.query(
                    `SELECT Author from Suggs WHERE noSugg = ?;`,
                        [msgId],
                    );
                    const OGauthor = result2[0][0].Author;
                const aut = (await message.client.users.cache.get(`${OGauthor}`)).tag;

                    const result3 = await connection.query(
                        `SELECT Message from Suggs WHERE noSugg = ?;`,
                        [msgId],
                    );
                    const suggestion = result3[0][0].Message;

                    const result4 = await connection.query(
                        `SELECT Avatar from Suggs WHERE noSugg = ?;`,
                        [msgId],
                    );
                    const avatar = result4[0][0].Avatar;

    
                mod = message.author.id;
    
                const stats = args.slice(1).join(' ');
                if(!stats) return message.channel.send({text:'You need to include the completion status message for this suggestion as well as the message ID.'});
    
                try {
                    connection.query(
                        `UPDATE Suggs SET stat = ?, Moderator = ? WHERE noSugg = ?;`,
                        [stats, mod, msgId],
                    );
                } catch (error) {
                    message.reply({text: 'There was an error updating the suggestion in the database. Please report this!'});
                    console.log(error);
                }
    

                    const result8 = await connection.query(
                        `SELECT stat FROM Suggs WHERE noSugg = ?;`,
                        [msgId]
                    );
                    const upStatus = result8[0][0].stat;

                    const moderator = await connection.query(
                        `SELECT Moderator FROM Suggs WHERE noSugg = ?;`,
                        [msgId]
                    );
                    const moder = moderator[0][0].Moderator;
                    const moderate = moder.tag || message.author.tag;

            
                const denied = new Discord.MessageEmbed()
                    .setColor(0x6E3EA4)
                    .setAuthor({name: aut, iconURL:avatar})
                    .setDescription(suggestion)
                    .addFields(
                        [{ name: 'Your suggestion was completed! This is the decision:', value: upStatus},
                        { name: 'Moderator that completed your suggestion:', value: moderate},]
                    )
                    .setTimestamp()
                    .setFooter({text: 'If you don\'t understand this decision, please contact the moderator that completed your suggestion. Thank you!'});
    
            
                (await message.client.users.cache.get(OGauthor)).send({ embeds: [denied] });
                message.react('✅');
                message.channel.send({text:`I have done that for you. The message is now deleted in the suggestions channel. 😃`});

                    try {
                        await connection.query(
                            `DELETE FROM Suggs WHERE noSugg = ? AND Author = ?;`,
                            [msgId, OGauthor],
                        );
                    } catch (error) {
                        message.reply('There was an error deleting the suggestion from the database. Please report this!');
                        console.log(error);
                    }
        
    
                    const chnnel = await message.guild.channels.cache.find(c => c.name === 'suggestions');
                    chnnel.messages.fetch(msgId).then(message => {
                        message.delete(); 
                    });
            } else {
                message.reply({text:'You need to include the ID of the message you want to mark as completed.'})
            }
    }
};