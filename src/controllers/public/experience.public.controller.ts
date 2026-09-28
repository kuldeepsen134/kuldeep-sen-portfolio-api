import { Request, Response } from 'express';
import { experienceService } from '../../services/experience.service';
import { ResponseFormatter } from '../../utils/apiResponse';
import { Messages } from '../../constants/messages';

export class ExperiencePublicController {
  static getExperience = async (_req: Request, res: Response): Promise<void> => {
    const experience = await experienceService.getPublicExperience();
    ResponseFormatter.success(res, experience, Messages.FETCHED);
  };
}
