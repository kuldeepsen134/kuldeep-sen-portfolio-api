import { Router } from 'express';
import { ExperienceAdminController } from '../../controllers/admin/experience.admin.controller';
import { validateRequest } from '../../middlewares/validate.middleware';
import {
  createExperienceSchema,
  updateExperienceSchema
} from '../../validators/experience.validator';
import { asyncHandler } from '../../utils/asyncHandler';

const router = Router();

router.get('/', asyncHandler(ExperienceAdminController.getExperience));
router.post('/', validateRequest(createExperienceSchema), asyncHandler(ExperienceAdminController.createExperience));
router.get('/:id', asyncHandler(ExperienceAdminController.getExperienceById));
router.put('/:id', validateRequest(updateExperienceSchema), asyncHandler(ExperienceAdminController.updateExperience));
router.delete('/:id', asyncHandler(ExperienceAdminController.deleteExperience));

export default router;
