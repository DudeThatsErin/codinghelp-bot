module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log('|-----------------------------------|')
        console.log('          Logging In...             ')
        console.log('|-----------------------------------|')
        console.log(`   ${client.user.tag} is\n   logged in and ready!`);
        console.log('|-----------------------------------|')
        console.log('             Error Logs...           ')
        console.log('|-----------------------------------|')

        client.user.setPresence({ activities: [{ name: 'Use ++ or / prefix' }] });



    }
}