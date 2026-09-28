import { serviceRepository } from '../repositories/service.repository';
import { IService } from '../models/service.model';
import { AppError } from '../utils/apiError';
import { Messages } from '../constants/messages';

export class ServiceService {
  async getPublicServices(): Promise<IService[]> {
    return serviceRepository.findPublic();
  }

  async getAdminServices(): Promise<IService[]> {
    return serviceRepository.findAllAdmin();
  }

  async getServiceById(id: string): Promise<IService> {
    const service = await serviceRepository.findById(id);
    if (!service) {
      throw AppError.notFound(Messages.RESOURCE_NOT_FOUND);
    }
    return service;
  }

  async createService(data: Partial<IService>): Promise<IService> {
    if (data.slug) {
      const existing = await serviceRepository.findBySlug(data.slug);
      if (existing) {
        throw AppError.conflict(`A service with slug "${data.slug}" already exists.`);
      }
    }
    return serviceRepository.create(data);
  }

  async updateService(id: string, data: Partial<IService>): Promise<IService> {
    if (data.slug) {
      const existing = await serviceRepository.findBySlug(data.slug);
      if (existing && existing._id?.toString() !== id) {
        throw AppError.conflict(`A service with slug "${data.slug}" already exists.`);
      }
    }
    const updated = await serviceRepository.update(id, data);
    if (!updated) {
      throw AppError.notFound(Messages.RESOURCE_NOT_FOUND);
    }
    return updated;
  }

  async deleteService(id: string): Promise<void> {
    const deleted = await serviceRepository.delete(id);
    if (!deleted) {
      throw AppError.notFound(Messages.RESOURCE_NOT_FOUND);
    }
  }
}

export const serviceService = new ServiceService();
