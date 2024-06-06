import winston, { format } from 'winston';

const LOGGING_LEVEL = process.env.LOGGING_LEVEL || 'info';

export function setLogger() {
    winston.configure({
        transports: [new winston.transports.Console()],
        level: LOGGING_LEVEL,
        format: format.combine(
            format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss',
            }),
            format.errors({ stack: true }),
            format.colorize(),
            format.printf(({ level, message, timestamp }) => `${timestamp} | ${level} | ${message}`),
        ),
    });
}
