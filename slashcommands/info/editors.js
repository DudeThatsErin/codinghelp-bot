const Discord = require('discord.js');

module.exports = {
    name: 'editors',
    description: 'Sends information on commonly used IDEs or Text Editors.',
    usage: `/editors`,
    execute(interaction) {
        const embed = new Discord.EmbedBuilder()
            .setColor(0xB87364)
            .setTitle('This is a list of the most commonly used IDEs or Text Editors...')
            .setDescription('This is not an exhaustive list. You can see an exhaustive list on our knowledgebase: https://codinghelp.site')
            .addFields(
                {
                    name: 'Beginner-friendly IDEs/Text Editors',
                    value: '- Visual Studio Code: https://code.visualstudio.com\n- Sublime Text: https://sublimetext.com\n- Notepad++: https://notepad-plus-plus.org/'
                },
                {
                    name: 'Free IDEs:',
                    value: '- Visual Studio: https://visualstudio.microsoft.com\n- PyCharm: https://jetbrains.com/pycharm\n- IntelliJ Idea: https://jetbrains.com/idea'
                },
                {
                    name: 'Paid/Student IDEs',
                    value: '- CLion: https://jetbrains.com/clion\n- Webstorm: https://jetbrains.com/webstorm\n- Rider: https://jetbrains.com/rider'
                }
        )
        .setFooter({text: 'If you have any suggestions for IDEs to add, run ++suggest!'})

        interaction.reply({ embeds: [embed] });
    }
}