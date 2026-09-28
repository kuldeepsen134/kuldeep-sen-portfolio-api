import { Request, Response } from 'express';
import { skillService } from '../../services/skill.service';
import { ResponseFormatter } from '../../utils/apiResponse';
import { Messages } from '../../constants/messages';
import { HttpStatus } from '../../constants/httpStatusCodes';

export class SkillAdminController {
  static getSkills = async (_req: Request, res: Response): Promise<void> => {
    const skills = await skillService.getAdminSkills();
    ResponseFormatter.success(res, skills, Messages.FETCHED);
  };

  static getSkillById = async (req: Request, res: Response): Promise<void> => {
    const skill = await skillService.getSkillById(req.params.id);
    ResponseFormatter.success(res, skill, Messages.FETCHED);
  };

  static createSkill = async (req: Request, res: Response): Promise<void> => {
    const created = await skillService.createSkill(req.body);
    ResponseFormatter.success(res, created, Messages.CREATED, HttpStatus.CREATED);
  };

  static updateSkill = async (req: Request, res: Response): Promise<void> => {
    const updated = await skillService.updateSkill(req.params.id, req.body);
    ResponseFormatter.success(res, updated, Messages.UPDATED);
  };

  static deleteSkill = async (req: Request, res: Response): Promise<void> => {
    await skillService.deleteSkill(req.params.id);
    ResponseFormatter.success(res, null, Messages.DELETED);
  };
}
