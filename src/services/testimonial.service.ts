import { testimonialRepository } from '../repositories/testimonial.repository';
import { ITestimonial } from '../models/testimonial.model';
import { AppError } from '../utils/apiError';
import { Messages } from '../constants/messages';

export class TestimonialService {
  async getPublicTestimonials(featuredOnly = false): Promise<ITestimonial[]> {
    return testimonialRepository.findPublic(featuredOnly);
  }

  async getAdminTestimonials(): Promise<ITestimonial[]> {
    return testimonialRepository.findAllAdmin();
  }

  async getTestimonialById(id: string): Promise<ITestimonial> {
    const testimonial = await testimonialRepository.findById(id);
    if (!testimonial) {
      throw AppError.notFound(Messages.RESOURCE_NOT_FOUND);
    }
    return testimonial;
  }

  async createTestimonial(data: Partial<ITestimonial>): Promise<ITestimonial> {
    return testimonialRepository.create(data);
  }

  async updateTestimonial(id: string, data: Partial<ITestimonial>): Promise<ITestimonial> {
    const updated = await testimonialRepository.update(id, data);
    if (!updated) {
      throw AppError.notFound(Messages.RESOURCE_NOT_FOUND);
    }
    return updated;
  }

  async deleteTestimonial(id: string): Promise<void> {
    const deleted = await testimonialRepository.delete(id);
    if (!deleted) {
      throw AppError.notFound(Messages.RESOURCE_NOT_FOUND);
    }
  }
}

export const testimonialService = new TestimonialService();
