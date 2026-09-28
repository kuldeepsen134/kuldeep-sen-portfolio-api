import { Router } from 'express';
import { SkillPublicController } from '../../controllers/public/skill.public.controller';
import { asyncHandler } from '../../utils/asyncHandler';

const router = Router();

router.get('/', asyncHandler(SkillPublicController.getSkills));

export default router;
