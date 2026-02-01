import { createClient } from '@/lib/supabase/server'
import { successResponse, ApiErrors } from '@/lib/api-response'
import { channelParamsSchema, safeParseWithError } from '@/lib/validations'

// POST /api/channels/[id]/follow - Follow a channel
export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const rawParams = await params
    
    // Validate params
    const validation = safeParseWithError(channelParamsSchema, rawParams)
    if (!validation.success) {
      return ApiErrors.validation(validation.error)
    }
    
    const { id: channelId } = validation.data
    const supabase = await createClient()
    
    // Check auth
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return ApiErrors.unauthorized()
    }

    // Check if channel exists
    const { data: channel, error: channelError } = await supabase
      .from('channels')
      .select('id')
      .eq('id', channelId)
      .single()

    if (channelError || !channel) {
      return ApiErrors.notFound('Channel')
    }

    // Check if already following
    const { data: existingFollow } = await supabase
      .from('follows')
      .select('id')
      .eq('follower_id', user.id)
      .eq('channel_id', channelId)
      .single()

    if (existingFollow) {
      return ApiErrors.badRequest('Already following this channel')
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
      return ApiErrors.internal('Failed to follow channel')
    }

    return successResponse({ following: true })
  } catch (err) {
    console.error('Follow route error:', err)
    return ApiErrors.internal()
  }
}

// DELETE /api/channels/[id]/follow - Unfollow a channel
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const rawParams = await params
    
    // Validate params
    const validation = safeParseWithError(channelParamsSchema, rawParams)
    if (!validation.success) {
      return ApiErrors.validation(validation.error)
    }
    
    const { id: channelId } = validation.data
    const supabase = await createClient()
    
    // Check auth
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return ApiErrors.unauthorized()
    }

    // Delete follow
    const { error: unfollowError } = await supabase
      .from('follows')
      .delete()
      .eq('follower_id', user.id)
      .eq('channel_id', channelId)

    if (unfollowError) {
      console.error('Unfollow error:', unfollowError)
      return ApiErrors.internal('Failed to unfollow channel')
    }

    return successResponse({ following: false })
  } catch (err) {
    console.error('Unfollow route error:', err)
    return ApiErrors.internal()
  }
}
