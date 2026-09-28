import { Response } from 'express';
import { ApiResponse } from '../types';
import { HttpStatus, HttpStatusCode } from '../constants/httpStatusCodes';

export class ResponseFormatter {
  static success<T>(
    res: Response,
    data: T,
    message = 'Success',
    statusCode: HttpStatusCode = HttpStatus.OK
  ): Response {
    const payload: ApiResponse<T> = {
      success: true,
      message,
      data
    };
    return res.status(statusCode).json(payload);
  }

  static error(
    res: Response,
    message: string,
    errors: unknown[] = [],
    statusCode: HttpStatusCode = HttpStatus.INTERNAL_SERVER_ERROR
  ): Response {
    const payload: ApiResponse<null> = {
      success: false,
      message,
      errors
    };
    return res.status(statusCode).json(payload);
  }
}
