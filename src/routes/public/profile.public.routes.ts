import { Router } from 'express';
import { ProfilePublicController } from '../../controllers/public/profile.public.controller';
import { asyncHandler } from '../../utils/asyncHandler';

const router = Router();

router.get('/', asyncHandler(ProfilePublicController.getProfile));

export default router;
