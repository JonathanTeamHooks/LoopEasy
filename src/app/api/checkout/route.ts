import { createClient } from '@/lib/supabase/server'
import { stripe, PLANS, LAUNCH_MODE } from '@/lib/stripe'
import { NextResponse } from 'next/server'

// POST /api/checkout - Create a Stripe checkout session
export async function POST(req: Request) {
  // Payments disabled during launch
  if (LAUNCH_MODE || !PLANS.premium.priceId) {
    return NextResponse.json(
      { error: 'Payments are not yet enabled. Everything is free during launch!' },
      { status: 503 }
    )
  }

  try {
    const supabase = await createClient()
    
    // Check auth
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('stripe_customer_id, is_premium')
      .eq('id', user.id)
      .single()

    if (profile?.is_premium) {
      return NextResponse.json({ error: 'Already premium' }, { status: 400 })
    }

    // Create or reuse Stripe customer
    let customerId = profile?.stripe_customer_id

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          user_id: user.id,
        },
      })
      customerId = customer.id

      // Save customer ID
      await supabase
        .from('profiles')
        .update({ stripe_customer_id: customerId })
        .eq('id', user.id)
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: PLANS.premium.priceId!,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?checkout=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?checkout=canceled`,
      metadata: {
        user_id: user.id,
      },
      subscription_data: {
        trial_period_days: 7, // 7-day free trial
        metadata: {
          user_id: user.id,
        },
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Checkout error:', err)
    return NextResponse.json({ error: 'Failed to create checkout' }, { status: 500 })
  }
}
