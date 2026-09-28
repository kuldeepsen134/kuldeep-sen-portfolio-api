import { Request, Response } from 'express';
import { authService } from '../services/auth.service';
import { ResponseFormatter } from '../utils/apiResponse';
import { Messages } from '../constants/messages';
import { HttpStatus } from '../constants/httpStatusCodes';

export class AuthController {
  static login = async (req: Request, res: Response): Promise<void> => {
    const result = await authService.login(req.body);
    ResponseFormatter.success(res, result, Messages.LOGIN_SUCCESS, HttpStatus.OK);
  };

  static refresh = async (req: Request, res: Response): Promise<void> => {
    const { refreshToken } = req.body;
    const tokens = await authService.refreshToken(refreshToken);
    ResponseFormatter.success(res, tokens, Messages.REFRESH_SUCCESS, HttpStatus.OK);
  };

  static logout = async (req: Request, res: Response): Promise<void> => {
    if (req.admin?.id) {
      await authService.logout(req.admin.id);
    }
    ResponseFormatter.success(res, null, Messages.LOGOUT_SUCCESS, HttpStatus.OK);
  };
}
