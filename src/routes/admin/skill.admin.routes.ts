import { Router } from 'express';
import { SkillAdminController } from '../../controllers/admin/skill.admin.controller';
import { validateRequest } from '../../middlewares/validate.middleware';
import { createSkillSchema, updateSkillSchema } from '../../validators/skill.validator';
import { asyncHandler } from '../../utils/asyncHandler';

const router = Router();

router.get('/', asyncHandler(SkillAdminController.getSkills));
router.post('/', validateRequest(createSkillSchema), asyncHandler(SkillAdminController.createSkill));
router.get('/:id', asyncHandler(SkillAdminController.getSkillById));
router.put('/:id', validateRequest(updateSkillSchema), asyncHandler(SkillAdminController.updateSkill));
router.delete('/:id', asyncHandler(SkillAdminController.deleteSkill));

export default router;
