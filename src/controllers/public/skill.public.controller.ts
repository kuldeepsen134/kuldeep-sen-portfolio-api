import { Request, Response } from 'express';
import { skillService } from '../../services/skill.service';
import { ResponseFormatter } from '../../utils/apiResponse';
import { Messages } from '../../constants/messages';

export class SkillPublicController {
  static getSkills = async (req: Request, res: Response): Promise<void> => {
    const { category } = req.query;
    const skills = await skillService.getPublicSkills(category as string | undefined);
    ResponseFormatter.success(res, skills, Messages.FETCHED);
  };
}
