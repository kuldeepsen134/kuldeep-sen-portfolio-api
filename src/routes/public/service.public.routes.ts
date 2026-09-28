import { Router } from 'express';
import { ServicePublicController } from '../../controllers/public/service.public.controller';
import { asyncHandler } from '../../utils/asyncHandler';

const router = Router();

router.get('/', asyncHandler(ServicePublicController.getServices));

export default router;
