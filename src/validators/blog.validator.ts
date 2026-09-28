import { z } from 'zod';

export const createBlogSchema = z.object({
  body: z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    slug: z
      .string()
      .min(3, 'Slug must be at least 3 characters')
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be URL-safe'),
    excerpt: z.string().min(10, 'Excerpt must be at least 10 characters'),
    content: z.string().min(20, 'Content must be at least 20 characters'),
    coverImage: z.string().url('Cover image must be a valid URL'),
    category: z.string().min(1, 'Category is required'),
    tags: z.array(z.string()).default([]),
    author: z
      .object({
        name: z.string().default('Kuldeep Sen'),
        avatar: z.string().url().optional().or(z.literal(''))
      })
      .default({ name: 'Kuldeep Sen' }),
    publishedAt: z.coerce.date().optional(),
    status: z.enum(['draft', 'published', 'archived']).default('draft'),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    canonicalUrl: z.string().url().optional().or(z.literal(''))
  })
});

export const updateBlogSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ID format')
  }),
  body: createBlogSchema.shape.body.partial()
});

export const queryBlogSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(10),
    category: z.string().optional(),
    tag: z.string().optional(),
    search: z.string().optional(),
    status: z.enum(['draft', 'published', 'archived']).optional()
  })
});

export const blogSlugSchema = z.object({
  params: z.object({
    slug: z.string().min(1, 'Slug is required')
  })
});

export type CreateBlogInput = z.infer<typeof createBlogSchema>['body'];
export type UpdateBlogInput = z.infer<typeof updateBlogSchema>['body'];
