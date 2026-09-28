import { Request, Response } from 'express';
import { getDatabaseStatus } from '../config/database';
import { env } from '../config/env';
import { HttpStatus } from '../constants/httpStatusCodes';

export class HealthController {
  static getHealth(_req: Request, res: Response): void {
    const dbStatus = getDatabaseStatus();
    const isHealthy = dbStatus === 'connected';

    const healthData = {
      success: true,
      status: isHealthy ? 'healthy' : 'degraded',
      database: dbStatus,
      environment: env.NODE_ENV,
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    };

    res.status(isHealthy ? HttpStatus.OK : HttpStatus.SERVICE_UNAVAILABLE).json(healthData);
  }
}
