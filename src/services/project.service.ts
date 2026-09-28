import { projectRepository, ProjectFilter } from '../repositories/project.repository';
import { IProject } from '../models/project.model';
import { PaginatedResult } from '../types';
import { AppError } from '../utils/apiError';
import { Messages } from '../constants/messages';

export class ProjectService {
  async getPublicProjects(
    filter: ProjectFilter = {},
    page = 1,
    limit = 10
  ): Promise<PaginatedResult<IProject>> {
    return projectRepository.findPublic(filter, page, limit);
  }

  async getPublicProjectBySlug(slug: string): Promise<IProject> {
    const project = await projectRepository.findBySlug(slug, true);
    if (!project) {
      throw AppError.notFound(`Project with slug "${slug}" was not found.`);
    }
    return project;
  }

  async getAdminProjects(
    page = 1,
    limit = 20,
    status?: string
  ): Promise<PaginatedResult<IProject>> {
    return projectRepository.findAllAdmin(page, limit, status);
  }

  async getProjectById(id: string): Promise<IProject> {
    const project = await projectRepository.findById(id);
    if (!project) {
      throw AppError.notFound(Messages.RESOURCE_NOT_FOUND);
    }
    return project;
  }

  async createProject(data: Partial<IProject>): Promise<IProject> {
    if (data.slug) {
      const existing = await projectRepository.findBySlug(data.slug, false);
      if (existing) {
        throw AppError.conflict(`A project with slug "${data.slug}" already exists.`);
      }
    }
    return projectRepository.create(data);
  }

  async updateProject(id: string, data: Partial<IProject>): Promise<IProject> {
    if (data.slug) {
      const existing = await projectRepository.findBySlug(data.slug, false);
      if (existing && existing._id?.toString() !== id) {
        throw AppError.conflict(`A project with slug "${data.slug}" already exists.`);
      }
    }
    const updated = await projectRepository.update(id, data);
    if (!updated) {
      throw AppError.notFound(Messages.RESOURCE_NOT_FOUND);
    }
    return updated;
  }

  async deleteProject(id: string): Promise<void> {
    const deleted = await projectRepository.delete(id);
    if (!deleted) {
      throw AppError.notFound(Messages.RESOURCE_NOT_FOUND);
    }
  }
}

export const projectService = new ProjectService();
