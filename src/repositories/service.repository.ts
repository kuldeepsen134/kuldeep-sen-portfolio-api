import { ServiceModel, IService } from '../models/service.model';

export class ServiceRepository {
  async findPublic(): Promise<IService[]> {
    return ServiceModel.find({ status: 'active' }).sort({ order: 1, createdAt: 1 }).lean<IService[]>();
  }

  async findAllAdmin(): Promise<IService[]> {
    return ServiceModel.find().sort({ order: 1, createdAt: 1 }).lean<IService[]>();
  }

  async findById(id: string): Promise<IService | null> {
    return ServiceModel.findById(id);
  }

  async findBySlug(slug: string): Promise<IService | null> {
    return ServiceModel.findOne({ slug }).lean<IService>();
  }

  async create(data: Partial<IService>): Promise<IService> {
    return ServiceModel.create(data);
  }

  async update(id: string, data: Partial<IService>): Promise<IService | null> {
    return ServiceModel.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true });
  }

  async delete(id: string): Promise<IService | null> {
    return ServiceModel.findByIdAndDelete(id);
  }
}

export const serviceRepository = new ServiceRepository();
