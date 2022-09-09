const Discord = require('discord.js');

module.exports = {
    name: 'nojquery',
    usage: `/nojquery`,
    description: 'Sends information on why JQuery isn’t used and is bad to use.',
    execute(interaction) {
        const embed = new Discord.EmbedBuilder()
            .setColor(0x474961)
            .setTitle('Avoid JQuery!!!')
            .addFields(
                {
                    name: 'Why you shouldn\'t use JQuery...',
                    value: `- jQuery is a **legacy** library. Standardized features like \`querySelector\`, CSS animations, and \`fetch\` make many of its features **obsolete**.\n- Using jQuery over standard features is a **waste of bandwidth**.\n- Because jQuery is so **bloated**, using jQuery often means using jQuery for *everything*, which means you **learn less** about standard web development.\n- jQuery has fallen **out of fasion**, and full frameworks (e.g. React, Angular, Vue, Svelte) are more popular. HOwever, modernized stepping stone libraries like Alpine are also available.\n- jQuery's cross-browser support **can be sustituted** with the few polyfills you actually need. This also makes it easier to udpate when features become better supported.\n- If you really want shorthand for \`querySelectorAll\`, consider bling.js.`
                }
            );
        interaction.reply({ embeds: [embed] });
    }
}