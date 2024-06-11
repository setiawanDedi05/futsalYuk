const { createLogger, format, transports } = require("winston");

const logger = createLogger({
    transports: [
        new transports.Console(),
        new transports.DailyRotateFile({
            filename: `./logging/application-log-%DATE%.log`,
            datePattern: 'ddd, DD-MM-YYYY',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '7d'
        }),
        // new transports.File({
        //     level: 'error',
        //     filename: 'logsErrors.log'
        // })
    ],
    format: format.combine(
        format.timestamp(),
        format.json(),
        format.metadata(),
        format.prettyPrint()
    )
})

module.exports = logger