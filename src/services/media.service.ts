import { cloudinary, isCloudinaryConfigured } from '../config/cloudinary';
import { AppError } from '../utils/apiError';
import { logger } from '../config/logger';

export interface UploadResult {
  url: string;
  publicId?: string;
  format?: string;
  size?: number;
}

export class MediaService {
  async uploadFile(file: Express.Multer.File, folder = 'portfolio'): Promise<UploadResult> {
    if (!file || !file.buffer) {
      throw AppError.badRequest('No file provided for upload.');
    }

    if (isCloudinaryConfigured()) {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder,
            resource_type: file.mimetype.startsWith('image/') ? 'image' : 'raw'
          },
          (error, result) => {
            if (error || !result) {
              logger.error('Cloudinary upload failed:', error);
              return reject(AppError.internal('File upload failed.'));
            }
            resolve({
              url: result.secure_url,
              publicId: result.public_id,
              format: result.format,
              size: result.bytes
            });
          }
        );
        uploadStream.end(file.buffer);
      });
    }

    // Fallback: If Cloudinary is not configured, generate a data URI
    logger.info('ℹ️ Cloudinary credentials not configured; generating Base64 Data URI for media.');
    const base64Data = file.buffer.toString('base64');
    const dataUri = `data:${file.mimetype};base64,${base64Data}`;

    return {
      url: dataUri,
      format: file.mimetype.split('/')[1],
      size: file.size
    };
  }
}

export const mediaService = new MediaService();
