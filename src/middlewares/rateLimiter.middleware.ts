import rateLimit from 'express-rate-limit';
import { env } from '../config/env';
import { HttpStatus } from '../constants/httpStatusCodes';
import { Messages } from '../constants/messages';

export const globalLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  statusCode: HttpStatus.TOO_MANY_REQUESTS,
  message: {
    success: false,
    message: Messages.TOO_MANY_REQUESTS,
    errors: [{ message: 'Rate limit exceeded. Please try again after a few minutes.' }]
  }
});

export const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: env.CONTACT_RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  statusCode: HttpStatus.TOO_MANY_REQUESTS,
  message: {
    success: false,
    message: 'Too many contact inquiries from this IP. Please wait a while before sending another.',
    errors: [{ message: 'Too many messages sent. Please try again later.' }]
  }
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10, // 10 attempts per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  statusCode: HttpStatus.TOO_MANY_REQUESTS,
  message: {
    success: false,
    message: 'Too many login attempts. Please try again later.',
    errors: [{ message: 'Rate limit exceeded for authentication attempts.' }]
  }
});
