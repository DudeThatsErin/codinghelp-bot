module.exports = {
    name: 'djs',
    description: `Sends an invite link to the Discord.js Discord Server`,
    usage: `/djs`,
    execute(interaction) {
        interaction.reply({ content: `Just so you know, Discord.js has its own Discord Server as well and your question may be something that is better suited for their server. https://discord.gg/bRCvFy9` });
    }
}