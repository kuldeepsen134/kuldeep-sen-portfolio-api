import { JwtAdminPayload } from './index';

declare global {
  namespace Express {
    interface Request {
      admin?: JwtAdminPayload;
    }
  }
}
