const Discord = require('discord.js')
const connection = require('../database.js');

module.exports = {
    name: 'progresssugg',
    aliases: ['inprogsugg', 'workingsugg', 'workingsuggestion', 'inprogresssuggestion', 'inprogresssuggestions', 'workingsuggestion', 'worksugg', 'ps', 'ws'],
    inHelp: 'yes',
    description: 'Marks a specific suggestion as in progress with the current status. **Note:** This can only be ran by moderators.',
    usage: '++progresssugg messageID [status message]',
    category: 'Messages',
    async execute(message, args) {

        console.log(connection);

        const mId = await connection().execute(
            `SELECT noSugg from Suggs WHERE noSugg = ${message.id};`
        );

        if(!mId) return message.channel.send('You need to specificy a suggestion with the message ID!');

        const author = await connection.query(
            `SELECT Author from Suggs WHERE noSugg = ${message.id};`
        );
        const suggestion = await connection.query(
            `SELECT Message from Suggs WHERE noSugg = ${message.id};`
        );
        const avatar = await connection.query(
            `SELECT Avatar from Suggs WHERE noSugg = ${message.id};`
        );

        const status = args.join(' ');
        if(!status) return message.channel.send('You need to include the status of the suggestion as well as the message ID.');
        console.log(`ID: ${mId}, ID: ${message.id}, Author: ${author}, Sugg: ${suggestion}, Avatar: ${avatar}, Status: ${status}`);

        try {
            await connection.query(
                `UPDATE Suggs Set STATUS = '?' WHERE noSugg = ${message.id};`,
                [status]
            );
        } catch(err) {
            console.log(err);
        }
        const inprogress = new Discord.MessageEmbed()
            .setColor('004d4d')
            .setAuthor(`${author}`, `${avatar}`)
            .setDescription(`${suggestion}`)
            .addFields(
                { name: 'This suggestion is being implemented.', value: `${status}`},
            )
            .setFooter('If you would like to suggest something, use \`++suggestions\`');

        if(message.member.roles.cache.has('780941276602302523') || message.member.roles.cache.has('718253309101867008')) {
            const newMessage = await message.channel.send(inprogress);
            message.delete();
        } else {
            message.channel.send('You do not have the permissions to use this command. You must be a moderator of our server. If this is in error, please report it.')
        }

    }
};