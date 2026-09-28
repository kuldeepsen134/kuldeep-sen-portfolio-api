import { Request, Response } from 'express';
import { projectService } from '../../services/project.service';
import { ResponseFormatter } from '../../utils/apiResponse';
import { Messages } from '../../constants/messages';
import { HttpStatus } from '../../constants/httpStatusCodes';

export class ProjectAdminController {
  static getProjects = async (req: Request, res: Response): Promise<void> => {
    const { page, limit, status } = req.query;
    const result = await projectService.getAdminProjects(
      page ? Number(page) : 1,
      limit ? Number(limit) : 20,
      status as string | undefined
    );
    ResponseFormatter.success(res, result, Messages.FETCHED);
  };

  static getProjectById = async (req: Request, res: Response): Promise<void> => {
    const project = await projectService.getProjectById(req.params.id);
    ResponseFormatter.success(res, project, Messages.FETCHED);
  };

  static createProject = async (req: Request, res: Response): Promise<void> => {
    const created = await projectService.createProject(req.body);
    ResponseFormatter.success(res, created, Messages.CREATED, HttpStatus.CREATED);
  };

  static updateProject = async (req: Request, res: Response): Promise<void> => {
    const updated = await projectService.updateProject(req.params.id, req.body);
    ResponseFormatter.success(res, updated, Messages.UPDATED);
  };

  static deleteProject = async (req: Request, res: Response): Promise<void> => {
    await projectService.deleteProject(req.params.id);
    ResponseFormatter.success(res, null, Messages.DELETED);
  };
}
