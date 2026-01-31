import Mux from '@mux/mux-node'

export const mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID!,
  tokenSecret: process.env.MUX_TOKEN_SECRET!,
})

// Create a direct upload URL for client-side uploads
export async function createUploadUrl() {
  const upload = await mux.video.uploads.create({
    cors_origin: process.env.NEXT_PUBLIC_APP_URL || '*',
    new_asset_settings: {
      playback_policy: ['public'],
      encoding_tier: 'baseline', // 'smart' for better quality
    },
  })

  return {
    uploadId: upload.id,
    uploadUrl: upload.url,
  }
}

// Get asset details
export async function getAsset(assetId: string) {
  return await mux.video.assets.retrieve(assetId)
}

// Get playback URL for a video
export function getPlaybackUrl(playbackId: string) {
  return `https://stream.mux.com/${playbackId}.m3u8`
}

// Get thumbnail URL
export function getThumbnailUrl(playbackId: string, options?: {
  width?: number
  height?: number
  time?: number
}) {
  const params = new URLSearchParams()
  if (options?.width) params.set('width', options.width.toString())
  if (options?.height) params.set('height', options.height.toString())
  if (options?.time) params.set('time', options.time.toString())
  
  const queryString = params.toString()
  return `https://image.mux.com/${playbackId}/thumbnail.jpg${queryString ? `?${queryString}` : ''}`
}

// Get animated GIF preview
export function getGifUrl(playbackId: string, options?: {
  width?: number
  start?: number
  end?: number
}) {
  const params = new URLSearchParams()
  if (options?.width) params.set('width', options.width.toString())
  if (options?.start) params.set('start', options.start.toString())
  if (options?.end) params.set('end', options.end.toString())
  
  const queryString = params.toString()
  return `https://image.mux.com/${playbackId}/animated.gif${queryString ? `?${queryString}` : ''}`
}
