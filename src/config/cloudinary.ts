import { v2 as cloudinary } from 'cloudinary';
import { env } from './env';
import { logger } from './logger';

export const isCloudinaryConfigured = (): boolean => {
  return Boolean(
    env.CLOUDINARY_CLOUD_NAME &&
    env.CLOUDINARY_API_KEY &&
    env.CLOUDINARY_API_SECRET
  );
};

if (isCloudinaryConfigured()) {
  cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET,
    secure: true
  });
  logger.info('☁️ Cloudinary configured successfully.');
} else {
  logger.info('ℹ️ Cloudinary not configured. File uploads will fallback to local storage or URL references.');
}

export { cloudinary };
