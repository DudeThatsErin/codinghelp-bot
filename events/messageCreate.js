const config = require('../config/config.json');
const me = require('../config/owner.json');
const Discord = require('discord.js');
const connection = require('../database.js')

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {

        //console.log(message);
        //console.log('My ID should match this: 455926927371534346', message.mentions.repliedUser.id); // how I get the user ID on new replies.

        // delete slash commands
        //message.guild.commands.set([])
        //console.log(await message.guild.commands.fetch());
        client.cooldowns = new Discord.Collection();
        const { cooldowns } = client;

        if (message.author.bot) {
            //console.log('bot message');
            return;
        };
        if (!message.content.startsWith(config.prefix)) {
            //console.log('does not start with prefix.');
            return;
        };
        const args = message.content.slice(config.prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
        const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        if (!command) return message.channel.send({ content: `That command does not exist. Run \`/help\` to see all of my commands.` });
        //console.log(command);

        // owner only
        if (command.ownerOnly === 1) {
            if (!message.author.id === me.id) {
                return message.reply({ content: `This is only a command Erin (<@${me.id}>) can use. If you are seeing this in error use the \`${config.prefix}report\` command.` });
            }
        }


        const modRoles = ['780941276602302523', '822500305353703434', '718253309101867008', '751526654781685912'];
        const modIDs = ['732667572448657539', '455926927371534346', '541305895544422430'];
        const isMod = modIDs.reduce((alrdyGod, crr) => alrdyGod || message.content.toLowerCase().split(' ').includes(crr), false);
        let value = 0;
        if (message.channel.parentID === '382210817636040706') {
            for (const ID of modRoles) {
                if (!message.member.roles.cache.has(ID)) {
                    value++
                }
                //message.channel.parentID === '382210817636040706' &&
                if (value != modRoles.length && isMod) {
                    message.react('❌');
                    message.reply({ content: `Please do not ping the mods. If you need to contact them, please message <@575252669443211264> to open a ModMail ticket. Thank you!` });
                }
            }
        }

        if (command.modOnly === 1) {
            for (const ID of modRoles) {
                if (!message.member.roles.cache.has(ID)) {
                    value++
                }

                if (value == modRoles.length) {
                    message.react('❌');
                    message.reply({ content: `This is a command only moderators can use. You do not have the required permissions. Moderators have the \`@Moderator\` role or \`@&Junior Mod\` roles. Please run \`${config.prefix}report [issue]\` if you are seeing this in error.` });
                    return;
                }
            }
        }

        const chllMod = ['839863262026924083', '718253309101867008'];
        if (command.challengeMods === 1) {
            for (const ID of chllMod) {
                if (!message.member.roles.cache.has(ID)) {
                    value++
                }
                if (value == chllMod.length) {
                    message.react('❌');
                    message.reply({ content: `This is a command only challenge moderators can use. You do not have the required permissions. Challenge moderators have the <@&${chllMod[1]}> role. Please run \`${config.prefix}report [issue]\` if you are seeing this in error.` });
                    return;
                }
            }
        }

        const partsResults = await connection.query(
            `SELECT * FROM Challenges WHERE guildId = ?;`,
            [message.guild.id]
        );
        if(command.partsOnly === 1) {
            for(const ID of partsResults.player) {
                if(message.member.id == ID) {
                    value++
                }
                if(value == partsResults.player.length) {
                    message.react('❌');
                    message.reply({ content: `This is a command only challenge participants can use. You do not have the required role. Participants have the \`Participants\` role. If there is an issue, please report this to the Challenge Moderators.`})
                }
            }
        }

        // command cooldowns
        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Discord.Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 1) * 1000;

        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return message.reply({content: `Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`});
            }
        }

        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

        // actually running the commands.
        try {
            command.execute(message, args, client);
        } catch (error) {
            console.error(error);
            const row = new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.ButtonBuilder()
                        .setLabel('Erin\'s Support Server')
                        .setStyle(5)
                        .setURL('https://discord.gg/tT3VEW8AYF'),
                    new Discord.ButtonBuilder()
                        .setLabel('Fill out this form!')
                        .setStyle(5)
                        .setURL('https://dudethatserin.com')
                )
            const embed = {
                color: 0xAA2C2C,
                title: 'Oh no! An _error_ has appeared!',
                description: `**Contact Bot Owner:** <@${me.id}>`,
                fields: [
                    {
                        name: '**Error Name:**',
                        value: `\`${error.name}\``
                    }, {
                        name: '**Error Message:**',
                        value: `\`${error.message}\``
                    }, {
                        name: '**Ways to Report:**',
                        value: `Run the \`${config.prefix}report\` command, Message Erin on Discord, or use one of the links below.\n\nPlease include all of the information in this embed (message) as well as any additional information you can think to provide. Screenshots are also VERY helpful. Thank you!`
                    }
                ],
                timestamp: new Date(),
                footer: {
                    text: `Thanks for using ${client.user.tag}! I'm sorry you encountered this error!`,
                    icon_url: `${client.user.displayAvatarURL()}`
                }
            };
            message.channel.send({ embeds: [embed], components: [row] });
        }
    }
}// end client.on message