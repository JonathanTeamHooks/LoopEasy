import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
  typescript: true,
})

export const PLANS = {
  free: {
    name: 'Free',
    price: 0,
    features: [
      'Watch unlimited content',
      'Create channels',
      'Full AI creator tools',
      'Ads supported',
    ],
  },
  premium: {
    name: 'Premium',
    price: 999, // $9.99 in cents
    priceId: process.env.STRIPE_PREMIUM_PRICE_ID,
    features: [
      'Everything in Free',
      'Ad-free experience',
      'Priority support',
      'Early access to features',
    ],
  },
} as const

export type PlanType = keyof typeof PLANS

// Monetization threshold
export const MONETIZATION_THRESHOLD = 1000 // followers
export const CREATOR_REVENUE_SHARE = 0.70 // 70%
