const Discord = require('discord.js');
const connection = require('../database.js');

module.exports = {
    name: 'suggestions',
    aliases: ['suggest', 'suggestion', 'sugg'],
    inHelp: 'yes',
    description: 'Creates a suggestion!',
    usage: '++suggestions [suggestion here]',
    async execute(message, args){

    const channel = message.guild.channels.cache.find(c => c.name === 'suggestions');
    if(!channel) return message.channel.send('suggestions channel does not exist!');

    let messageArgs = args.join(' ');
    let newStatus = 'Needs votes!';

    const initial = new Discord.MessageEmbed()
    .setColor('FADF2E')
    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    .setDescription(messageArgs)
    .setFooter('📈 This suggestion currently needs votes and feedback. If you would like to discuss it, please visit <#799835436783763467> and discuss it there.');

    const msg = await channel.send(initial);
        msg.react('👍');
        msg.react('👎');
        message.delete();
    const suggNo = msg.id;

    try {
        (await connection).query(
            `INSERT INTO Suggs (noSugg, Author, Message, LAST_EDITED, STATUS) VALUES(?, ?, ?, CURRENT_TIMESTAMP(), ?)`,
            [suggNo, message.author.tag, messageArgs, newStatus]
        );

    } catch(err) {
        console.log(err);
    }

    }
}