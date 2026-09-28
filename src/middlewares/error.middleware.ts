import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/apiError';
import { HttpStatus } from '../constants/httpStatusCodes';
import { env } from '../config/env';
import { logger } from '../config/logger';

interface MongoError extends Error {
  code?: number;
  keyValue?: Record<string, unknown>;
  errors?: Record<string, { message: string }>;
}

export const errorHandler = (
  err: Error | AppError | MongoError,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  let statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR;
  let message = 'An unexpected server error occurred.';
  let errors: unknown[] = [];

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    errors = err.errors;
  } else if ('name' in err && err.name === 'CastError') {
    statusCode = HttpStatus.BAD_REQUEST;
    message = 'Invalid resource identifier provided.';
    errors = [{ message: 'Resource ID format is invalid.' }];
  } else if ('code' in err && err.code === 11000) {
    statusCode = HttpStatus.CONFLICT;
    const mongoErr = err as MongoError;
    const duplicateField = mongoErr.keyValue ? Object.keys(mongoErr.keyValue)[0] : 'field';
    message = `Duplicate value entered for ${duplicateField}. Must be unique.`;
    errors = [{ field: duplicateField, message: `${duplicateField} already exists.` }];
  } else if ('name' in err && err.name === 'ValidationError') {
    statusCode = HttpStatus.UNPROCESSABLE_ENTITY;
    message = 'Validation failed.';
    const mongoErr = err as MongoError;
    if (mongoErr.errors) {
      errors = Object.values(mongoErr.errors).map(val => ({ message: val.message }));
    }
  } else if ('name' in err && (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError')) {
    statusCode = HttpStatus.UNAUTHORIZED;
    message = err.name === 'TokenExpiredError' ? 'Token expired.' : 'Invalid token.';
    errors = [{ message }];
  }

  // Log non-operational (unexpected) or 500 errors
  if (statusCode >= 500) {
    logger.error(`[500 Server Error] ${req.method} ${req.originalUrl}:`, {
      message: err.message,
      stack: err.stack,
      ip: req.ip
    });
  } else {
    logger.warn(`[Client Error ${statusCode}] ${req.method} ${req.originalUrl}: ${message}`);
  }

  const responsePayload: Record<string, unknown> = {
    success: false,
    message,
    errors
  };

  // Only expose stack in development environment
  if (env.NODE_ENV === 'development') {
    responsePayload.stack = err.stack;
  }

  res.status(statusCode).json(responsePayload);
};
