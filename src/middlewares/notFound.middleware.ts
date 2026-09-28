import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/apiError';
import { Messages } from '../constants/messages';

export const notFoundHandler = (req: Request, _res: Response, next: NextFunction): void => {
  next(AppError.notFound(`${Messages.RESOURCE_NOT_FOUND} Cannot ${req.method} ${req.originalUrl}`));
};
