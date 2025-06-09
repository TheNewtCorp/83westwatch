import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../src/context/CartContext';
import { CartItem } from '../types';
import { loadStripe, Stripe } from '@stripe/stripe-js';

// IMPORTANT: Replace with your actual Stripe publishable key
const STRIPE_PUBLISHABLE_KEY =
  'pk_test_51RXx09Q3JY1KkFhyTrzlBVzVcjddlmQQZetKo9S1AxdCKSfATlb8Qpp90rmLqwjo5D5UDWUwUEqUddsAwIwNNjkP000C2UqhoS';
let stripePromise: Promise<Stripe | null>;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
  }
  return stripePromise;
};

const getImagePath = (imageIdentifier: string): string => {
  if (!imageIdentifier) return '/placeholder.jpg';
  const baseName = imageIdentifier.startsWith('/') ? imageIdentifier : `/${imageIdentifier}`;
  let fullPath = `${baseName}`;
  if (/\.(jpeg|jpg|gif|png|webp)$/i.test(baseName)) {
    return fullPath;
  }
  return `${fullPath}.jpg`;
};

const CartSidebar: React.FC = () => {
  const { cartItems, removeFromCart, updateItemQuantity, clearCart, getCartSubtotal, toggleCart, getTotalItemsInCart } =
    useCart();

  const [isLoadingCheckout, setIsLoadingCheckout] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const sidebarVariants = {
    hidden: { x: '100%' },
    visible: { x: '0%' },
  };

  const totalItems = getTotalItemsInCart();

  // ===========================
  // UPDATED: Checkout handler
  // ===========================
  const handleCheckout = async () => {
    setIsLoadingCheckout(true);
    setCheckoutError(null);

    if (cartItems.length === 0) {
      setCheckoutError('Your cart is empty.');
      setIsLoadingCheckout(false);
      return;
    }

    try {
      // 1. POST cart items to your backend to create a Stripe session
      const response = await fetch('/.netlify/functions/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartItems }),
      });

      if (!response.ok) {
        const err = await response.json();
        setCheckoutError(err.error || 'Failed to create checkout session.');
        setIsLoadingCheckout(false);
        return;
      }

      const { sessionId } = await response.json();

      // 2. Redirect to Stripe Checkout
      const stripe = await getStripe();
      if (!stripe) {
        setCheckoutError('Stripe.js failed to load. Please try again.');
        setIsLoadingCheckout(false);
        return;
      }

      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) {
        setCheckoutError(error.message || 'An error occurred during checkout.');
      }
    } catch (error) {
      console.error('Error in handleCheckout:', error);
      if (error instanceof Error) {
        setCheckoutError(error.message);
      } else {
        setCheckoutError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoadingCheckout(false);
    }
  };

  return (
    <motion.div className='fixed inset-0 z-[9990] ' initial='hidden' animate='visible' exit='hidden'>
      {/* Backdrop */}
      <motion.div
        className='absolute inset-0 bg-black/70'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={!isLoadingCheckout ? toggleCart : undefined}
      />

      <motion.div
        className='fixed top-0 right-0 h-full w-full max-w-md bg-[#181818] text-[#E3C9A5] shadow-2xl flex flex-col'
        variants={sidebarVariants}
        transition={{ type: 'spring', stiffness: 300, damping: 30, duration: 0.3 }}
      >
        <div className='flex items-center justify-between p-6 border-b border-[#515052]/50'>
          <h2 className="text-2xl font-['Georgia',_serif] text-[#B49857]">Your Cart ({totalItems})</h2>
          <button
            onClick={!isLoadingCheckout ? toggleCart : undefined}
            disabled={isLoadingCheckout}
            className='text-[#D3C3A6] hover:text-[#C19765] transition-colors disabled:opacity-50'
            aria-label='Close cart'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-7 h-7'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
            </svg>
          </button>
        </div>

        {checkoutError && <div className='p-4 bg-red-700 text-red-100 text-sm text-center'>{checkoutError}</div>}

        {cartItems.length === 0 ? (
          <div className='flex-grow flex flex-col items-center justify-center p-6 text-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.2}
              stroke='currentColor'
              className='w-24 h-24 text-[#515052] mb-4'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
              />
            </svg>
            <p className='text-xl text-[#D3C3A6]'>Your cart is currently empty.</p>
            <button
              onClick={() => {
                toggleCart();
                // Optionally navigate to shop page: navigate('/shop');
              }}
              className='mt-6 bg-[#B49857] text-[#181818] font-semibold py-2 px-6 rounded-md hover:bg-[#C19765] transition-colors'
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className='flex-grow overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-[#515052] scrollbar-track-[#3B2620]/50'>
              {cartItems.map((item: CartItem) => (
                <div key={item.id} className='flex items-start space-x-4 p-3 bg-[#3B2620]/60 rounded-lg'>
                  <img
                    src={getImagePath(item.images[0])}
                    alt={item.name}
                    className='w-20 h-20 object-cover rounded-md border border-[#515052]/30'
                  />
                  <div className='flex-grow'>
                    <h3 className='text-md font-semibold text-[#E3C9A5]'>{item.name}</h3>
                    <p className='text-sm text-[#B49857]'>${item.price.toLocaleString()}</p>
                    <div className='flex items-center mt-2'>
                      <button
                        onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                        className='px-2 py-0.5 border border-[#515052] rounded-l-md text-lg hover:bg-[#515052]/50 transition-colors disabled:opacity-70'
                        disabled={item.quantity <= 1 || isLoadingCheckout}
                      >
                        -
                      </button>
                      <span className='px-3 py-0.5 border-t border-b border-[#515052] text-sm'>{item.quantity}</span>
                      <button
                        onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                        className='px-2 py-0.5 border border-[#515052] rounded-r-md text-lg hover:bg-[#515052]/50 transition-colors disabled:opacity-70'
                        disabled={isLoadingCheckout}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    disabled={isLoadingCheckout}
                    className='text-sm text-[#D3C3A6] hover:text-red-500 transition-colors self-start pt-1 disabled:opacity-50'
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-5 h-5'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12.56 0c1.153 0 2.243.096 3.297.266M6.228 6.091A3.285 3.285 0 019.513 4.5h4.974c1.166 0 2.22.613 2.813 1.591m-5.462 2.193a48.068 48.068 0 01-3.478-.397m12.56 0a48.068 48.068 0 00-3.478-.397m-9.082 0l-.346 9M15 9l-.346 9m0 0a2.25 2.25 0 01-2.244 2.077H9.261a2.25 2.25 0 01-2.244-2.077L6.67 9M15 9H9'
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            <div className='p-6 border-t border-[#515052]/50'>
              <div className='flex justify-between items-center mb-4'>
                <span className='text-lg text-[#D3C3A6]'>Subtotal:</span>
                <span className='text-2xl font-semibold text-[#B49857]'>${getCartSubtotal().toLocaleString()}</span>
              </div>
              <button
                onClick={handleCheckout}
                disabled={isLoadingCheckout || cartItems.length === 0}
                className='w-full bg-[#B49857] text-[#181818] font-bold py-3 px-6 rounded-md hover:bg-[#C19765] transition-colors text-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center'
              >
                {isLoadingCheckout ? (
                  <>
                    <svg
                      className='animate-spin -ml-1 mr-3 h-5 w-5 text-black'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                    >
                      <circle
                        className='opacity-25'
                        cx='12'
                        cy='12'
                        r='10'
                        stroke='currentColor'
                        strokeWidth='4'
                      ></circle>
                      <path
                        className='opacity-75'
                        fill='currentColor'
                        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Proceed to Checkout'
                )}
              </button>
              <button
                onClick={clearCart}
                disabled={isLoadingCheckout || cartItems.length === 0}
                className='w-full mt-3 text-[#D3C3A6] hover:text-red-500 transition-colors py-2 rounded-md border border-[#515052] hover:border-red-500/70 disabled:opacity-50'
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default CartSidebar;
