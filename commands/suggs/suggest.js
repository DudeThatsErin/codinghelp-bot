const Discord = require('discord.js');
const connection = require('../../database.js');
const config = require('../../config/config.json');

module.exports = {
    name: 'suggestions',
    aliases: ['suggest', 'suggestion', 'sugg', 's'],
    description: 'Creates a suggestion!',
    usage: `${config.prefix}suggestions [suggestion here]`,
    example: `${config.prefix}suggestions I want pudding!`,
    async execute(message, args){
    const threadAuthor = message.member.displayName;

    const channel = message.guild.channels.cache.find(c => c.id === `433877613128450061`); //actual ch: 433877613128450061 // test ch: 1000420829307338862
    //console.log(channel)


        let messageArgs = '';
        if (args.length > 0) {
            messageArgs = args.join(' ');
        } else {
            message.react('❓');
            message.reply({text: `You need to specify a suggestion to use this command. How will we know what you want to suggest unless you tell us?! If you would like to check the status of your suggestion then you can use \`${config.prefix}statussug [your status message ID]\`.`});
            return;
        }
        let newStatus = 'New Suggestion';
        let author = message.author.id || 'default value';
        let name = message.author.tag;
        let avatar = message.author.displayAvatarURL({ dynamic: true});

        const initial = new Discord.EmbedBuilder()
        .setColor(0xFADF2E)
        .setAuthor({name: name, iconURL: avatar})
        .setDescription(messageArgs)
        .setFooter({text: '📈 This suggestion currently needs votes and feedback. If you would like to discuss it, please visit the associated thread.'});

        message.client.users.cache.get(author).send({content: `Hey, ${message.author.username}! Thanks for submitting a suggestion! Our server needs to have time to vote on this. Once some time has passed, you can check the suggestion channel to check the updated status of your suggestion! We appreciate your feedback! Happy chatting!`});

        await channel.send({embeds: [initial]}).then(async (message) => {
            message.react('👍');
            message.react('👎');
            message.startThread({
                name: messageArgs,
                autoArchiveDuration: 60,
                type: 'GUILD_PUBLIC_THREAD'
            });
            try {
                await connection.query(
                    `INSERT INTO Suggs (noSugg, Author, Message, Avatar, stat) VALUES(?, ?, ?, ?, ?)`,
                    [message.id, author, messageArgs, avatar, newStatus]
                );

            } catch(err) {
                console.log(err);
            }
        });

        message.react('✅');




    }
}