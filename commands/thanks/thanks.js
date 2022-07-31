const connection = require('../../database.js');
const config = require('../../config/config.json');

module.exports = {
  name: 'thanks',
  aliases: ['thnks', 'tks', 'tx', 'thank'],
  usage: `${config.prefix}thanks <@username or ID>`,
  cooldown: 400,
  example: `${config.prefix}thanks @DudeThatsErin#8061 or ${config.prefix}thanks 455926927371534346`,
  async execute(message, args, client) {

    if (message.reference === null) { // just a regular message
    const mention = message.mentions.users.first() || message.guild.members.cache.get(args[0]);

    if (!mention) {
      message.react('❓');
      message.reply({content: 'Please tag a user to thank.'});
      return;
    }
    const thankee = mention.id;
    const thanker = message.author.id;

    if (mention.ClientUser === true || thankee === message.author.id || thankee === client.user.id) {
      message.reply({content: 'It looks like you were trying to thank yourself or a bot in your server. That is not the appropriate way to use this system.'});
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

    message.reply({ content: `You thanked ${mention.username}! They now have ${no} thanks. Use the \`${config.prefix}thanks-leaderboard\` command to see where you stand.`});
    } else {
      const mention = message.mentions.repliedUser;
      const thankee = mention.id;
      const thanker = message.author.id;
  
      if (mention.ClientUser === true || thankee === message.author.id || thankee === client.user.id) {
        message.reply({content: 'It looks like you were trying to thank yourself or a bot in your server. That is not the appropriate way to use this system.'});
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
  
      message.reply({ content: `You thanked them! They now have ${no} thanks. Use the \`${config.prefix}thanks-leaderboard\` command to see where you stand.`});
    }

  }
}
