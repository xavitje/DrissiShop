import Stripe from 'stripe';

export async function onRequestPost(context) {
  const stripe = new Stripe(context.env.STRIPE_SECRET_KEY);
  const { payment_method_id, amount, currency } = await context.request.json();

  try {
    // 1. Maak PaymentIntent aan
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method: payment_method_id,
      confirm: true,
      return_url: `${new URL(context.request.url).origin}/bedankt.html`
    });

    // 2. Controleer status
    if (paymentIntent.status === 'succeeded') {
      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      return new Response(JSON.stringify({ 
        success: false,
        error: paymentIntent.last_payment_error?.message || 'Betaling mislukt'
      }), { status: 400 });
    }
  } catch (err) {
    return new Response(JSON.stringify({
      success: false,
      error: err.message
    }), { status: 500 });
  }
}
