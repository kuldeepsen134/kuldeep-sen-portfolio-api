import morgan, { StreamOptions } from 'morgan';
import { logger } from '../config/logger';
import { env } from '../config/env';

const stream: StreamOptions = {
  write: (message: string) => logger.info(message.trim())
};

const skip = (): boolean => {
  return env.NODE_ENV === 'test';
};

export const requestLogger = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  { stream, skip }
);
