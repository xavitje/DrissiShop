import Stripe from 'stripe';

export async function onRequestPost(context) {
  try {
    // Haal secret key uit environment variables
    const stripe = new Stripe(context.env.STRIPE_SECRET_KEY);
    const { priceId } = await context.request.json();
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'payment',
      success_url: `${new URL(context.request.url).origin}/bedankt.html`,
      cancel_url: `${new URL(context.request.url).origin}/producten.html`,
    });

    return new Response(JSON.stringify({ id: session.id }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
