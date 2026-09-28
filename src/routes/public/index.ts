import { Router } from 'express';
import profileRoutes from './profile.public.routes';
import projectRoutes from './project.public.routes';
import serviceRoutes from './service.public.routes';
import skillRoutes from './skill.public.routes';
import experienceRoutes from './experience.public.routes';
import testimonialRoutes from './testimonial.public.routes';
import blogRoutes from './blog.public.routes';
import contactRoutes from './contact.public.routes';
import resumeRoutes from './resume.public.routes';

const router = Router();

router.use('/profile', profileRoutes);
router.use('/projects', projectRoutes);
router.use('/services', serviceRoutes);
router.use('/skills', skillRoutes);
router.use('/experience', experienceRoutes);
router.use('/testimonials', testimonialRoutes);
router.use('/blogs', blogRoutes);
router.use('/contact', contactRoutes);
router.use('/resume', resumeRoutes);

export default router;
