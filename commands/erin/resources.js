const Discord = require('discord.js');
const ee = require('../../config/embed.json');
const bot = require('../../config/bot.json');
const config = require('../../config/config.json');

module.exports = {
  name: 'resources',
  aliases: ['resource', 'useful-links', 'usefullinks'],
  modOnly: 1,
  description: `Sends an embed with all our useful resources and a link to our website to see more useful resources.`,
  usage: `${config.prefix}resources`,
  execute(message) {

    const docs = new Discord.EmbedBuilder()
      .setColor(0x60A368)
      .setTitle('Useful Resources/Links')
      .setDescription('This is an excerpt from our Useful Links listed on our Forum. The link to that is below. Use the \`++suggest\` command if you would like to add any additional resources.')
      .addFields(
        {
          name: 'Text Editors',
          value: `- [Atom.io](https://atom.io/)\n- [Sublime](https://www.sublimetext.com/)\n- [Visual Studio Code](https://code.visualstudio.com/)\n- [Emeditor](https://www.emeditor.com/)\n- [Notepad++](https://notepad-plus-plus.org/)`,
          inline: false
        },
        {
          name: 'IDEs',
          value: `- [Visual Studio](https://visualstudio.microsoft.com/)\n- [Eclipse](http://www.eclipse.org/downloads/)\n- [Code::Blocks](http://www.codeblocks.org/)\n- [PHPStorm](https://www.jetbrains.com/phpstorm/)\n- [PyCharm](https://www.jetbrains.com/pycharm/)\n- [VSCodium](https://vscodium.com/)\n- [VSCode](https://code.visualstudio.com/)`,
          inline: false
        },
        {
          name: 'Courses & Apps',
          value: `- [Udemy](https://www.udemy.com/)\n- [Code Academy](https://www.codecademy.com/)\n- [Khan Academy](https://www.khanacademy.org/)\n- [ProgrammingHub](https://itunes.apple.com/us/app/programming-hub-learn-to-code/id1049691226?mt=8)\n- [Mimo](https://getmimo.com/)`,
          inline: false
        },
        {
          name: 'Task/Bug Management',
          value: `- [Todoist](https://todoist.com/)\n- [Trello](https://trello.com/)\n- [UpNote](https://getupnote.com/)\n- [BugZilla](https://www.bugzilla.org/)\n- [Redmine](https://www.redmine.org/)`,
          inline: false
        },
        {
          name: 'Other',
          value: `- [GIMP](https://www.gimp.org/downloads/) - Free online photo editor\n- [Coolers](https://coolors.co/) - An online generator for color palettes\n- [Git](https://git-scm.com/) - Version Control System`,
          inline: false
        }
      )
      .setFooter({ text: 'This was last updated on 1-14-2022 @ 7:00pm', icon_url: ee.footericon });

      message.channel.send({ embeds: [docs], components: [
        {
          type: 1,
          components: [
            {
              type: 2,
              style: 5,
              label: 'View more useful links',
              url: `https://codinghelp.site/`
            }
          ]
        }
      ] });

  }
}