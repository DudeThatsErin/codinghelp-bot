module.exports = {
    name: 'read-error',
    description: 'Informs people how to read errors.',
    execute(interaction) {
        interaction.reply({ content: `So, you have an error that says something like this:\n\`\`\`[17:34:41] C:/Users/File/Path/Here(5,50): error CS1002 ; expected\`\`\`\nThat error means you are missing a semicolon (\`;\`). You fix it by adding that semicolon. But where do I add that semicolon? You are probably asking. The error message tells you where. After the file path, there is a \`(5,50)\`. That means it is on \`line 5\` and the \`50th character\` in that line. Pretty easy, right? Hope this helps!` })
    }
}