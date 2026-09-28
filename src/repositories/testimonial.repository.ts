import { FilterQuery } from 'mongoose';
import { TestimonialModel, ITestimonial } from '../models/testimonial.model';

export class TestimonialRepository {
  async findPublic(featuredOnly = false): Promise<ITestimonial[]> {
    const query: FilterQuery<ITestimonial> = { status: 'approved' };
    if (featuredOnly) {
      query.featured = true;
    }
    return TestimonialModel.find(query).sort({ featured: -1, createdAt: -1 }).lean<ITestimonial[]>();
  }

  async findAllAdmin(): Promise<ITestimonial[]> {
    return TestimonialModel.find().sort({ createdAt: -1 }).lean<ITestimonial[]>();
  }

  async findById(id: string): Promise<ITestimonial | null> {
    return TestimonialModel.findById(id);
  }

  async create(data: Partial<ITestimonial>): Promise<ITestimonial> {
    return TestimonialModel.create(data);
  }

  async update(id: string, data: Partial<ITestimonial>): Promise<ITestimonial | null> {
    return TestimonialModel.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true });
  }

  async delete(id: string): Promise<ITestimonial | null> {
    return TestimonialModel.findByIdAndDelete(id);
  }
}

export const testimonialRepository = new TestimonialRepository();
