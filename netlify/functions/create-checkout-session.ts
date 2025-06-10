import Stripe from 'stripe';

console.log('FRONTEND_URL:', process.env.FRONTEND_URL);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-05-28.basil',
});

export const handler = async (event: any) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { cartItems } = JSON.parse(event.body);

    // Validate cartItems, etc.

    const line_items = cartItems.map((item: any) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: item.images?.length ? [item.images[0]] : undefined,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/#/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/#/cart-cancelled`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ sessionId: session.id }),
    };
  } catch (error: any) {
    console.error('[Stripe Checkout Error]', error);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message || 'Something went wrong' }),
    };
  }
};
