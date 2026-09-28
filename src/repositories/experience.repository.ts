import { ExperienceModel, IExperience } from '../models/experience.model';

export class ExperienceRepository {
  async findPublic(): Promise<IExperience[]> {
    return ExperienceModel.find().sort({ order: 1, startDate: -1 }).lean<IExperience[]>();
  }

  async findAllAdmin(): Promise<IExperience[]> {
    return ExperienceModel.find().sort({ order: 1, startDate: -1 }).lean<IExperience[]>();
  }

  async findById(id: string): Promise<IExperience | null> {
    return ExperienceModel.findById(id);
  }

  async create(data: Partial<IExperience>): Promise<IExperience> {
    return ExperienceModel.create(data);
  }

  async update(id: string, data: Partial<IExperience>): Promise<IExperience | null> {
    return ExperienceModel.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true });
  }

  async delete(id: string): Promise<IExperience | null> {
    return ExperienceModel.findByIdAndDelete(id);
  }
}

export const experienceRepository = new ExperienceRepository();
