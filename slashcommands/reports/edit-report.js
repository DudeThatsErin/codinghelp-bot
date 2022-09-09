const connection = require('../../database.js');
const Discord = require('discord.js');
const bot = require('../../config/bot.json')

module.exports = {
    name: 'editreport',
    description: 'This allows users to edit reports they sent to Erin if there was an error or update.',
    usage: `/editreport <message ID> <description>`,
    example: `/editreport 852197394828230716 The bot is broken!`,
    options: [
        {
            name: 'messageid',
            description: 'Please provide the message ID to edit.',
            required: true,
            type: 3
        },
        {
            name: 'message',
            description: 'Please give detailed information on what you are updating.',
            required: true,
            type: 3
        }
    ],
    type: 1,
    async execute(interaction, client) {

      let description = interaction.options.getString('message');
      const chnnel = client.channels.cache.find(channel => channel.id === bot.reportsChId);

      let msgId = interaction.options.getString('messageid');
          const results = await (await connection).query(
              `SELECT * FROM reports WHERE messageId = ?;`,
              [msgId]
          );
          const OG = results[0][0].authorId;
          const author = client.users.cache.find(user => user.id === OG);
          const authorUsername = author.username;
          const original = results[0][0].description;
          const avatar = results[0][0].avatar;

          chnnel.messages.fetch(msgId).then(message => {
              let report = new Discord.EmbedBuilder()
                  .setColor(0xB3B6B7)
                  .setTitle(`This bug report has been **updated**...`)
                  .setAuthor({name: authorUsername, iconURL: avatar})
                  .setDescription(`**This is the original report:**\n${original}\n\n**This is the updated status:**\n${description}`)
                  .addFields([
                      {
                          name: 'Original Author:',
                          value: `${authorUsername} - \`${OG}\``
                      },
                      {
                          name: 'This is the message ID for commands:',
                          value: `\`${msgId}\``
                      },
                      {
                          name: 'Use this to mark the report as **In Progress**:',
                          value: `\`/progressreport ${msgId} [progress message here]\``
                      },
                      {
                          name: 'Use this to complete a report (deny or whatever):',
                          value: `\`/completedreport ${msgId} [completed message here]\``
                      }
                  ])
                  .setTimestamp()
                  .setFooter({text:'Last Updated on', iconURL: bot.avatar});
              if (message) message.edit({ embeds: [report] });
          });

          const report2 = new Discord.EmbedBuilder()
              .setColor(0xB3B6B7)
              .setTitle('Your bug report has been updated!')
              .setAuthor({name: authorUsername, iconURL: avatar})
              .setDescription(`**This is the original report:**\n${original}\n\n**This is the updated status:**\n${description}`)
              .addFields([
                  {
                      name: 'Use this to check the status of your report in the future:',
                      value: `\`/statusreport ${msgId}\``
                  },
                  {
                      name: 'Use this to edit your own report:',
                      value: `\`/editreport ${msgId}\``
                  },
                  {
                      name: 'Use this to delete your own report:',
                      value: `\`/deletereport ${msgId}\``
                  }
              ])
              .setTimestamp()
              .setFooter({text: 'If this is not correct, please report this!', iconURL: bot.avatar});

          (await client.users.cache.get(OG)).send({ embeds: [report2] });

          interaction.reply({content: 'I have updated the report for Erin, she has already received it. Thank you!', ephemeral: true});

          await connection.query(
              `UPDATE reports SET stat = ? WHERE messageId = ?;`,
              [description, msgId]
          );

    }
}