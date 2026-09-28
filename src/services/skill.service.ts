import { skillRepository } from '../repositories/skill.repository';
import { ISkill } from '../models/skill.model';
import { AppError } from '../utils/apiError';
import { Messages } from '../constants/messages';

export class SkillService {
  async getPublicSkills(category?: string): Promise<ISkill[]> {
    return skillRepository.findPublic(category);
  }

  async getAdminSkills(): Promise<ISkill[]> {
    return skillRepository.findAllAdmin();
  }

  async getSkillById(id: string): Promise<ISkill> {
    const skill = await skillRepository.findById(id);
    if (!skill) {
      throw AppError.notFound(Messages.RESOURCE_NOT_FOUND);
    }
    return skill;
  }

  async createSkill(data: Partial<ISkill>): Promise<ISkill> {
    return skillRepository.create(data);
  }

  async updateSkill(id: string, data: Partial<ISkill>): Promise<ISkill> {
    const updated = await skillRepository.update(id, data);
    if (!updated) {
      throw AppError.notFound(Messages.RESOURCE_NOT_FOUND);
    }
    return updated;
  }

  async deleteSkill(id: string): Promise<void> {
    const deleted = await skillRepository.delete(id);
    if (!deleted) {
      throw AppError.notFound(Messages.RESOURCE_NOT_FOUND);
    }
  }
}

export const skillService = new SkillService();
