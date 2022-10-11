module.exports = {
    name: 'warn',
    async execute(error) {
        console.log('|-----------------------------------|');
        console.log('             Error Logs...           ');
        console.log('|-----------------------------------|');
        console.log(error);

    }
}