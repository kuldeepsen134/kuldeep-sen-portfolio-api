import { z } from 'zod';

export const createExperienceSchema = z.object({
  body: z.object({
    company: z.string().min(2, 'Company name is required'),
    position: z.string().min(2, 'Position is required'),
    employmentType: z
      .enum(['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'])
      .default('Freelance'),
    location: z.string().optional(),
    isRemote: z.boolean().default(true),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    isCurrent: z.boolean().default(false),
    description: z.string().min(10, 'Description is required'),
    responsibilities: z.array(z.string()).default([]),
    technologies: z.array(z.string()).default([]),
    order: z.number().int().default(0)
  })
});

export const updateExperienceSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ID format')
  }),
  body: createExperienceSchema.shape.body.partial()
});

export type CreateExperienceInput = z.infer<typeof createExperienceSchema>['body'];
export type UpdateExperienceInput = z.infer<typeof updateExperienceSchema>['body'];
