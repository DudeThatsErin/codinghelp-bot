const Discord = require('discord.js');

module.exports = {
    name: 'dom-listening',
    usage: `/dom-listening`,
    description: 'Sends information about why not to use dom listening attributes/properties.',
    execute(interaction) {
        const embed = new Discord.EmbedBuilder()
            .setColor(0xEC4E49)
            .setTitle('Never use the \`on*\` DOM attributes/properties.')
            .addFields(
                {
                    name: 'Why?',
                    value: `- It encourages you to write in line JavaScript in your HTML/SVG Code (bad practice).\n- Only one listener declaration per event. Any new declarations will override the previous one.\n- It is difficult to debug.\n- It makes it difficult to have a broad view on app behavior, since we need to check all JavaScript PLUS **all the JavaScript in the HTML tags**.\n- Listeners become per-element, rather than being able ot make use of event delegation/bubbling.\n- It isn't really module compatible, as it requires to declare your functions globally (super bad practice).\n- No way to use event listener options.\n- Using these attributes implies an \`eval()\` which you should **avoid at all costs.**`
                },
                {
                    name: 'What to do instead?',
                    value: `A better thing to do is to use \`target.addEventListener\`. You can read more on the Mozilla docs: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener`
                },
                {
                    name: 'Reminder',
                    value: `Don't forget to pass the \`{passive: true}\` options if your event isn't intended to be cancelled, for performance reasons.`
                }
            )
        interaction.reply({ embeds: [embed] });
    }
}