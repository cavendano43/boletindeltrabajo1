const pino = require("pino");

exports.logger = pino ({
    transport: {
        target: "pino-pretty"
    },
    options:{
        translateTime: true,
        ignore: "pid,gostname"
    }
})

