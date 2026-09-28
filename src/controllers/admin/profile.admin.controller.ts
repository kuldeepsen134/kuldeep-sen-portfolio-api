import { Request, Response } from 'express';
import { profileService } from '../../services/profile.service';
import { ResponseFormatter } from '../../utils/apiResponse';
import { Messages } from '../../constants/messages';
import { HttpStatus } from '../../constants/httpStatusCodes';

export class ProfileAdminController {
  static getProfile = async (_req: Request, res: Response): Promise<void> => {
    const profile = await profileService.getAdminProfile();
    ResponseFormatter.success(res, profile, Messages.FETCHED);
  };

  static upsertProfile = async (req: Request, res: Response): Promise<void> => {
    const updated = await profileService.upsertProfile(req.body);
    ResponseFormatter.success(res, updated, Messages.UPDATED, HttpStatus.OK);
  };
}
