// at the top of your file
const Discord = require('discord.js');

module.exports = {
    name: 'server-rules',
    description: 'Displays an embed with a link to read all of our Code of Conduct.',
    usage: '++server-rules',
    ownerOnly: 1,
    execute(message, args) {
        const rulesEmbed1 = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setImage('https://images-ext-1.discordapp.net/external/wbHOzT7RFJ6aTebef6VLDQZ21TQI5G0bJbWxhKRkm7U/https/images-ext-1.discordapp.net/external/IDGCI4g2TYyMowvu6pgHqMgk7ASin73_3OT8n7il_FQ/https/i.imgur.com/Pr7JkVc.png');

        const rulesEmbed2 = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setTitle('Our Rules')
            .setDescription('If you want to read about all of our rules in detail you can check out [our website](https://codinghelp.site/help/rules/).')
            .addFields(
                { name: 'Rule 1', value: 'No spam, advertising or NSFW content. Be nice. Use common sense.\n\nIf you are found to post spam or advertise, you will be warned or banned as stated [here](https://codinghelp.site/help/rules/#rule-warnban).' },
                { name: 'Rule 2', value: '[Don’t ask if you can ask a question, just ask it!](https://test.codinghelp.site/threads/don%E2%80%99t-ask-to-ask-just-ask.21/) If someone knows the answer, they’ll do their best to help.' },
                { name: 'Rule 3', value: 'If you need help with a problem in your code, always provide the raw code in GitHub gist or a similar place. If you aren’t sure what places, you can check [this article](https://codinghelp.site/threads/how-do-i-format-my-code-on-discord-reddit-what-about-via-the-forum.23/) or send yourself a DM from the bot by using \`/format @your-username\` replacing \`@your-username\` with a ping to yourself.' },
                { name: 'Rule 4', value: 'Do not message the mods directly for any reason. If you are wanting to message the mods, please message <@575252669443211264> to contact the mods. If you are messaging the mods directly, your messages will be ignored. If you are continually messaging the mods, you will be [warned or banned](https://codinghelp.site/help/rules/#rule-warnban).' },
                { name: 'Rule 5', value: 'Do not ask our members personal questions like gender, age, sexual preference, etc. This is not a dating server, nor is it a place where those questions matter. They mean nothing when it comes to whether or not someone can code. If someone decides to share anything, they can do so using their own free will. Explicitly asking these questions will get you warned, muted, or banned depending on the circumstances. **NO EXCEPTIONS.**' },
                { name: 'Rule 6', value: 'We are not going to spoon feed you answers. Meaning we will not tell you exactly how to get from point A to point C without you already knowing how to do points A, B & C. Will can give you some tips on how to get from point A to point C but we will not spoon feed you the answers. [Spoon feeding will not help you learn, it will only be harmful to your learning](https://smiletutor.sg/how-spoon-feeding-is-harmful-to-learning/). If you are new to something, please learn the basics before asking for help with something more advanced. If you are not new and we are saying that we are spoon feeding you, then you may need to go back and re-learn the basics.' },
                { name: 'Rule 7', value: 'Do not send mass DMs to users. If you are caught DMing a massive number of people (determined by our mods) at a time, you will be permanently banned (perma-banned) from our server. We will not warn you, we will not discuss it. We do not put up with that. Please only DM users that have the **DMs Open** role.' },
            );

        message.channel.send({ embeds: [rulesEmbed1, rulesEmbed2], components: [
          {
            type: 1,
            components: [
              {
                type: 2,
                style: 5,
                label: 'View our whole Code of Conduct',
                url: `https://codinghelp.site/threads/code-of-conduct.155/`
              }
            ]
          }
        ] });


    },

};