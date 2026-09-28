import { Router } from 'express';
import { ResumePublicController } from '../../controllers/public/resume.public.controller';
import { asyncHandler } from '../../utils/asyncHandler';

const router = Router();

router.get('/', asyncHandler(ResumePublicController.getResume));

export default router;
