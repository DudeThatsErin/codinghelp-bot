module.exports = {
    name: 'smallhosting',
    description: `This is a small snippet from our \`/largehosting\` command.`,
    usage: `/smallhosting`,
    execute(interaction) {
       interaction.reply({ content: `**Free Provider:** AWS <https://aws.amazon.com/free> - Expires after 12 months.\n\n**Paid Provider:** Digital Ocean: <https://m.do.co/c/867a2ac16162> - Starts at $5/month which comes with 20GB SSD Storage, 512MB Memory.\n\n*Use \`/largehosting\` for a larger list of hosting services. Please **only** use \`largehosting\` in the <#433962402292432896> channel!*` });
    }
}