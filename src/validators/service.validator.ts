import { z } from 'zod';

export const createServiceSchema = z.object({
  body: z.object({
    title: z.string().min(2, 'Title must be at least 2 characters'),
    slug: z
      .string()
      .min(2, 'Slug must be at least 2 characters')
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be URL-safe'),
    shortDescription: z.string().min(10, 'Short description is required'),
    description: z.string().min(20, 'Description is required'),
    icon: z.string().min(1, 'Icon name or URL is required'),
    technologies: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    order: z.number().int().default(0),
    status: z.enum(['active', 'inactive']).default('active')
  })
});

export const updateServiceSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ID format')
  }),
  body: createServiceSchema.shape.body.partial()
});

export type CreateServiceInput = z.infer<typeof createServiceSchema>['body'];
export type UpdateServiceInput = z.infer<typeof updateServiceSchema>['body'];
