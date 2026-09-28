import { SkillModel, ISkill } from '../models/skill.model';

export class SkillRepository {
  async findPublic(category?: string): Promise<ISkill[]> {
    const query = category ? { category } : {};
    return SkillModel.find(query).sort({ category: 1, order: 1, name: 1 }).lean<ISkill[]>();
  }

  async findAllAdmin(): Promise<ISkill[]> {
    return SkillModel.find().sort({ category: 1, order: 1, name: 1 }).lean<ISkill[]>();
  }

  async findById(id: string): Promise<ISkill | null> {
    return SkillModel.findById(id);
  }

  async create(data: Partial<ISkill>): Promise<ISkill> {
    return SkillModel.create(data);
  }

  async update(id: string, data: Partial<ISkill>): Promise<ISkill | null> {
    return SkillModel.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true });
  }

  async delete(id: string): Promise<ISkill | null> {
    return SkillModel.findByIdAndDelete(id);
  }
}

export const skillRepository = new SkillRepository();
