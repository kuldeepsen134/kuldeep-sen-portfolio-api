import { Schema, model } from 'mongoose';

export interface ISkill {
  _id?: string;
  name: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  yearsOfExperience: number;
  icon?: string;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const SkillSchema = new Schema<ISkill>(
  {
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    level: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
      default: 'Advanced',
      required: true
    },
    yearsOfExperience: { type: Number, default: 1, min: 0 },
    icon: { type: String, trim: true },
    order: { type: Number, default: 0, index: true }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

SkillSchema.index({ category: 1, order: 1 });

export const SkillModel = model<ISkill>('Skill', SkillSchema);
