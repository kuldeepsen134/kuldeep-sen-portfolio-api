import { Router } from 'express';
import { MediaAdminController } from '../../controllers/admin/media.admin.controller';
import { uploadMiddleware } from '../../middlewares/upload.middleware';
import { asyncHandler } from '../../utils/asyncHandler';

const router = Router();

router.post(
  '/upload',
  uploadMiddleware.single('file'),
  asyncHandler(MediaAdminController.upload)
);

export default router;
