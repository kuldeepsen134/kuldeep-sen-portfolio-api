import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validateRequest } from '../middlewares/validate.middleware';
import { loginSchema, refreshSchema } from '../validators/auth.validator';
import { authLimiter } from '../middlewares/rateLimiter.middleware';
import { authenticateAdmin } from '../middlewares/auth.middleware';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

router.post(
  '/login',
  authLimiter,
  validateRequest(loginSchema),
  asyncHandler(AuthController.login)
);

router.post(
  '/refresh',
  validateRequest(refreshSchema),
  asyncHandler(AuthController.refresh)
);

router.post(
  '/logout',
  authenticateAdmin,
  asyncHandler(AuthController.logout)
);

export default router;
