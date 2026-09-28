import { createApp } from './app';
import { connectDatabase, disconnectDatabase } from './config/database';
import { env } from './config/env';
import { logger } from './config/logger';
import http from 'http';

const startServer = async (): Promise<void> => {
  // Connect to Database
  await connectDatabase();

  const app = createApp();
  const server = http.createServer(app);

  server.listen(env.PORT, () => {
    logger.info(`🚀 Server is running on port ${env.PORT} in ${env.NODE_ENV} mode`);
    logger.info(`📚 Swagger docs available at http://localhost:${env.PORT}/api/docs`);
    logger.info(`🩺 Health check available at http://localhost:${env.PORT}/health`);
  });

  const gracefulShutdown = async (signal: string): Promise<void> => {
    logger.info(`Received ${signal}. Gracefully shutting down...`);
    server.close(async () => {
      logger.info('HTTP server closed.');
      await disconnectDatabase();
      logger.info('Application stopped cleanly.');
      process.exit(0);
    });

    // Force shutdown after 10s if dangling connections
    setTimeout(() => {
      logger.error('Could not close connections in time, forcefully shutting down');
      process.exit(1);
    }, 10000);
  };

  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));

  process.on('unhandledRejection', (reason: unknown) => {
    logger.error('Unhandled Rejection at Promise:', reason);
  });

  process.on('uncaughtException', (error: Error) => {
    logger.error('Uncaught Exception thrown:', error);
    process.exit(1);
  });
};

startServer().catch(err => {
  logger.error('Server initialization failed:', err);
  process.exit(1);
});
