const connection = require('../../database.js');

module.exports = {
  name: 'unthanks',
  usage: `/unthanks <@username or ID>`,
  example: '/unthanks @DudeThatsErin',
  description: 'Allows mods to remove a thanks from a user.',
  modOnly: 1,
  options: [
    {
      name: 'user',
      description: 'Who would you like to remove a thank from?',
      required: true,
      type: 6
    }
  ],
  async execute(interaction) {

    const mention = interaction.options.getUser('user');
    const user = mention.id;

    await connection.query(
      `DELETE FROM Thanks WHERE user = ? ORDER BY rowNo desc limit 1;`,
      [user]
    );

    const result3 = await connection.query(
      `select sum(cast(thanks as unsigned)) as total from Thanks where user = ?;`,
      [user]
    );
    const no = result3[0][0].total;

    interaction.reply({content: `I have removed a thanks from ${mention.username}! They now have ${no} thanks. Use the \`/thanks-leaderboard\` command to see where everyone stands.`, ephemeral: true});
    
  }
}