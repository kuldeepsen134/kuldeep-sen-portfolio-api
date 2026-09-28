import { HttpStatus, HttpStatusCode } from '../constants/httpStatusCodes';

export class AppError extends Error {
  public readonly statusCode: HttpStatusCode;
  public readonly isOperational: boolean;
  public readonly errors: unknown[];

  constructor(
    message: string,
    statusCode: HttpStatusCode = HttpStatus.INTERNAL_SERVER_ERROR,
    errors: unknown[] = [],
    isOperational = true
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.errors = errors;

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message = 'Bad Request', errors: unknown[] = []): AppError {
    return new AppError(message, HttpStatus.BAD_REQUEST, errors);
  }

  static unauthorized(message = 'Unauthorized'): AppError {
    return new AppError(message, HttpStatus.UNAUTHORIZED);
  }

  static forbidden(message = 'Forbidden'): AppError {
    return new AppError(message, HttpStatus.FORBIDDEN);
  }

  static notFound(message = 'Resource Not Found'): AppError {
    return new AppError(message, HttpStatus.NOT_FOUND);
  }

  static conflict(message = 'Resource Conflict'): AppError {
    return new AppError(message, HttpStatus.CONFLICT);
  }

  static unprocessable(message = 'Unprocessable Entity', errors: unknown[] = []): AppError {
    return new AppError(message, HttpStatus.UNPROCESSABLE_ENTITY, errors);
  }

  static tooManyRequests(message = 'Too Many Requests'): AppError {
    return new AppError(message, HttpStatus.TOO_MANY_REQUESTS);
  }

  static internal(message = 'Internal Server Error'): AppError {
    return new AppError(message, HttpStatus.INTERNAL_SERVER_ERROR, [], false);
  }
}
