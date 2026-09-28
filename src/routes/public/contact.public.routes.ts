import { Router } from 'express';
import { ContactPublicController } from '../../controllers/public/contact.public.controller';
import { validateRequest } from '../../middlewares/validate.middleware';
import { createContactSchema } from '../../validators/contact.validator';
import { contactLimiter } from '../../middlewares/rateLimiter.middleware';
import { asyncHandler } from '../../utils/asyncHandler';

const router = Router();

router.post(
  '/',
  contactLimiter,
  validateRequest(createContactSchema),
  asyncHandler(ContactPublicController.submitContact)
);

export default router;
