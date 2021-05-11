const httpShutDown = require('http-shutdown');
const { boot } = require('./src/express');

async function isListening(server) {
    return new Promise((resolve, reject) => {
        server.on('error', reject),
        server.on('listening', () => { 
            resolve(console.log('this is working pretty well...'));
        });
    });   
}

async function main() {
    const port = 3000;
    const app = await boot();
    const server = httpShutDown(app.listen(port));
    await isListening(server);
}

main().catch((err) => {
    console.log(err);
});