import { Request, Response } from 'express';
import { blogService } from '../../services/blog.service';
import { ResponseFormatter } from '../../utils/apiResponse';
import { Messages } from '../../constants/messages';
import { HttpStatus } from '../../constants/httpStatusCodes';

export class BlogAdminController {
  static getBlogs = async (req: Request, res: Response): Promise<void> => {
    const { page, limit, status } = req.query;
    const result = await blogService.getAdminBlogs(
      page ? Number(page) : 1,
      limit ? Number(limit) : 20,
      status as string | undefined
    );
    ResponseFormatter.success(res, result, Messages.FETCHED);
  };

  static getBlogById = async (req: Request, res: Response): Promise<void> => {
    const blog = await blogService.getBlogById(req.params.id);
    ResponseFormatter.success(res, blog, Messages.FETCHED);
  };

  static createBlog = async (req: Request, res: Response): Promise<void> => {
    const created = await blogService.createBlog(req.body);
    ResponseFormatter.success(res, created, Messages.CREATED, HttpStatus.CREATED);
  };

  static updateBlog = async (req: Request, res: Response): Promise<void> => {
    const updated = await blogService.updateBlog(req.params.id, req.body);
    ResponseFormatter.success(res, updated, Messages.UPDATED);
  };

  static deleteBlog = async (req: Request, res: Response): Promise<void> => {
    await blogService.deleteBlog(req.params.id);
    ResponseFormatter.success(res, null, Messages.DELETED);
  };
}
