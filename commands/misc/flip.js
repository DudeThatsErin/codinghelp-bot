const config = require('../../config/config.json');

module.exports = {
	name: 'coinflip',
	description: 'Flips a coin for heads or tails',
	aliases: ['flip', 'heads', 'tails'],
	usage: `${config.prefix}coinflip`,
	example: `${config.prefix}coinflip or ${config.prefix}flip`,
	execute(message) {
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
    message.channel.send({ embeds: [embed] })
  },
};