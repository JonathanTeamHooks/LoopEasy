import Stripe from 'stripe'

// Stripe integration - disabled for initial launch
// Will enable later when adding premium tier

// Monetization threshold (for future use)
export const MONETIZATION_THRESHOLD = 1000 // followers
export const CREATOR_REVENUE_SHARE = 0.70 // 70%

// For now, everyone gets full access
export const LAUNCH_MODE = true // Set to false when enabling payments

// Plans configuration
export const PLANS = {
  free: {
    name: 'Free',
    price: 0,
    priceId: null,
    features: ['Watch with ads', 'Create videos', 'Full AI creator tools'],
  },
  premium: {
    name: 'Premium',
    price: 9.99,
    priceId: process.env.STRIPE_PREMIUM_PRICE_ID || null,
    features: ['Ad-free watching', 'Ad-free creating', 'Priority support'],
  },
}

// Stripe client - only initialized if key is present
export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2026-01-28.clover',
    })
  : (new Proxy({} as Stripe, {
      get() {
        throw new Error('Stripe is not configured. Set STRIPE_SECRET_KEY to enable payments.')
      },
    }) as Stripe)
