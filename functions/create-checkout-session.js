const stripe = require('stripe')(STRIPE_SECRET_KEY);

export async function onRequestPost(context) {
  const { request } = context;
  const { priceId } = await request.json();

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price: priceId,
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'https://drissishop.pages.dev/bedankt.html?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'https://drissishop.pages.dev/producten.html',
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
