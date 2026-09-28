import { Request, Response } from 'express';
import { experienceService } from '../../services/experience.service';
import { ResponseFormatter } from '../../utils/apiResponse';
import { Messages } from '../../constants/messages';
import { HttpStatus } from '../../constants/httpStatusCodes';

export class ExperienceAdminController {
  static getExperience = async (_req: Request, res: Response): Promise<void> => {
    const experience = await experienceService.getAdminExperience();
    ResponseFormatter.success(res, experience, Messages.FETCHED);
  };

  static getExperienceById = async (req: Request, res: Response): Promise<void> => {
    const experience = await experienceService.getExperienceById(req.params.id);
    ResponseFormatter.success(res, experience, Messages.FETCHED);
  };

  static createExperience = async (req: Request, res: Response): Promise<void> => {
    const created = await experienceService.createExperience(req.body);
    ResponseFormatter.success(res, created, Messages.CREATED, HttpStatus.CREATED);
  };

  static updateExperience = async (req: Request, res: Response): Promise<void> => {
    const updated = await experienceService.updateExperience(req.params.id, req.body);
    ResponseFormatter.success(res, updated, Messages.UPDATED);
  };

  static deleteExperience = async (req: Request, res: Response): Promise<void> => {
    await experienceService.deleteExperience(req.params.id);
    ResponseFormatter.success(res, null, Messages.DELETED);
  };
}
