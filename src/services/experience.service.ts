import { experienceRepository } from '../repositories/experience.repository';
import { IExperience } from '../models/experience.model';
import { AppError } from '../utils/apiError';
import { Messages } from '../constants/messages';

export class ExperienceService {
  async getPublicExperience(): Promise<IExperience[]> {
    return experienceRepository.findPublic();
  }

  async getAdminExperience(): Promise<IExperience[]> {
    return experienceRepository.findAllAdmin();
  }

  async getExperienceById(id: string): Promise<IExperience> {
    const exp = await experienceRepository.findById(id);
    if (!exp) {
      throw AppError.notFound(Messages.RESOURCE_NOT_FOUND);
    }
    return exp;
  }

  async createExperience(data: Partial<IExperience>): Promise<IExperience> {
    return experienceRepository.create(data);
  }

  async updateExperience(id: string, data: Partial<IExperience>): Promise<IExperience> {
    const updated = await experienceRepository.update(id, data);
    if (!updated) {
      throw AppError.notFound(Messages.RESOURCE_NOT_FOUND);
    }
    return updated;
  }

  async deleteExperience(id: string): Promise<void> {
    const deleted = await experienceRepository.delete(id);
    if (!deleted) {
      throw AppError.notFound(Messages.RESOURCE_NOT_FOUND);
    }
  }
}

export const experienceService = new ExperienceService();
