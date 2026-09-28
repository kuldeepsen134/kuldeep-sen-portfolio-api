import { Router } from 'express';
import { BlogAdminController } from '../../controllers/admin/blog.admin.controller';
import { validateRequest } from '../../middlewares/validate.middleware';
import {
  createBlogSchema,
  updateBlogSchema,
  queryBlogSchema
} from '../../validators/blog.validator';
import { asyncHandler } from '../../utils/asyncHandler';

const router = Router();

router.get('/', validateRequest(queryBlogSchema), asyncHandler(BlogAdminController.getBlogs));
router.post('/', validateRequest(createBlogSchema), asyncHandler(BlogAdminController.createBlog));
router.get('/:id', asyncHandler(BlogAdminController.getBlogById));
router.put('/:id', validateRequest(updateBlogSchema), asyncHandler(BlogAdminController.updateBlog));
router.delete('/:id', asyncHandler(BlogAdminController.deleteBlog));

export default router;
