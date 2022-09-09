const Discord = require('discord.js');
const ee = require('../../config/embed.json');

module.exports = {
    name: 'w3c',
    description: 'Informs our users why they should avoid w3schools like the plague.',
    usage: `/w3c`,
    execute(interaction) {
        const embed = new Discord.EmbedBuilder()
            .setColor(0x7FD839)
            .setTitle('Avoid W3Schools!!!')
            .setDescription(`**W3Schools** isn't a good resource for learning anything beyond the most basic HTML & CSS.`)
            .addFields(
                {
                    name: 'Reasons to Avoid:',
                    value: `❌ Regularly utilize outdated methods (e.g. \`float\` for non-editorial layouts, frequent use of \`var\` & jQuery)\n❌ Consistently fail to utilize modern methods (e.g. HTML5 semantic elements, flexbox, & grid and JavaScript features from ES6+)\n❌ are generally untidy and fail to abide by best practices.`
                },
                {
                    name: 'What should you use instead?',
                    value: `✅ The well maintained MDN Web Docs (https://developer.mozilla.org) as your go to reference for front-end development.\n✅ The specific resources which can be found <#918527517999108107> as well as on our website: https://codinghelp.site/a5cd715f4b1949adb4f1a88a74625f14?v=e119e13d8fee46449bca208ce8512632\n✅ Asking in our channels what the best practice is **instead of** using **W3Schools**.`
                }
            )
            .setFooter({ text: 'If you have any other suggestions, please use ++suggest!', iconURL: ee.footericon });
        interaction.reply({ embeds: [embed] });
    }
}