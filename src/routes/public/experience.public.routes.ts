import { Router } from 'express';
import { ExperiencePublicController } from '../../controllers/public/experience.public.controller';
import { asyncHandler } from '../../utils/asyncHandler';

const router = Router();

router.get('/', asyncHandler(ExperiencePublicController.getExperience));

export default router;
