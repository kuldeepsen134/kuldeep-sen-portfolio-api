import { FilterQuery } from 'mongoose';
import { ProjectModel, IProject } from '../models/project.model';
import { PaginatedResult } from '../types';

export interface ProjectFilter {
  category?: string;
  technology?: string;
  featured?: boolean;
  status?: string;
  search?: string;
}

export class ProjectRepository {
  async findPublic(
    filter: ProjectFilter = {},
    page = 1,
    limit = 10
  ): Promise<PaginatedResult<IProject>> {
    const query: FilterQuery<IProject> = { status: 'published' };

    if (filter.category) {
      query.category = filter.category;
    }
    if (filter.technology) {
      query.technologies = filter.technology;
    }
    if (filter.featured !== undefined) {
      query.featured = filter.featured;
    }
    if (filter.search) {
      query.$or = [
        { title: { $regex: filter.search, $options: 'i' } },
        { shortDescription: { $regex: filter.search, $options: 'i' } }
      ];
    }

    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      ProjectModel.find(query)
        .sort({ featured: -1, order: 1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      ProjectModel.countDocuments(query)
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      items: items as unknown as IProject[],
      total,
      page,
      limit,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1
    };
  }

  async findBySlug(slug: string, publicOnly = true): Promise<IProject | null> {
    const query: FilterQuery<IProject> = { slug };
    if (publicOnly) {
      query.status = 'published';
    }
    return ProjectModel.findOne(query).lean<IProject>();
  }

  async findAllAdmin(page = 1, limit = 20, status?: string): Promise<PaginatedResult<IProject>> {
    const query: FilterQuery<IProject> = {};
    if (status) {
      query.status = status;
    }

    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      ProjectModel.find(query).sort({ order: 1, createdAt: -1 }).skip(skip).limit(limit).lean(),
      ProjectModel.countDocuments(query)
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      items: items as unknown as IProject[],
      total,
      page,
      limit,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1
    };
  }

  async findById(id: string): Promise<IProject | null> {
    return ProjectModel.findById(id);
  }

  async create(data: Partial<IProject>): Promise<IProject> {
    return ProjectModel.create(data);
  }

  async update(id: string, data: Partial<IProject>): Promise<IProject | null> {
    return ProjectModel.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true });
  }

  async delete(id: string): Promise<IProject | null> {
    return ProjectModel.findByIdAndDelete(id);
  }
}

export const projectRepository = new ProjectRepository();
