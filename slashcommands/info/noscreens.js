const Discord = require('discord.js');

module.exports = {
    name: 'noscreens',
    usage: `/noscreens`,
    description: 'Sends information on why it is best to avoid sending screenshots of your code.',
    execute(interaction) {
        const embed = new Discord.EmbedBuilder()
            .setColor(0xCA3FD3)
            .setTitle('⚠️ Avoid Sending Screenshots please!')
            .setDescription(`Please **do not screenshot code** as it causes a number of issues...`)
            .addFields(
                {
                    name: '1. Ease of Assistance',
                    value: `If someone wants to copy your code and correct it, they cannot. Making it easy for people to help you is in your best interests.`
                },
                {
                    name: `2. Editorializing`,
                    value: `It's common to try to make images small in size, which means you are likely to crop out code relevant to your issue.`
                },
                {
                    name: '3. Accessibility',
                    value: 'Wide images can be hard to read on mobile devices and are impossible for screen readers.'
                },
                {
                    name: `4. Legibility`,
                    value: 'You cannot read sceenshots of code directly, instead you have to open them in an enlarged context.'
                },
                {
                    name: `5. Bandwidth usage/clutter`,
                    value: `Some of our members use metered connections and it is wasteful for them to download images of text.`
                },
                {
                    name: 'How do I send code otherwise?',
                    value: `Great question! You can use \`/format @your username\` to learn how to format your code and you can use \`/bin\` to find places to copy and paste your code to share it. Please only use these commands in <#433962402292432896>. Thank you!`
                }
        );
        interaction.reply({ embeds: [embed] });
    }
}