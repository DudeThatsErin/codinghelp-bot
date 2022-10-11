module.exports = {
    name: 'error',
    description: 'Tells people to post the full stack trace.',
    execute(interaction) {
        interaction.reply({ content: `Let me check my  🔮... I see... I see an.... error, yes indeed an error..... but I don't see any description of that error.... Sorry, my 🔮 seems to be broken. Can you please attach the full stacktrace?\n\nPlease paste the entirety of your console to a paste website, such as https://pastebin.com/, or other options found by using \`/bin\`.\n\nTo do so,\n* in Visual Studio Code, right click on the logs, click "Copy All".\n* in Android Studio, click on the logs, press "Ctrl A", then right click and click "Copy".\nThen, open your paste website of choice, paste the text in the provided field, submit the text, and share us the URL of the page you are sent on.` })
    }
}