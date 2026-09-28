import { Schema, model } from 'mongoose';

export interface ITestimonial {
  _id?: string;
  clientName: string;
  designation: string;
  company: string;
  message: string;
  avatar?: string;
  rating?: number;
  featured: boolean;
  status: 'pending' | 'approved' | 'rejected';
  createdAt?: Date;
  updatedAt?: Date;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    clientName: { type: String, required: true, trim: true },
    designation: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    message: { type: String, required: true },
    avatar: { type: String, trim: true },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    featured: { type: Boolean, default: false, index: true },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'approved',
      index: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

TestimonialSchema.index({ status: 1, featured: 1, createdAt: -1 });

export const TestimonialModel = model<ITestimonial>('Testimonial', TestimonialSchema);
