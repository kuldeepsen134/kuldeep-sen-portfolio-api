import { Router } from 'express';
import { ProjectPublicController } from '../../controllers/public/project.public.controller';
import { validateRequest } from '../../middlewares/validate.middleware';
import { queryProjectSchema, projectSlugSchema } from '../../validators/project.validator';
import { asyncHandler } from '../../utils/asyncHandler';

const router = Router();

router.get(
  '/',
  validateRequest(queryProjectSchema),
  asyncHandler(ProjectPublicController.getProjects)
);

router.get(
  '/:slug',
  validateRequest(projectSlugSchema),
  asyncHandler(ProjectPublicController.getProjectBySlug)
);

export default router;
