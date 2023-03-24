const winston = require('winston');
const { combine, timestamp, printf, errors } = winston.format;

const logger = (() => {
  const logFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} ${level}: ${stack || message}`;
  });

  return winston.createLogger({
    format: combine(
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      errors({ stack: true }),
      logFormat
    ),
    transports: [new winston.transports.Console({})],
  });
})();

module.exports = { logger };
