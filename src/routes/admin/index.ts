import { Router } from 'express';
import { authenticateAdmin } from '../../middlewares/auth.middleware';
import profileRoutes from './profile.admin.routes';
import projectRoutes from './project.admin.routes';
import serviceRoutes from './service.admin.routes';
import skillRoutes from './skill.admin.routes';
import experienceRoutes from './experience.admin.routes';
import testimonialRoutes from './testimonial.admin.routes';
import blogRoutes from './blog.admin.routes';
import contactRoutes from './contact.admin.routes';
import mediaRoutes from './media.admin.routes';

const router = Router();

// Protect all admin endpoints with JWT authentication
router.use(authenticateAdmin);

router.use('/profile', profileRoutes);
router.use('/projects', projectRoutes);
router.use('/services', serviceRoutes);
router.use('/skills', skillRoutes);
router.use('/experience', experienceRoutes);
router.use('/testimonials', testimonialRoutes);
router.use('/blogs', blogRoutes);
router.use('/contact', contactRoutes);
router.use('/media', mediaRoutes);

export default router;
