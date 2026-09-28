import { Router } from 'express';
import healthRoutes from './health.routes';
import authRoutes from './auth.routes';
import publicRoutes from './public';
import adminRoutes from './admin';

const router = Router();

// Health Check
router.use('/health', healthRoutes);

// API v1 Routers
router.use('/api/v1/auth', authRoutes);
router.use('/api/v1/public', publicRoutes);
router.use('/api/v1/admin', adminRoutes);

export default router;
