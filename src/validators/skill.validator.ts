import { z } from 'zod';

export const createSkillSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Skill name is required'),
    category: z.string().min(1, 'Category is required'),
    level: z.enum(['Beginner', 'Intermediate', 'Advanced', 'Expert']).default('Advanced'),
    yearsOfExperience: z.number().min(0).default(1),
    icon: z.string().optional(),
    order: z.number().int().default(0)
  })
});

export const updateSkillSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ID format')
  }),
  body: createSkillSchema.shape.body.partial()
});

export type CreateSkillInput = z.infer<typeof createSkillSchema>['body'];
export type UpdateSkillInput = z.infer<typeof updateSkillSchema>['body'];
