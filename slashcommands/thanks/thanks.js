const connection = require('../../database.js');

module.exports = {
  name: 'thanks',
  usage: `/thanks <@username or ID>`,
  //cooldown: 400,
  example: `/thanks @DudeThatsErin#8061`,
  options: [
    {
      name: 'user',
      description: 'Who would you like to thank?',
      required: true,
      type: 6
    }
  ],
  description: 'Allows our users to thank other members for their help.',
  async execute(interaction, client) {


    const mention = interaction.options.getUser('user');
    const thankee = mention.id;
    const thanker = interaction.user.id;

    if (mention.ClientUser === true || thankee === thanker || thankee === client.user.id) {
      interaction.reply({content: 'It looks like you were trying to thank yourself or a bot in your server. That is not the appropriate way to use this system.', ephemeral: true});
      return;
    }

    await connection.query(
      `INSERT INTO Thanks (userId, user, thanks) VALUES (?, ?, ?);`,
      [thanker, thankee, 1]
    );

    const results = await connection.query(
      `select sum(cast(thanks as unsigned)) as total from Thanks where user = ?;`,
      [thankee]
    );
    const no = results[0][0].total;

    interaction.reply({ content: `You thanked ${mention.username}! They now have ${no} thanks. Use the \`/thanks-leaderboard\` command to see where you stand.`});

  }
}
