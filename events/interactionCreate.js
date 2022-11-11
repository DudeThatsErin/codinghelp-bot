const Discord = require('discord.js');
const o = require('../config/owner.json');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (interaction.isMessageComponent()) return;

        const command = client.slashCommands.get(interaction.commandName) || client.erinCommands.get(interaction.commandName);
        if (!command) return interaction.reply({ content: 'This command no longer exists.', ephemeral: true });

        // owner only
        if (command.ownerOnly === 1) {
            if (interaction.user.id != o.id) {
                return interaction.reply({ content: `This is only a command Erin (<@${o.username}>) can use. If you are seeing this in error use the \`/report\` command.`, ephemeral: true });
            }
        }

        //mod only
        const modRoles = ['780941276602302523', '822500305353703434', '718253309101867008', '751526654781685912'];
        let value = 0;
        if (command.modOnly === 1) {
            for (const ID of modRoles) {
                if (!interaction.member.roles.cache.has(ID)) {
                    value++
                }

                if (value == modRoles.length) {
                    return interaction.reply({ content: `This is a command only moderators can use. You do not have the required permissions. Moderators have the \`@Moderator\` role or \`@&Junior Mod\` roles. Please run \`/report [issue]\` if you are seeing this in error.`, ephemeral: true });
                }
            }
        }

        // botspam channel only
        const botspam = `433962402292432896`;
        if (command.botSpamOnly === 1) {
            if (interaction.channel.id != botspam) {
                return interaction.reply({ content: `Please only use this command in the <#${botspam}> channel. This command cannot be used elsewhere. Thank you.`, ephemeral: true })
            }
        }

        // command cooldowns
        if (!client.slashCooldowns.has(interaction.commandName)) {
            client.slashCooldowns.set(interaction.commandName, new Discord.Collection());
        }

        const now = Date.now();
        const timestamps = client.slashCooldowns.get(interaction.commandName);
        const cooldownAmount = (command.cooldown || 1) * 1000;
        if (timestamps.has(interaction.user.id)) {
            const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return interaction.reply({ content: `Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`, ephemeral: true });
            }
        }

        timestamps.set(interaction.user.id, now);
        setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

        // actually running the commands.
        try {
            //await interaction.deferReply();
            if(`718253204147798047` === interaction.guild.id) {
                await client.erinCommands.get(interaction.commandName).execute(interaction, client);
            }
            if(`359760149683896320` === interaction.guild.id) {
                await client.slashCommands.get(interaction.commandName).execute(interaction, client);
            }
        } catch (error) {
            console.error(error);
            const embed = new Discord.EmbedBuilder()
                .setColor(0x000000)
                .setTitle('Oh no! An _error_ has appeared!')
                .addFields({
                    name: '**Error Name:**',
                    value: `\`${error.name}\``
                }, {
                    name: '**Error Message:**',
                    value: `\`${error.message}\``
                }, {
                    name: '**Error Location:**',
                    value: `\`${error.stack}\``
                }, {
                    name: '**This has been reported!**',
                    value: `I have pinged Erin so this has already been reported to her. You do not need to do anything else.`
                })
                .setTimestamp()
                .setFooter({ text: `Thanks for using ${client.user.tag}! I'm sorry you encountered this error!`, icon_url: `${client.user.displayAvatarURL()}` });
            interaction.reply({ content: `Hey, <@${o.id}>! You have an error!`, embeds: [embed] });
        }

    }
};