import { Schema, model } from 'mongoose';

export interface ISocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  leetcode?: string;
  devto?: string;
  youtube?: string;
  medium?: string;
}

export interface IProfileSeo {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  ogImage?: string;
}

export interface IProfile {
  _id?: string;
  name: string;
  headline: string;
  shortBio: string;
  longBio: string;
  profileImage: string;
  resumeUrl: string;
  location: string;
  availability: 'available' | 'busy' | 'unavailable' | 'contract_only';
  socialLinks: ISocialLinks;
  email: string;
  phone?: string;
  seo?: IProfileSeo;
  createdAt?: Date;
  updatedAt?: Date;
}

const ProfileSchema = new Schema<IProfile>(
  {
    name: { type: String, required: true, trim: true },
    headline: { type: String, required: true, trim: true },
    shortBio: { type: String, required: true, trim: true },
    longBio: { type: String, required: true, trim: true },
    profileImage: { type: String, required: true, trim: true },
    resumeUrl: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    availability: {
      type: String,
      enum: ['available', 'busy', 'unavailable', 'contract_only'],
      default: 'available',
      required: true
    },
    socialLinks: {
      github: { type: String, trim: true },
      linkedin: { type: String, trim: true },
      twitter: { type: String, trim: true },
      leetcode: { type: String, trim: true },
      devto: { type: String, trim: true },
      youtube: { type: String, trim: true },
      medium: { type: String, trim: true }
    },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
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

export const ProfileModel = model<IProfile>('Profile', ProfileSchema);
