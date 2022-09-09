module.exports = {
    name: 'dpy',
    description: `Sends an invite link to the Discord.py Discord Server.`,
    usage: `/dpy`,
    execute(interaction) {
        interaction.reply({ content: `Just so you know, Discord.py has its own Discord Server as well and your question may be something that is better suited for their server. https://discord.gg/r3sSKJJ` });
    }
}