import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// Enable edge runtime for faster response
export const runtime = 'edge'

// Revalidate every 60 seconds for ISR-like behavior
export const revalidate = 60

// GET /api/channels - List channels (with optional filters)
export async function GET(req: Request) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(req.url)
    
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const userId = searchParams.get('user')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')

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

    if (userId) {
      query = query.eq('owner_id', userId)
    }

    const { data, error } = await query

    if (error) {
      console.error('Channels query error:', error)
      return NextResponse.json({ error: 'Failed to fetch channels' }, { status: 500 })
    }

    // Add cache headers for better performance
    return NextResponse.json(
      { channels: data },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        },
      }
    )
  } catch (err) {
    console.error('Channels route error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/channels - Create a new channel
export async function POST(req: Request) {
  try {
    const supabase = await createClient()
    
    // Check auth
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { name, description, category } = body

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }

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
      return NextResponse.json({ error: 'Failed to create channel' }, { status: 500 })
    }

    return NextResponse.json({ channel }, { status: 201 })
  } catch (err) {
    console.error('Channels route error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
