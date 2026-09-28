import { Schema, model } from 'mongoose';

export interface IContact {
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  source: string;
  status: 'unread' | 'read' | 'replied' | 'archived';
  ipAddress?: string;
  userAgent?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const ContactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true, index: true },
    phone: { type: String, trim: true },
    subject: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    source: { type: String, default: 'portfolio_contact_form', trim: true },
    status: {
      type: String,
      enum: ['unread', 'read', 'replied', 'archived'],
      default: 'unread',
      index: true
    },
    ipAddress: { type: String },
    userAgent: { type: String }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

ContactSchema.index({ status: 1, createdAt: -1 });

export const ContactModel = model<IContact>('Contact', ContactSchema);
