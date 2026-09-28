import { Request, Response } from 'express';
import { profileService } from '../../services/profile.service';
import { ResponseFormatter } from '../../utils/apiResponse';
import { Messages } from '../../constants/messages';

export class ProfilePublicController {
  static getProfile = async (_req: Request, res: Response): Promise<void> => {
    const profile = await profileService.getPublicProfile();
    ResponseFormatter.success(res, profile, Messages.FETCHED);
  };
}
