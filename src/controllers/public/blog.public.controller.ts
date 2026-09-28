import { Request, Response } from 'express';
import { blogService } from '../../services/blog.service';
import { ResponseFormatter } from '../../utils/apiResponse';
import { Messages } from '../../constants/messages';

export class BlogPublicController {
  static getBlogs = async (req: Request, res: Response): Promise<void> => {
    const { page, limit, category, tag, search } = req.query;

    const result = await blogService.getPublicBlogs(
      {
        category: category as string,
        tag: tag as string,
        search: search as string
      },
      page ? Number(page) : 1,
      limit ? Number(limit) : 10
    );

    ResponseFormatter.success(res, result, Messages.FETCHED);
  };

  static getBlogBySlug = async (req: Request, res: Response): Promise<void> => {
    const { slug } = req.params;
    const blog = await blogService.getPublicBlogBySlug(slug);
    ResponseFormatter.success(res, blog, Messages.FETCHED);
  };
}
