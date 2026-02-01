import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { successResponse, ApiErrors } from '@/lib/api-response'
import { channelInputSchema, safeParseWithError } from '@/lib/validations'
import { z } from 'zod'

// Enable edge runtime for faster response
export const runtime = 'edge'

// Revalidate every 60 seconds for ISR-like behavior
export const revalidate = 60

// GET query params schema
const getQuerySchema = z.object({
  category: z.string().optional(),
  search: z.string().optional(),
  user: z.string().uuid().optional(),
  limit: z.coerce.number().int().positive().max(100).default(20),
  offset: z.coerce.number().int().nonnegative().default(0),
})

// GET /api/channels - List channels (with optional filters)
export async function GET(req: Request) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(req.url)
    
    // Parse and validate query params
    const queryValidation = safeParseWithError(getQuerySchema, {
      category: searchParams.get('category') || undefined,
      search: searchParams.get('search') || undefined,
      user: searchParams.get('user') || undefined,
      limit: searchParams.get('limit') || 20,
      offset: searchParams.get('offset') || 0,
    })
    
    if (!queryValidation.success) {
      return ApiErrors.validation(queryValidation.error)
    }
    
    const { category, search, user, limit, offset } = queryValidation.data

    let query = supabase
      .from('channels')
      .select(`
        *,
        owner:profiles!owner_id(id, username, display_name, avatar_url)
      `)
      .eq('is_public', true)
      .order('follower_count', { ascending: false })
      .range(offset, offset + limit - 1)

    if (category) {
      query = query.eq('category', category)
    }

    if (search) {
      query = query.ilike('name', `%${search}%`)
    }

    if (user) {
      query = query.eq('owner_id', user)
    }

    const { data, error } = await query

    if (error) {
      console.error('Channels query error:', error)
      return ApiErrors.internal('Failed to fetch channels')
    }

    // Add cache headers for better performance
    return NextResponse.json(
      { success: true, data: { channels: data } },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        },
      }
    )
  } catch (err) {
    console.error('Channels route error:', err)
    return ApiErrors.internal()
  }
}

// POST /api/channels - Create a new channel
export async function POST(req: Request) {
  try {
    const supabase = await createClient()
    
    // Check auth
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return ApiErrors.unauthorized()
    }

    const body = await req.json()
    
    // Validate input
    const validation = safeParseWithError(channelInputSchema, body)
    if (!validation.success) {
      return ApiErrors.validation(validation.error)
    }
    
    const { name, description, category } = validation.data

    // Generate slug from name
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      + '-' + Date.now().toString(36)

    const { data: channel, error } = await supabase
      .from('channels')
      .insert({
        owner_id: user.id,
        name,
        slug,
        description,
        category,
      })
      .select()
      .single()

    if (error) {
      console.error('Channel insert error:', error)
      return ApiErrors.internal('Failed to create channel')
    }

    return successResponse({ channel }, 201)
  } catch (err) {
    console.error('Channels route error:', err)
    return ApiErrors.internal()
  }
}
