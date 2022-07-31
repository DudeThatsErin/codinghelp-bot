const connection = require('../../database.js');
const config = require('../../config/config.json');
module.exports = {
  name: 'unthanks',
  aliases: ['nothnks', 'untks', 'notx', 'unthank'],
  usage: `${config.prefix}unthanks <@username or ID>`,
  example: `${config.prefix}unthanks @DudeThatsErin#8061 or ${config.prefix}thanks 455926927371534346`,
  description: 'Allows mods to remove a thanks from a user.',
  modOnly: 1,
  async execute(message, args) {

    if (message.reference === null) { // just a regular message
    const mention = message.mentions.users.first() || message.guild.members.cache.get(args[0]);


    if (!mention) {
      message.react('❓');
      message.reply({content: 'Please tag a user to remove thanks from.'});
      return;
    }

    const user = mention.id;

    await (await connection).query(
      `DELETE FROM Thanks WHERE user = ? ORDER BY rowNo desc limit 1;`,
      [user]
    );

    const result3 = await (await connection).query(
      `select sum(cast(thanks as unsigned)) as total from Thanks where user = ?;`,
      [user]
    );
    const no = result3[0][0].total;

    message.reply({content: `I have removed a thanks from ${mention.username}! They now have ${no} thanks. Use the \`++thanks-leaderboard\` command to see where everyone stands.`});
    }
    else {
      const mention = message.mentions.repliedUser;
      
    const user = mention.id;

    await (await connection).query(
      `DELETE FROM Thanks WHERE user = ? ORDER BY rowNo desc limit 1;`,
      [user]
    );

    const result3 = await (await connection).query(
      `select sum(cast(thanks as unsigned)) as total from Thanks where user = ?;`,
      [user]
    );
    const no = result3[0][0].total;

    message.reply({content: `I have removed a thanks from ${mention.username}! They now have ${no} thanks. Use the \`++thanks-leaderboard\` command to see where everyone stands.`});
    }
  }
}