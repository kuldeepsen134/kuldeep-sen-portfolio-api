import { Schema, model } from 'mongoose';

export interface IExperience {
  _id?: string;
  company: string;
  position: string;
  employmentType: 'Full-time' | 'Part-time' | 'Contract' | 'Freelance' | 'Internship';
  location?: string;
  isRemote: boolean;
  startDate: Date;
  endDate?: Date;
  isCurrent: boolean;
  description: string;
  responsibilities: string[];
  technologies: string[];
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const ExperienceSchema = new Schema<IExperience>(
  {
    company: { type: String, required: true, trim: true },
    position: { type: String, required: true, trim: true },
    employmentType: {
      type: String,
      enum: ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'],
      default: 'Freelance',
      required: true
    },
    location: { type: String, trim: true },
    isRemote: { type: Boolean, default: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    isCurrent: { type: Boolean, default: false },
    description: { type: String, required: true },
    responsibilities: [{ type: String, trim: true }],
    technologies: [{ type: String, trim: true }],
    order: { type: Number, default: 0, index: true }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

ExperienceSchema.index({ order: 1, startDate: -1 });

export const ExperienceModel = model<IExperience>('Experience', ExperienceSchema);
