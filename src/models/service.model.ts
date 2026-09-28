import { Schema, model } from 'mongoose';

export interface IService {
  _id?: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  icon: string;
  technologies: string[];
  featured: boolean;
  order: number;
  status: 'active' | 'inactive';
  createdAt?: Date;
  updatedAt?: Date;
}

const ServiceSchema = new Schema<IService>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true, index: true },
    shortDescription: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    icon: { type: String, required: true, trim: true },
    technologies: [{ type: String, trim: true }],
    featured: { type: Boolean, default: false, index: true },
    order: { type: Number, default: 0, index: true },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
      index: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

ServiceSchema.index({ status: 1, order: 1 });

export const ServiceModel = model<IService>('Service', ServiceSchema);
