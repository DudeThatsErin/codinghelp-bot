module.exports = {
  name: 'wrong-channel',
  description: 'Tells people to ask in a different channel and deletes their message.',
  usage: `/wrong-channel @username or user ID`,
  example: `/wrong-channel @DudeThatsErin`,
  options: [
    {
      name: 'user',
      description: 'Who?',
      required: true,
      type: 6
    }
  ],
  execute(interaction) {

      const user = interaction.options.getUser('user');
      interaction.reply({ content: `Hey, ${user}! This isn\'t the correct channel for your question. Please check our <#1006278480968810516> on the left and ask repost in a different channel. Thank you!` });
  }
};