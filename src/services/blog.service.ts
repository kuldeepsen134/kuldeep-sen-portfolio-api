import { blogRepository, BlogFilter } from '../repositories/blog.repository';
import { IBlog } from '../models/blog.model';
import { PaginatedResult } from '../types';
import { AppError } from '../utils/apiError';
import { Messages } from '../constants/messages';

export class BlogService {
  async getPublicBlogs(
    filter: BlogFilter = {},
    page = 1,
    limit = 10
  ): Promise<PaginatedResult<IBlog>> {
    return blogRepository.findPublic(filter, page, limit);
  }

  async getPublicBlogBySlug(slug: string): Promise<IBlog> {
    const blog = await blogRepository.findBySlug(slug, true);
    if (!blog) {
      throw AppError.notFound(`Blog post with slug "${slug}" was not found.`);
    }
    return blog;
  }

  async getAdminBlogs(
    page = 1,
    limit = 20,
    status?: string
  ): Promise<PaginatedResult<IBlog>> {
    return blogRepository.findAllAdmin(page, limit, status);
  }

  async getBlogById(id: string): Promise<IBlog> {
    const blog = await blogRepository.findById(id);
    if (!blog) {
      throw AppError.notFound(Messages.RESOURCE_NOT_FOUND);
    }
    return blog;
  }

  async createBlog(data: Partial<IBlog>): Promise<IBlog> {
    if (data.slug) {
      const existing = await blogRepository.findBySlug(data.slug, false);
      if (existing) {
        throw AppError.conflict(`A blog post with slug "${data.slug}" already exists.`);
      }
    }
    if (data.status === 'published' && !data.publishedAt) {
      data.publishedAt = new Date();
    }
    return blogRepository.create(data);
  }

  async updateBlog(id: string, data: Partial<IBlog>): Promise<IBlog> {
    if (data.slug) {
      const existing = await blogRepository.findBySlug(data.slug, false);
      if (existing && existing._id?.toString() !== id) {
        throw AppError.conflict(`A blog post with slug "${data.slug}" already exists.`);
      }
    }
    if (data.status === 'published' && !data.publishedAt) {
      data.publishedAt = new Date();
    }
    const updated = await blogRepository.update(id, data);
    if (!updated) {
      throw AppError.notFound(Messages.RESOURCE_NOT_FOUND);
    }
    return updated;
  }

  async deleteBlog(id: string): Promise<void> {
    const deleted = await blogRepository.delete(id);
    if (!deleted) {
      throw AppError.notFound(Messages.RESOURCE_NOT_FOUND);
    }
  }
}

export const blogService = new BlogService();
