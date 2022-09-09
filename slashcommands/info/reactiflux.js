module.exports = {
    name: 'react',
    description: 'Sends an invite link to the Reactiflux Discord Server',
    usage: `/react`,
    execute(interaction) {
        interaction.reply({ content: `If you're asking a question about React or React Native, you might be able to get better help at https://discord.gg/reactiflux` });
    }
}