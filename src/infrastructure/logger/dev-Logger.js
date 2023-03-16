import {format, createLogger, transports} from ('winston');
import {timestamp, combine, printf, errors} from format;

const DevLogger = function (){
    const logFormat = printf(({level, message, timestamp, stack}) => {
        return `${timestamp} ${level}: ${stack || message}`;
    });

    return createLogger({
        format: combine(
            timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
            errors({stack: true}),
            logFormat
        ),
        transports: [
            new transports.Console({}),
        ],
    });
}

const logger = DevLogger();
export default logger;