import { stripe, LAUNCH_MODE } from '@/lib/stripe'
import { createClient } from '@supabase/supabase-js'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import type Stripe from 'stripe'

// Use service role for webhook operations
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  // Skip webhooks if in launch mode
  if (LAUNCH_MODE || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ received: true, mode: 'launch' })
  }

  const body = await req.text()
  const headersList = await headers()
  const signature = headersList.get('stripe-signature') as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        await handleCheckoutComplete(session)
        break
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object
        await handleSubscriptionChange(subscription as any)
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object
        await handleSubscriptionCanceled(subscription as any)
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice
        await handlePaymentSucceeded(invoice)
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        await handlePaymentFailed(invoice)
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error('Webhook handler error:', err)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}

async function handleCheckoutComplete(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.user_id
  if (!userId) return

  // Update user's stripe customer ID
  await supabaseAdmin
    .from('profiles')
    .update({ stripe_customer_id: session.customer as string })
    .eq('id', userId)
}

async function handleSubscriptionChange(subscription: any) {
  const customerId = subscription.customer as string
  
  // Find user by stripe customer ID
  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('id')
    .eq('stripe_customer_id', customerId)
    .single()

  if (!profile) return

  const status = subscription.status
  const isPremium = status === 'active' || status === 'trialing'

  // Update profile
  await supabaseAdmin
    .from('profiles')
    .update({
      is_premium: isPremium,
      premium_until: isPremium 
        ? new Date(subscription.current_period_end * 1000).toISOString()
        : null,
    })
    .eq('id', profile.id)

  // Upsert subscription record
  await supabaseAdmin
    .from('subscriptions')
    .upsert({
      user_id: profile.id,
      stripe_subscription_id: subscription.id,
      status: subscription.status,
      plan: 'premium',
      current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      cancel_at_period_end: subscription.cancel_at_period_end,
    }, {
      onConflict: 'stripe_subscription_id',
    })
}

async function handleSubscriptionCanceled(subscription: any) {
  const customerId = subscription.customer as string
  
  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('id')
    .eq('stripe_customer_id', customerId)
    .single()

  if (!profile) return

  // Update profile - remove premium
  await supabaseAdmin
    .from('profiles')
    .update({
      is_premium: false,
      premium_until: null,
    })
    .eq('id', profile.id)

  // Update subscription record
  await supabaseAdmin
    .from('subscriptions')
    .update({ status: 'canceled' })
    .eq('stripe_subscription_id', subscription.id)
}

async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  // Could send a receipt email, update billing history, etc.
  console.log('Payment succeeded for invoice:', invoice.id)
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  // Could send a payment failed email, etc.
  console.log('Payment failed for invoice:', invoice.id)
}
