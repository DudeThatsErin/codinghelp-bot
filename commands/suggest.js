const Discord = require('discord.js');
const connection = require('../database.js');

module.exports = {
    name: 'suggestions',
    aliases: ['suggest', 'suggestion', 'sugg'],
    inHelp: 'yes',
    description: 'Creates a suggestion!',
    usage: '++suggestions [suggestion here]',
    category: 'Messages',
    async execute(message, args){

    const channel = message.guild.channels.cache.find(c => c.name === 'suggestions');
    if(!channel) return message.channel.send('suggestions channel does not exist!');

    let messageArgs = args.join(' ');
    let newStatus = 'New Suggestion';
    let author = message.author.tag;
    let avatar = message.author.displayAvatarURL({ dynamic: true});

    const initial = new Discord.MessageEmbed()
    .setColor('FADF2E')
    .setAuthor(`${author}`, `${avatar}`)
    .setDescription(messageArgs)
    .setFooter('📈 This suggestion currently needs votes and feedback. If you would like to discuss it, please visit <#799835436783763467> and discuss it there.');

    const msg = await channel.send(initial);
        msg.react('👍');
        msg.react('👎');
        message.delete();
    const suggNo = msg.id;

    try {
        (await connection).query(
            `INSERT INTO Suggs (noSugg, Author, Avatar, Message, LAST_EDITED, STATUS) VALUES(?, ?, ?, ?, CURRENT_TIMESTAMP(), ?)`,
            [suggNo, author, avatar, messageArgs, newStatus]
        );

    } catch(err) {
        console.log(err);
    }

    }
}