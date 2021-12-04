import pkg from 'winston';
const { createLogger, format, transport, transports } = pkg;

const logger = createLogger({
    level: 'info',
    format: format.combine(format.timestamp({
        format: "YY-MM-DD HH:mm:ss"
    }),
    format.errors({stack: true}),
    format.splat(),
    format.json()
    ),
    defaultMeta: { service: 'Fraccio API' },
    transports: [
        new transports.File({ filename: 'error.log', level: 'error' }),
        new transports.File({ filename: 'combine.log' })
    ]
});

if(process.env.MODE !== 'production'){
    logger.add(new transports.Console({
        format: format.combine(
            format.colorize(),
            format.simple()
        )
    }))
}

export default logger