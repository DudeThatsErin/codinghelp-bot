module.exports = {
    name: 'lines',
    usage: `/lines`,
    description: 'Sends information about flooding the channel with multiple lines of just 3-4 words each.',
    modOnly: 1,
    execute(interaction) {
        interaction.reply({ content: `Please don't flood the channel with multiple lines of just two or three words each! Doing this interrupts the flow of the channel and may disrupt present conversations.\n\nUsing multiple, complete sentences and commas instead of sending bits and pieces of your message will greatly ensure you get the help you need. Plus, if someone sends a big message while you're still sending your small messages, your messages may get split up and scattered.\n\n**To send a multiline message, hold the shift key while pressing enter** to add a newline to your message!` });
    }
}