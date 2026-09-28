import { Router } from 'express';
import { TestimonialAdminController } from '../../controllers/admin/testimonial.admin.controller';
import { validateRequest } from '../../middlewares/validate.middleware';
import {
  createTestimonialSchema,
  updateTestimonialSchema
} from '../../validators/testimonial.validator';
import { asyncHandler } from '../../utils/asyncHandler';

const router = Router();

router.get('/', asyncHandler(TestimonialAdminController.getTestimonials));
router.post('/', validateRequest(createTestimonialSchema), asyncHandler(TestimonialAdminController.createTestimonial));
router.get('/:id', asyncHandler(TestimonialAdminController.getTestimonialById));
router.put('/:id', validateRequest(updateTestimonialSchema), asyncHandler(TestimonialAdminController.updateTestimonial));
router.delete('/:id', asyncHandler(TestimonialAdminController.deleteTestimonial));

export default router;
