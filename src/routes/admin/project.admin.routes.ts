import { Router } from 'express';
import { ProjectAdminController } from '../../controllers/admin/project.admin.controller';
import { validateRequest } from '../../middlewares/validate.middleware';
import {
  createProjectSchema,
  updateProjectSchema,
  queryProjectSchema
} from '../../validators/project.validator';
import { asyncHandler } from '../../utils/asyncHandler';

const router = Router();

router.get('/', validateRequest(queryProjectSchema), asyncHandler(ProjectAdminController.getProjects));
router.post('/', validateRequest(createProjectSchema), asyncHandler(ProjectAdminController.createProject));
router.get('/:id', asyncHandler(ProjectAdminController.getProjectById));
router.put('/:id', validateRequest(updateProjectSchema), asyncHandler(ProjectAdminController.updateProject));
router.delete('/:id', asyncHandler(ProjectAdminController.deleteProject));

export default router;
