import { createClient } from '@/lib/supabase/server'
import { createUploadUrl } from '@/lib/mux'
import { successResponse, ApiErrors } from '@/lib/api-response'
import { videoUploadSchema, safeParseWithError } from '@/lib/validations'

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
    const validation = safeParseWithError(videoUploadSchema, body)
    if (!validation.success) {
      return ApiErrors.validation(validation.error)
    }
    
    const { channelId, title, description } = validation.data

    // Verify user owns this channel
    const { data: channel, error: channelError } = await supabase
      .from('channels')
      .select('id, owner_id')
      .eq('id', channelId)
      .single()

    if (channelError || !channel) {
      return ApiErrors.notFound('Channel')
    }

    if (channel.owner_id !== user.id) {
      return ApiErrors.forbidden()
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
      return ApiErrors.internal('Failed to create video')
    }

    // Create Mux upload URL
    const { uploadId, uploadUrl } = await createUploadUrl()

    // Store upload ID for reference
    await supabase
      .from('videos')
      .update({ mux_asset_id: uploadId }) // Temporarily store upload ID
      .eq('id', video.id)

    return successResponse({
      videoId: video.id,
      uploadUrl,
      uploadId,
    })
  } catch (err) {
    console.error('Upload route error:', err)
    return ApiErrors.internal()
  }
}
