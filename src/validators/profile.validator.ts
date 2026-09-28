import { z } from 'zod';

export const upsertProfileSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    headline: z.string().min(5, 'Headline must be at least 5 characters'),
    shortBio: z.string().min(10, 'Short bio must be at least 10 characters'),
    longBio: z.string().min(20, 'Long bio must be at least 20 characters'),
    profileImage: z.string().url('Profile image must be a valid URL'),
    resumeUrl: z.string().url('Resume URL must be a valid URL'),
    location: z.string().min(2, 'Location is required'),
    availability: z.enum(['available', 'busy', 'unavailable', 'contract_only']),
    socialLinks: z
      .object({
        github: z.string().url().optional().or(z.literal('')),
        linkedin: z.string().url().optional().or(z.literal('')),
        twitter: z.string().url().optional().or(z.literal('')),
        leetcode: z.string().url().optional().or(z.literal('')),
        devto: z.string().url().optional().or(z.literal('')),
        youtube: z.string().url().optional().or(z.literal('')),
        medium: z.string().url().optional().or(z.literal(''))
      })
      .default({}),
    email: z.string().email('Valid email is required'),
    phone: z.string().optional(),
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

export type UpsertProfileInput = z.infer<typeof upsertProfileSchema>['body'];
