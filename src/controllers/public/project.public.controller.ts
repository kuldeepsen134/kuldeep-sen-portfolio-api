import { Request, Response } from 'express';
import { projectService } from '../../services/project.service';
import { ResponseFormatter } from '../../utils/apiResponse';
import { Messages } from '../../constants/messages';

export class ProjectPublicController {
  static getProjects = async (req: Request, res: Response): Promise<void> => {
    const { page, limit, category, technology, featured, search } = req.query;

    const result = await projectService.getPublicProjects(
      {
        category: category as string,
        technology: technology as string,
        featured: featured !== undefined ? Boolean(featured) : undefined,
        search: search as string
      },
      page ? Number(page) : 1,
      limit ? Number(limit) : 10
    );

    ResponseFormatter.success(res, result, Messages.FETCHED);
  };

  static getProjectBySlug = async (req: Request, res: Response): Promise<void> => {
    const { slug } = req.params;
    const project = await projectService.getPublicProjectBySlug(slug);
    ResponseFormatter.success(res, project, Messages.FETCHED);
  };
}
