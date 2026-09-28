import { Router } from 'express';
import { ProfileAdminController } from '../../controllers/admin/profile.admin.controller';
import { validateRequest } from '../../middlewares/validate.middleware';
import { upsertProfileSchema } from '../../validators/profile.validator';
import { asyncHandler } from '../../utils/asyncHandler';

const router = Router();

router.get('/', asyncHandler(ProfileAdminController.getProfile));
router.put('/', validateRequest(upsertProfileSchema), asyncHandler(ProfileAdminController.upsertProfile));

export default router;
