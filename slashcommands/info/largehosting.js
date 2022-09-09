const config = require('../../config/config.json');
const Discord = require('discord.js');
const ee = require('../../config/embed.json');

module.exports = {
    name: 'largehosting',
    description: 'Sends information about hosting providers.',
    usage: `/largehosting`,
    botSpamOnly: 1,
    execute(interaction) {
        const embed = new Discord.EmbedBuilder()
            .setColor(0xD3D13F)
            .setTitle('There are many hosting providers for larger projects.')
            .addFields(
                {
                    name: 'Free Providers:',
                    value: `- Openshift: https://openshift.com\n\`\`\`markdown\n#They provide:\n- 2GB Memory/Bandwidth\n- Hosting automatically expires after 60 days **but** you can resubscribe as often as you'd like.\`\`\`- Heroku: https://heroku.com (most popular)\n\`\`\`markdown\n#Issues:\n- You don't get CLI or SSH or File Access.\n- Your app might go to sleep (go offline) if you reach your monthly uptime limit.\`\`\`- AWS (free tier) https://aws.amazon.com/free\nExpires after 12 months.\`\`\`- Google Cloud Platform (free tier) https://cloud.google.com`
                },
                {
                    name: 'Paid Providers:',
                    value: `- Azure https://azure.microsoft.com/en-us\nThey start at $1.69/month for the B1LS Virtual Machines which come with 0.5GB of RAM and 4GB of SSD Storage.\n- OVH: https://ovh.com/us/vps\nFull VPS that starts at $3.49/month, your choice of Operating System, and high reliability.\n- Digital Ocean https://m.do.co/c/867a2ac16162\nStarts at $5/month which comes with your own server with 20GB SSD Storage, 512MB of Memory/Bandwidth.\n- Linode: https://linode.com\nStarts at $5/month which comes with your own server with 20GB SSD Storage, 1GB of Memory/Bandwidth.\m- Vultr: https://vultr.com\nStarts at $2.50/month which comes with your own server with 20GB SSD Storage, 512MB of Memory/Bandwidth.`
                },
                {
                    name: 'Continued Paid Providers...',
                    value: `- Amazon (AWS) Lightsail: https://amazonlightsail.com\nStarts at $5/month (first month free) which comes with your own server with 20GB SSD Storage, 512MB of Memory/Bandwidth.\n- VIRMACH: https://virmach.com\nFull Windows & Linux Desktop VPS starting at $7/month and $10/month respectively.\n- Sloppy: https://sloppy.io\nStarts at $5/month which comes with your own server with 16GB SSD Storage, 500MB of Memory, 1TB Bandwidth/transfer.\n- Galaxygate: https://galaxygate.net\nStarts at $3/month which comes with your own server with 15GB SSD Storage, 1GB of Memory & unmetered bandwidth.\n- Hetzner: https://hetzner.com/cloud\nStarts at $2.49/month (EUR) which comes with your own server with 20GB SSD Storage, 2GB of Memory/Bandwidth and 20TB of traffic.`
                }
            )
            .setFooter({ text: 'If you know of any others, let us know with ++suggest!', iconURL: ee.footericon });
        interaction.reply({ embeds: [embed] });
    }
}