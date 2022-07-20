const mongoose = require('mongoose')
const { mongoUri, useMongo } = require('../../../config.json')

module.exports = {
    name: 'ready',
    once: true,

    async execute(client) {
        console.log(`[Startup] ${client.user.username} is online`)
        if (useMongo === true) mongoose.connect(mongoUri, { keepAlive: true }).then(console.log(`[Startup] ${client.user.username} has connected to mongo`))
    }
}
