module.exports = {
    name: 'gettinganswers',
    usage: `/gettinganswers`,
    description: 'Sends information on how to ask better questions.',
    execute(interaction) {
        interaction.reply({ content: `How to ask questions more efficiently and get answers quicker: https://www.mikeash.com/getting_answers.html#guide_begin\nMore in-depth, applies to Discord as well: http://www.catb.org/~esr/faqs/smart-questions.html\nThe Coding Den's Guide which compiles the main points of both: https://docs.thecodingden.net/community-policy-center/faq/popular#how-do-i-ask-my-question-such-that-its-easy-to-help-me` });
    }
}