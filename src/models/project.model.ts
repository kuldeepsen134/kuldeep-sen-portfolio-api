import { Schema, model } from 'mongoose';

export interface IProjectSeo {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  ogImage?: string;
}

export interface IProject {
  _id?: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  thumbnail: string;
  images: string[];
  technologies: string[];
  category: string;
  clientType?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  order: number;
  status: 'draft' | 'published' | 'archived';
  seo?: IProjectSeo;
  createdAt?: Date;
  updatedAt?: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true, index: true },
    shortDescription: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    thumbnail: { type: String, required: true, trim: true },
    images: [{ type: String, trim: true }],
    technologies: [{ type: String, required: true, trim: true, index: true }],
    category: { type: String, required: true, trim: true, index: true },
    clientType: { type: String, trim: true },
    liveUrl: { type: String, trim: true },
    githubUrl: { type: String, trim: true },
    featured: { type: Boolean, default: false, index: true },
    order: { type: Number, default: 0, index: true },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'published',
      index: true
    },
    seo: {
      metaTitle: { type: String, trim: true },
      metaDescription: { type: String, trim: true },
      keywords: [{ type: String, trim: true }],
      ogImage: { type: String, trim: true }
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

ProjectSchema.index({ status: 1, featured: 1, order: 1 });

export const ProjectModel = model<IProject>('Project', ProjectSchema);
