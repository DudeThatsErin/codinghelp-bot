module.exports = {
	name: 'coinflip',
	description: 'Flips a coin for heads or tails',
	usage: `/coinflip`,
	execute(interaction) {
    function doRand() {
      const rand = ['HEADS!', 'TAILS!'];
      return rand[Math.floor(Math.random()*rand.length)];
    }
    const embed = {
      color: 0xC977BB,
      title: 'You got...',
      description: doRand(),
      timestamp: new Date()
    };
    interaction.reply({ embeds: [embed], ephemeral: true })
  },
};