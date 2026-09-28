import { Router } from 'express';
import { ServiceAdminController } from '../../controllers/admin/service.admin.controller';
import { validateRequest } from '../../middlewares/validate.middleware';
import { createServiceSchema, updateServiceSchema } from '../../validators/service.validator';
import { asyncHandler } from '../../utils/asyncHandler';

const router = Router();

router.get('/', asyncHandler(ServiceAdminController.getServices));
router.post('/', validateRequest(createServiceSchema), asyncHandler(ServiceAdminController.createService));
router.get('/:id', asyncHandler(ServiceAdminController.getServiceById));
router.put('/:id', validateRequest(updateServiceSchema), asyncHandler(ServiceAdminController.updateService));
router.delete('/:id', asyncHandler(ServiceAdminController.deleteService));

export default router;
