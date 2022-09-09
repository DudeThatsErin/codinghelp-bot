const Discord = require('discord.js');
const ee = require('../../config/embed.json');

module.exports = {
    name: 'freelance',
    description: 'Allows users to get information on how to self employment or freelancing.',
    usage: `/freelance`,
    execute(interaction) {
        let embed = new Discord.EmbedBuilder()
            .setColor(0x497AEC)
            .setTitle('For freelancing jobs, consider some of the following websites...')
            .addFields(
                {
                    name: 'You can sign up on these websites either to hire someone else or to get hired by someone else!',
                    value: `- Fiverr: https://fiverr.com\n- Freelancer: https://freelancer.com\n- Gun.io: https://gun.io\n- PeoplePerHour: https://peopleperhour.com\n- Toptal: https://toptal.com\n- Upwork: https://upwork.com\n`
                },
                {
                    name: 'Reminders',
                    value: `You can also check out <#923714962285813820> channel for people looking to hire freelancers. If you want to hire a freelancer you can also ask in <#756992144170024991>.\n\nFor internship or career positions, use the command \`/career\` in <#433962402292432896>.`
                }
            )
            .setFooter({ text: 'If you know of other places you can use, please let us know by using ++suggest!', iconURL: ee.footericon });
        interaction.reply({ embeds: [embed] });
    }
}