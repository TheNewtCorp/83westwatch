import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-05-28.basil', // Use latest Stripe API version available to you
});

export default async (req: any, res: any) => {
  // Only allow POST
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { cartItems } = JSON.parse(req.body);

    // Convert your frontend CartItems to Stripe line_items
    const line_items = cartItems.map((item: any) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: item.images?.length ? [item.images[0]] : undefined,
        },
        unit_amount: Math.round(item.price * 100), // price in cents
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/#/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/#/cart-cancelled`,
      // Optional: add invoice creation, shipping info, metadata, etc.
    });

    res.status(200).json({ sessionId: session.id });
  } catch (error: any) {
    console.error('[Stripe Checkout Error]', error);
    res.status(400).json({ error: error.message });
  }
};
