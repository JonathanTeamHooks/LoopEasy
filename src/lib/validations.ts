import { z } from 'zod'

/**
 * Shared Zod schemas for route parameter and request validation
 */

// UUID validation schema
export const uuidSchema = z.string().uuid('Invalid UUID format')

// Slug validation schema (alphanumeric with dashes)
export const slugSchema = z.string().regex(
  /^[a-z0-9]+(?:-[a-z0-9]+)*$/i,
  'Invalid slug format'
)

// Channel ID can be UUID or slug
export const channelIdSchema = z.string().refine(
  (val) => {
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(val)
    const isSlug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/i.test(val)
    return isUUID || isSlug
  },
  { message: 'Must be a valid UUID or slug' }
)

// Common route param schemas
export const channelParamsSchema = z.object({
  id: channelIdSchema,
})

export const videoParamsSchema = z.object({
  id: uuidSchema,
})

export const playlistParamsSchema = z.object({
  id: uuidSchema,
})

// Email validation
export const emailSchema = z.string().email().max(255)

// Pagination params
export const paginationSchema = z.object({
  limit: z.coerce.number().int().positive().max(100).default(20),
  offset: z.coerce.number().int().nonnegative().default(0),
})

// Channel creation/update
export const channelInputSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  description: z.string().max(1000).optional(),
  category: z.string().max(50).optional(),
})

// Video upload input
export const videoUploadSchema = z.object({
  channelId: uuidSchema,
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().max(5000).optional(),
})

// Feedback input
export const feedbackSchema = z.object({
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
  pageUrl: z.string().url().max(255).optional(),
})

// Waitlist input  
export const waitlistSchema = z.object({
  email: emailSchema,
  source: z.string().max(50).optional().default('homepage'),
})

/**
 * Safe parse helper that returns formatted error messages
 */
export function safeParseWithError<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; error: string } {
  const result = schema.safeParse(data)
  
  if (result.success) {
    return { success: true, data: result.data }
  }
  
  // Format the first error message - Zod v4 uses .issues instead of .errors
  const issues = result.error.issues || []
  if (issues.length === 0) {
    return { success: false, error: 'Validation failed' }
  }
  
  const firstIssue = issues[0]
  const path = firstIssue.path.length > 0 ? `${firstIssue.path.join('.')}: ` : ''
  return { success: false, error: `${path}${firstIssue.message}` }
}
