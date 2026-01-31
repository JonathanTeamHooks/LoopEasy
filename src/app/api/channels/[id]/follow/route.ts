import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// POST /api/channels/[id]/follow - Follow a channel
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: channelId } = await params
    const supabase = await createClient()
    
    // Check auth
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if channel exists
    const { data: channel, error: channelError } = await supabase
      .from('channels')
      .select('id')
      .eq('id', channelId)
      .single()

    if (channelError || !channel) {
      return NextResponse.json({ error: 'Channel not found' }, { status: 404 })
    }

    // Check if already following
    const { data: existingFollow } = await supabase
      .from('follows')
      .select('id')
      .eq('follower_id', user.id)
      .eq('channel_id', channelId)
      .single()

    if (existingFollow) {
      return NextResponse.json({ error: 'Already following' }, { status: 400 })
    }

    // Create follow
    const { error: followError } = await supabase
      .from('follows')
      .insert({
        follower_id: user.id,
        channel_id: channelId,
      })

    if (followError) {
      console.error('Follow error:', followError)
      return NextResponse.json({ error: 'Failed to follow' }, { status: 500 })
    }

    return NextResponse.json({ success: true, following: true })
  } catch (err) {
    console.error('Follow route error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/channels/[id]/follow - Unfollow a channel
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: channelId } = await params
    const supabase = await createClient()
    
    // Check auth
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Delete follow
    const { error: unfollowError } = await supabase
      .from('follows')
      .delete()
      .eq('follower_id', user.id)
      .eq('channel_id', channelId)

    if (unfollowError) {
      console.error('Unfollow error:', unfollowError)
      return NextResponse.json({ error: 'Failed to unfollow' }, { status: 500 })
    }

    return NextResponse.json({ success: true, following: false })
  } catch (err) {
    console.error('Unfollow route error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
