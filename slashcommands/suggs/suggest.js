const Discord = require('discord.js');
const connection = require('../../database.js');
const bot = require('../../config/bot.json');

module.exports = {
    name: 'suggestions',
    description: 'Creates a suggestion!',
    usage: `/suggestions [suggestion here]`,
    example: `/suggestions I want pudding!`,
    options: [
        {
            name: 'message',
            description: 'What is your suggestion?',
            type: 3,
            required: true
        }
    ],
    async execute(interaction){

    const channel = interaction.guild.channels.cache.find(c => c.id === bot.suggestionsId);


        let messageArgs = interaction.options.getString('message');
        let newStatus = 'New Suggestion';
        let author = interaction.user.id || 'default value';
        let name = interaction.user.tag;
        let avatar = interaction.user.displayAvatarURL();

        const initial = new Discord.EmbedBuilder()
        .setColor(0xFADF2E)
        .setAuthor({name: name, icon_url: avatar})
        .setDescription(messageArgs)
        .setFooter({text: '📈 This suggestion currently needs votes and feedback. If you would like to discuss it, please visit the associated thread.'});

        interaction.client.users.cache.get(author).send({content: `Hey, ${interaction.user.username}! Thanks for submitting a suggestion! Our server needs to have time to vote on this. Once some time has passed, you can check the suggestion channel to check the updated status of your suggestion! We appreciate your feedback! Happy chatting!`});

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

        interaction.reply({content: `I have sent your suggestion! Please check ${channel} to see it and interact in the thread that was created!`, ephemeral: true})




    }
}