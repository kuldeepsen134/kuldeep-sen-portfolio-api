import { Router } from 'express';
import { BlogPublicController } from '../../controllers/public/blog.public.controller';
import { validateRequest } from '../../middlewares/validate.middleware';
import { queryBlogSchema, blogSlugSchema } from '../../validators/blog.validator';
import { asyncHandler } from '../../utils/asyncHandler';

const router = Router();

router.get(
  '/',
  validateRequest(queryBlogSchema),
  asyncHandler(BlogPublicController.getBlogs)
);

router.get(
  '/:slug',
  validateRequest(blogSlugSchema),
  asyncHandler(BlogPublicController.getBlogBySlug)
);

export default router;
