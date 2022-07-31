const config = require('../../config/config.json');

module.exports = {
  name: 'bin',
  description: 'Tells people a few places they could go to share long pieces of code.',
  aliases: ['long-code', 'external-share', 'codeshare'],
  usage: `${config.prefix}bin`,
  example: `${config.prefix}bin or ${config.prefix}codeshare`,
  execute(message) {
      message.channel.send({ content: `To share long code snippets use a service like https://gist.github.com/, https://hasteb.in/, https://sourceb.in/, https://jsfiddle.net/, https://codeshare.io/ or https://pastebin.com/ or https://ideone.com/ instead of uploading files or posting them as code blocks.` });

  },

};