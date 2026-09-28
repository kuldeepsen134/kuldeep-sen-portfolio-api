import { Schema, model } from 'mongoose';

export interface IBlogAuthor {
  name: string;
  avatar?: string;
}

export interface IBlog {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  author: IBlogAuthor;
  publishedAt?: Date;
  status: 'draft' | 'published' | 'archived';
  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true, index: true },
    excerpt: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    coverImage: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true, index: true },
    tags: [{ type: String, trim: true, index: true }],
    author: {
      name: { type: String, required: true, default: 'Kuldeep Sen' },
      avatar: { type: String, trim: true }
    },
    publishedAt: { type: Date, index: true },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft',
      index: true
    },
    seoTitle: { type: String, trim: true },
    seoDescription: { type: String, trim: true },
    canonicalUrl: { type: String, trim: true }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

BlogSchema.index({ status: 1, publishedAt: -1 });

export const BlogModel = model<IBlog>('Blog', BlogSchema);
