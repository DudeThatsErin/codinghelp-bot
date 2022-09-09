module.exports = {
    name: 'ddev',
    description: `Sends a link to join the Discord Developers Discord Server`,
    usage: `/ddev`,
    execute(interaction) {
        interaction.reply({ content: `Just so you know, Discord Developers have their own server and your question may be better suited there: https://discord.gg/discord-developers` });
    }
}