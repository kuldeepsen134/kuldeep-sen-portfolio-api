import { Request, Response } from 'express';
import { profileService } from '../../services/profile.service';
import { ResponseFormatter } from '../../utils/apiResponse';
import { Messages } from '../../constants/messages';

export class ResumePublicController {
  static getResume = async (req: Request, res: Response): Promise<void> => {
    const resumeInfo = await profileService.getResumeDownloadInfo();

    if (req.query.redirect === 'true') {
      return res.redirect(resumeInfo.resumeUrl);
    }

    ResponseFormatter.success(res, resumeInfo, Messages.FETCHED);
  };
}
