import { FilterQuery } from 'mongoose';
import { BlogModel, IBlog } from '../models/blog.model';
import { PaginatedResult } from '../types';

export interface BlogFilter {
  category?: string;
  tag?: string;
  search?: string;
}

export class BlogRepository {
  async findPublic(
    filter: BlogFilter = {},
    page = 1,
    limit = 10
  ): Promise<PaginatedResult<IBlog>> {
    const query: FilterQuery<IBlog> = { status: 'published' };

    if (filter.category) {
      query.category = filter.category;
    }
    if (filter.tag) {
      query.tags = filter.tag;
    }
    if (filter.search) {
      query.$or = [
        { title: { $regex: filter.search, $options: 'i' } },
        { excerpt: { $regex: filter.search, $options: 'i' } }
      ];
    }

    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      BlogModel.find(query)
        .select('-content') // exclude heavy markdown/html body for blog list
        .sort({ publishedAt: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      BlogModel.countDocuments(query)
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      items: items as unknown as IBlog[],
      total,
      page,
      limit,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1
    };
  }

  async findBySlug(slug: string, publicOnly = true): Promise<IBlog | null> {
    const query: FilterQuery<IBlog> = { slug };
    if (publicOnly) {
      query.status = 'published';
    }
    return BlogModel.findOne(query).lean<IBlog>();
  }

  async findAllAdmin(page = 1, limit = 20, status?: string): Promise<PaginatedResult<IBlog>> {
    const query: FilterQuery<IBlog> = {};
    if (status) {
      query.status = status;
    }

    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      BlogModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      BlogModel.countDocuments(query)
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      items: items as unknown as IBlog[],
      total,
      page,
      limit,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1
    };
  }

  async findById(id: string): Promise<IBlog | null> {
    return BlogModel.findById(id);
  }

  async create(data: Partial<IBlog>): Promise<IBlog> {
    return BlogModel.create(data);
  }

  async update(id: string, data: Partial<IBlog>): Promise<IBlog | null> {
    return BlogModel.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true });
  }

  async delete(id: string): Promise<IBlog | null> {
    return BlogModel.findByIdAndDelete(id);
  }
}

export const blogRepository = new BlogRepository();
