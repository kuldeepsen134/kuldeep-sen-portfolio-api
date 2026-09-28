import { Router } from 'express';
import { ContactAdminController } from '../../controllers/admin/contact.admin.controller';
import { validateRequest } from '../../middlewares/validate.middleware';
import {
  queryContactSchema,
  updateContactStatusSchema
} from '../../validators/contact.validator';
import { asyncHandler } from '../../utils/asyncHandler';

const router = Router();

router.get('/', validateRequest(queryContactSchema), asyncHandler(ContactAdminController.getInquiries));
router.get('/:id', asyncHandler(ContactAdminController.getInquiryById));
router.patch('/:id/status', validateRequest(updateContactStatusSchema), asyncHandler(ContactAdminController.updateStatus));
router.delete('/:id', asyncHandler(ContactAdminController.deleteInquiry));

export default router;
