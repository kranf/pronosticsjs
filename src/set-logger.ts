import winston, { format } from "winston";

const LOGGING_LEVEL = process.env.LOGGING_LEVEL || 'info';

export function setLogger() {
  winston.createLogger({
    transports: [new winston.transports.Console()],
    level: LOGGING_LEVEL,
    format: format.combine(
      format.colorize(),
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }))
  })
}