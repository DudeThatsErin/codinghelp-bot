module.exports = {
    name: 'reddit',
    description: 'Refers user to our Subreddit for additional coding help.',
    aliases: ['sub', 'r/code', 'subreddit'],
    usage: '++reddit',
    execute(message) {

        message.channel.send('Hey! Not sure if you knew this but you can visit our Subreddit for additional help. You can go here to visit it: https://reddit.com/r/CodingHelp');
    },

};