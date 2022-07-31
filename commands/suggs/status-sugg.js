const Discord = require('discord.js');
const connection = require('../../database.js');
const config = require('../../config/config.json');

module.exports = {
    name: 'statussugg',
    aliases: ['statuss', 'ss', 'ssugg', 'supsugg', 'hmsug'],
    description: 'Allows a user to check the current status of their suggestion.',
    usage: `${config.prefix}statussugg messageID`,
    example: `${config.prefix}statussugg 847580954306543616`,
    async execute(message, args) {

        const msgId = args[0];
        const result = await connection.query(
            `SELECT noSugg from Suggs WHERE noSugg = ?;`,
            [msgId]
        );
        const mId = result[0][0].noSugg;

        const result2 = await connection.query(
            `SELECT Author from Suggs WHERE noSugg = ?;`,
            [msgId],
        );
        const OGauthor = result2[0][0].Author;
        const aut = await message.guild.members.fetch(OGauthor);
        const name = aut.user.username;

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
        
        const result5 = await connection.query(
            `SELECT LAST_EDITED from Suggs WHERE noSugg = ?`,
            [msgId],
        );
        const date = result5[0][0].LAST_EDITED;

        const result6 = await connection.query(
            `SELECT Moderator from Suggs WHERE noSugg = ?`,
            [msgId],
        );
        let modd = 'No one has updated this suggestion yet.';
        if (result6[0][0].Moderator != 'New Suggestion, No Mod.') {
            mdd = result6[0][0].Moderator;
            md = await message.guild.members.fetch(mdd);
            modd = md.user.username;
        } else {
            mdd = result6[0][0].Moderator;
        }

        const result7 = await connection.query(
            `SELECT stat from Suggs WHERE noSugg = ?`,
            [msgId],
        );
        const status = result7[0][0].stat;

        const initial = new Discord.MessageEmbed()
        .setColor(0x771C73)
        .setAuthor({name: name, iconURL: avatar})
        .setDescription(suggestion)
        .addFields(
            [{name: 'Last Edited on', value: `${date}\nYou can convert the time by using [this time converter](https://greenwichmeantime.com/time-gadgets/time-zone-converter/).`},
            {name: 'Moderator that edited your message last?', value: modd},
            {name: 'Status Message', value: status}]
        )
        .setTimestamp()
        .setFooter({text: 'This is the current status of this suggestion. If you are curious about this status, please contact the mods to see what we are waiting on.'});

        let user = message.author;
        user.send({ embeds: [initial] });
        message.delete()
        }
    };