import { z } from 'zod';

export const createTestimonialSchema = z.object({
  body: z.object({
    clientName: z.string().min(2, 'Client name is required'),
    designation: z.string().min(2, 'Designation is required'),
    company: z.string().min(2, 'Company is required'),
    message: z.string().min(10, 'Message is required'),
    avatar: z.string().url('Avatar must be a valid URL').optional().or(z.literal('')),
    rating: z.number().min(1).max(5).default(5),
    featured: z.boolean().default(false),
    status: z.enum(['pending', 'approved', 'rejected']).default('approved')
  })
});

export const updateTestimonialSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ID format')
  }),
  body: createTestimonialSchema.shape.body.partial()
});

export type CreateTestimonialInput = z.infer<typeof createTestimonialSchema>['body'];
export type UpdateTestimonialInput = z.infer<typeof updateTestimonialSchema>['body'];
