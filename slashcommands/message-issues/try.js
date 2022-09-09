module.exports = {
    name: 'tryit',
    description: 'Asks our members to try their coding problem and report back to us with any errors.',
    usage: `/tryit`,
    execute(interaction) {
        interaction.reply({ content: `Try your problem then report back to us what you get.` });
        },
    }