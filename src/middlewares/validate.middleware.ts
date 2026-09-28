import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { sanitizeObject } from '../utils/sanitize';
import { AppError } from '../utils/apiError';

export const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      if (req.body && typeof req.body === 'object') {
        req.body = sanitizeObject(req.body);
      }

      const parsed = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params
      });

      if (parsed.body !== undefined) req.body = parsed.body;
      if (parsed.query !== undefined) req.query = parsed.query;
      if (parsed.params !== undefined) req.params = parsed.params;

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.issues.map(issue => ({
          field: issue.path.join('.').replace(/^(body|query|params)\./, ''),
          message: issue.message
        }));
        return next(AppError.unprocessable('Validation failed', errorMessages));
      }
      next(error);
    }
  };
};
