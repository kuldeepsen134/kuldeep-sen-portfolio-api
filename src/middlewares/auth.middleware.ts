import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt';
import { AppError } from '../utils/apiError';
import { Messages } from '../constants/messages';
import { adminRepository } from '../repositories/admin.repository';

export const authenticateAdmin = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw AppError.unauthorized(Messages.UNAUTHORIZED);
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw AppError.unauthorized(Messages.UNAUTHORIZED);
    }

    let payload;
    try {
      payload = verifyAccessToken(token);
    } catch {
      throw AppError.unauthorized(Messages.TOKEN_INVALID);
    }

    // Verify admin still exists in database
    const admin = await adminRepository.findById(payload.id);
    if (!admin) {
      throw AppError.unauthorized('Admin user no longer exists.');
    }

    req.admin = {
      id: admin._id.toString(),
      email: admin.email,
      role: admin.role
    };

    next();
  } catch (error) {
    next(error);
  }
};
