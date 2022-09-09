module.exports = {
    name: 'webassembly',
    description: 'Sends an invite link to the Web Assembly Discord Server.',
    usage: `/webassembly`,
    execute(interaction) {
        interaction.reply({ content: `Just so you know, WebAssembly users have their own server and your question may be better suited there: https://discord.gg/PDtNXph2K8` });
    }
}