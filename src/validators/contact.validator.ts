import { z } from 'zod';

export const createContactSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(100),
    email: z.string().email('Please provide a valid email address'),
    phone: z.string().max(20).optional(),
    subject: z.string().min(3, 'Subject must be at least 3 characters').max(150),
    message: z.string().min(10, 'Message must be at least 10 characters').max(3000),
    source: z.string().max(50).default('portfolio_contact_form'),
    // Honeypot field for bot spam prevention. Legitimate humans will leave this empty.
    website: z.string().max(0, 'Spam detected').optional().or(z.literal(''))
  })
});

export const updateContactStatusSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ID format')
  }),
  body: z.object({
    status: z.enum(['unread', 'read', 'replied', 'archived'])
  })
});

export const queryContactSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(20),
    status: z.enum(['unread', 'read', 'replied', 'archived']).optional()
  })
});

export type CreateContactInput = z.infer<typeof createContactSchema>['body'];
