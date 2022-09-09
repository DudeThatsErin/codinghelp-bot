module.exports = {
  name: 'hire',
  description: 'Refers people to the request-coders channel to hire someone.',
  usage: `/hire @username or user ID`,
  example: `/hire @DudeThatsErin`,
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
      interaction.reply({ content: `Hey, ${user}! It looks like you are requesting for someone to help you individually. This question is better answered at <#756992144170024991>. Please repost it there.` });
  },

};