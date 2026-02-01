import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { getThumbnailUrl } from '@/lib/mux'
import { getSupabaseAdmin } from '@/lib/supabase/admin'

// Verify Mux webhook signature
function verifyWebhookSignature(body: string, signature: string): boolean {
  const secret = process.env.MUX_WEBHOOK_SECRET!
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex')
  
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  )
}

export async function POST(req: Request) {
  const body = await req.text()
  const headersList = await headers()
  const signature = headersList.get('mux-signature') as string

  // Verify signature in production (REQUIRED)
  if (process.env.NODE_ENV === 'production') {
    if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 401 })
    }
    if (!process.env.MUX_WEBHOOK_SECRET) {
      console.error('MUX_WEBHOOK_SECRET not configured')
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }
    const isValid = verifyWebhookSignature(body, signature)
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }
  }

  const event = JSON.parse(body)
  const { type, data } = event

  try {
    switch (type) {
      case 'video.upload.asset_created': {
        // Upload completed, asset created
        await handleUploadComplete(data)
        break
      }

      case 'video.asset.ready': {
        // Asset is ready for playback
        await handleAssetReady(data)
        break
      }

      case 'video.asset.errored': {
        // Asset processing failed
        await handleAssetError(data)
        break
      }

      default:
        console.log(`Unhandled Mux event: ${type}`)
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error('Mux webhook error:', err)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}

async function handleUploadComplete(data: {
  id: string
  asset_id: string
  passthrough?: string
}) {
  const { asset_id, passthrough } = data
  
  // passthrough contains our video ID
  if (!passthrough) return

  const supabaseAdmin = getSupabaseAdmin()
  
  // Update video with Mux asset ID
  await supabaseAdmin
    .from('videos')
    .update({
      mux_asset_id: asset_id,
      status: 'processing',
    })
    .eq('id', passthrough)
}

async function handleAssetReady(data: {
  id: string
  playback_ids: Array<{ id: string; policy: string }>
  duration: number
  passthrough?: string
}) {
  const { id: assetId, playback_ids, duration } = data
  
  const playbackId = playback_ids?.[0]?.id
  if (!playbackId) return

  const supabaseAdmin = getSupabaseAdmin()

  // Find video by Mux asset ID and update
  const { data: video } = await supabaseAdmin
    .from('videos')
    .select('id')
    .eq('mux_asset_id', assetId)
    .single()

  if (!video) return

  // Generate thumbnail URL
  const thumbnailUrl = getThumbnailUrl(playbackId, { width: 640 })

  // Update video as ready
  await supabaseAdmin
    .from('videos')
    .update({
      mux_playback_id: playbackId,
      video_url: `https://stream.mux.com/${playbackId}.m3u8`,
      thumbnail_url: thumbnailUrl,
      duration: Math.round(duration),
      status: 'ready',
    })
    .eq('id', video.id)
}

async function handleAssetError(data: {
  id: string
  errors?: { type: string; message: string }[]
  passthrough?: string
}) {
  const { id: assetId, errors } = data
  
  console.error('Mux asset error:', errors)

  const supabaseAdmin = getSupabaseAdmin()

  // Find video and mark as error
  await supabaseAdmin
    .from('videos')
    .update({ status: 'error' })
    .eq('mux_asset_id', assetId)
}
