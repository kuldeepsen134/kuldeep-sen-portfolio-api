import winston from 'winston';
import { env } from './env';

const sensitiveKeys = ['password', 'token', 'accessToken', 'refreshToken', 'authorization', 'secret'];

// Custom replacer to censor sensitive data
const maskSensitiveData = winston.format(info => {
  if (typeof info.message === 'object' && info.message !== null) {
    const sanitized = { ...(info.message as Record<string, unknown>) };
    sensitiveKeys.forEach(key => {
      if (key in sanitized) {
        sanitized[key] = '***REDACTED***';
      }
    });
    info.message = JSON.stringify(sanitized);
  }
  return info;
});

const isProd = env.NODE_ENV === 'production';

export const logger = winston.createLogger({
  level: isProd ? 'info' : 'debug',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    maskSensitiveData(),
    isProd
      ? winston.format.json()
      : winston.format.combine(
          winston.format.colorize(),
          winston.format.printf(({ timestamp, level, message, stack }) => {
            return `[${timestamp}] ${level}: ${stack || message}`;
          })
        )
  ),
  defaultMeta: { service: 'portfolio-api' },
  transports: [
    new winston.transports.Console()
  ]
});
