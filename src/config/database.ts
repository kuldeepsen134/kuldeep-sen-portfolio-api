import mongoose from 'mongoose';
import { env } from './env';
import { logger } from './logger';

let connectionPromise: Promise<typeof mongoose> | null = null;

export const connectDatabase = async (): Promise<typeof mongoose> => {
  // Already connected
  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }

  // Connection already in progress
  if (connectionPromise) {
    return connectionPromise;
  }

  connectionPromise = mongoose
    .connect(env.MONGODB_URI, {
      autoIndex: env.NODE_ENV !== 'production'
    })
    .then((conn) => {
      logger.info(
        `✅ MongoDB connected successfully to: ${conn.connection.host}/${conn.connection.name}`
      );

      return conn;
    })
    .catch((error) => {
      logger.error('❌ MongoDB connection error:', error);

      // Allow the next invocation to retry
      connectionPromise = null;

      throw error;
    });

  return connectionPromise;
};

export const disconnectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connection.close();
    connectionPromise = null;

    logger.info('MongoDB connection closed.');
  } catch (error) {
    logger.error('Error during MongoDB disconnection:', error);
  }
};

export const getDatabaseStatus = (): string => {
  const states: Record<number, string> = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };

  return states[mongoose.connection.readyState] || 'unknown';
};

mongoose.connection.on('disconnected', () => {
  logger.warn('⚠️ MongoDB disconnected.');
});

mongoose.connection.on('reconnected', () => {
  logger.info('🔄 MongoDB reconnected.');
});

mongoose.connection.on('error', (err) => {
  logger.error('⚠️ MongoDB error occurred:', err);
});