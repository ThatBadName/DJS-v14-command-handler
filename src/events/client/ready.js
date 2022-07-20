const mongoose = require('mongoose')
const { mongoUri } = require('../../../config.json')

module.exports = {
    name: 'ready',
    once: true,

    async execute(client) {
        console.log(`[Startup] ${client.user.username} is online`)
        mongoose.connect(mongoUri, { keepAlive: true }).then(console.log(`[Startup] ${client.user.username} has connected to mongo`))
    }
}