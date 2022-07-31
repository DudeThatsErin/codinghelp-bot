const Discord = require('discord.js');
const connection = require('../../database.js');
const config = require('../../config/config.json');

module.exports = {
    name: 'autoadd-members',
    description: 'This allows **mods** to automatically add participants to the Challenges database.',
    aliases: ['autoaddppl', 'autoaddparticipants', 'autoaddchallengers', 'aap', 'auto-add-participants', 'autoadd', 'aam'],
    usage: `${config.prefix}autoadd-members`,
    example: `${config.prefix}autoadd-members`,
    challengeMods: 1,
    async execute (message, args) {

            let joinersRole = message.guild.roles.cache.find(r => r.name === "Participants") || "none";
            if(joinersRole === "none") {
                message.reply({content:'You need to create a role named \`Participants\` first and give it to users first before you run this command. If you have a role like this, make sure it is named \`Participants\` exactly like that or else this command will not work! If you still have issues, please report this to my developer!'});
                return;
            } else {
                const Role = message.guild.roles.cache.find(role => role.name == "Participants");
                const Members = message.guild.members.cache.filter(member => member.roles.cache.find(role => role == Role)).map(member => member.user.id); // array of IDs
                var Memberslength = Members.length;
                for (var i = 0; i < Memberslength; i++) {
                    const members = Members[i];
                    await connection.query(
                        `INSERT INTO Challenges (guildId, player) VALUES (?, ?);`,
                        [message.guild.id, members]
                    );
                }
                const name = message.guild.members.cache.filter(member => member.roles.cache.find(role => role == Role)).map(member => member.user.tag).join('\n'); //works
                let embed = new Discord.EmbedBuilder()
                    .setColor('BLUE')
                    .setTitle(`Users with the \`Participants\` role`)
                    .setDescription(name)
                    .setFooter({ text: `Only users that have been online at least once since this bot was last rebooted will be shown here and only a maximum of 2,000 members will appear. Other users can be added using the ${config.prefix}manualadd command.` });
                message.channel.send({ embeds: [embed] });

            }

    }
}