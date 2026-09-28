import { z } from 'zod';

export const createProjectSchema = z.object({
  body: z.object({
    title: z.string().min(2, 'Title must be at least 2 characters'),
    slug: z
      .string()
      .min(2, 'Slug must be at least 2 characters')
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be URL-safe (lowercase letters, numbers, hyphens)'),
    shortDescription: z.string().min(10, 'Short description must be at least 10 characters'),
    description: z.string().min(20, 'Full description must be at least 20 characters'),
    thumbnail: z.string().url('Thumbnail must be a valid URL'),
    images: z.array(z.string().url('Image must be a valid URL')).default([]),
    technologies: z.array(z.string().min(1)).min(1, 'At least one technology is required'),
    category: z.string().min(1, 'Category is required'),
    clientType: z.string().optional(),
    liveUrl: z.string().url().optional().or(z.literal('')),
    githubUrl: z.string().url().optional().or(z.literal('')),
    featured: z.boolean().default(false),
    order: z.number().int().default(0),
    status: z.enum(['draft', 'published', 'archived']).default('published'),
    seo: z
      .object({
        metaTitle: z.string().optional(),
        metaDescription: z.string().optional(),
        keywords: z.array(z.string()).optional(),
        ogImage: z.string().url().optional().or(z.literal(''))
      })
      .optional()
  })
});

export const updateProjectSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ID format')
  }),
  body: createProjectSchema.shape.body.partial()
});

export const queryProjectSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(10),
    category: z.string().optional(),
    technology: z.string().optional(),
    featured: z
      .string()
      .optional()
      .transform(val => (val === 'true' ? true : val === 'false' ? false : undefined)),
    status: z.enum(['draft', 'published', 'archived']).optional(),
    search: z.string().optional()
  })
});

export const projectSlugSchema = z.object({
  params: z.object({
    slug: z.string().min(1, 'Slug is required')
  })
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>['body'];
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>['body'];
