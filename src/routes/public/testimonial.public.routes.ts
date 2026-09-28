import { Router } from 'express';
import { TestimonialPublicController } from '../../controllers/public/testimonial.public.controller';
import { asyncHandler } from '../../utils/asyncHandler';

const router = Router();

router.get('/', asyncHandler(TestimonialPublicController.getTestimonials));

export default router;
