import { createClient } from '@/lib/supabase/server'
import { createUploadUrl } from '@/lib/mux'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const supabase = await createClient()
    
    // Check auth
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { channelId, title, description } = body

    if (!channelId || !title) {
      return NextResponse.json(
        { error: 'Channel ID and title are required' },
        { status: 400 }
      )
    }

    // Verify user owns this channel
    const { data: channel, error: channelError } = await supabase
      .from('channels')
      .select('id, owner_id')
      .eq('id', channelId)
      .single()

    if (channelError || !channel) {
      return NextResponse.json({ error: 'Channel not found' }, { status: 404 })
    }

    if (channel.owner_id !== user.id) {
      return NextResponse.json({ error: 'Not your channel' }, { status: 403 })
    }

    // Create the video record first
    const { data: video, error: videoError } = await supabase
      .from('videos')
      .insert({
        channel_id: channelId,
        owner_id: user.id,
        title,
        description,
        status: 'uploading',
      })
      .select()
      .single()

    if (videoError) {
      console.error('Video insert error:', videoError)
      return NextResponse.json({ error: 'Failed to create video' }, { status: 500 })
    }

    // Create Mux upload URL
    const { uploadId, uploadUrl } = await createUploadUrl()

    // Store upload ID for reference
    await supabase
      .from('videos')
      .update({ mux_asset_id: uploadId }) // Temporarily store upload ID
      .eq('id', video.id)

    return NextResponse.json({
      videoId: video.id,
      uploadUrl,
      uploadId,
    })
  } catch (err) {
    console.error('Upload route error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
