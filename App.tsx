import React, { useState, useCallback } from 'react';
import { HashRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import HomePage from './components/HomePage';
import ShopPage from './components/ShopPage';
import SellPage from './components/SellPage';
import ContactPage from './components/ContactPage';
import GlobalPreloader from './components/GlobalPreloader';
import CartSidebar from './components/CartSidebar'; // Import CartSidebar
import { CartProvider, useCart } from './src/context/CartContext'; // Corrected Path
import { preloadAssets } from './utils/assetUtils';
import { ColumnDirection, Product } from './types';

const columnVariants = {
  closed: (_direction: ColumnDirection) => ({
    x: 0,
    transition: { duration: 0.8, ease: [0.65, 0, 0.35, 1] },
  }),
  opened: (direction: ColumnDirection) => ({
    x: direction === 'left' ? '-100vw' : '100vw',
    transition: { duration: 0.8, ease: [0.65, 0, 0.35, 1] },
  }),
};

export const pageTransitionProps = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -15 },
  transition: { duration: 0.3, ease: 'easeInOut' },
};

const getImagePathForPreload = (imageIdentifier: string): string => {
  if (!imageIdentifier) return '';
  const baseName = imageIdentifier.startsWith('/') ? imageIdentifier : `/${imageIdentifier}`;
  let fullPath = `${baseName}`;

  if (/\.(jpeg|jpg|gif|png|webp)$/i.test(baseName)) {
    return fullPath;
  }
  return `${fullPath}.jpg`;
};

// Cart Icon SVG
const CartIconSVG: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    strokeWidth={1.5}
    stroke='currentColor'
    className={className}
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
    />
  </svg>
);

const AnimatedApp: React.FC = () => {
  const [opened, setOpened] = useState(false);
  const [showMain, setShowMain] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { getTotalItemsInCart, toggleCart, isCartOpen } = useCart(); // Get cart methods

  const [isGlobalLoading, setIsGlobalLoading] = useState(false);
  const [globalLoadingMessage, setGlobalLoadingMessage] = useState('');

  const handleColumnAnimationComplete = () => {
    if (opened && !showMain) {
      setShowMain(true);
    }
  };

  const getAssetsForPath = useCallback(async (path: string): Promise<string[]> => {
    if (path === '/') {
      return [
        '@/DSC_1425.png',
        '@/DSC_3715.jpg',
        '@/DSC_3685.jpg',
        '@/DSC_1316.jpg',
        '@/DSC_1487.jpg',
        '@/expert.jpg',
        '@/youtube-icon.svg',
      ].filter(Boolean);
    }
    if (path === '/shop') {
      try {
        const response = await fetch('/products.json');
        if (!response.ok) {
          console.error('Failed to fetch products for preloading');
          return [];
        }
        const productsData: Product[] = await response.json();
        return productsData
          .slice(0, 6)
          .map((p) => {
            if (p.images && p.images.length > 0) {
              return getImagePathForPreload(p.images[0]);
            }
            return '';
          })
          .filter(Boolean);
      } catch (error) {
        console.error('Error fetching or processing products for preloading shop assets:', error);
        return [];
      }
    }
    return [];
  }, []);

  const performSmoothNavigation = useCallback(
    async (targetPath: string) => {
      if (location.pathname === targetPath && !isGlobalLoading) return;

      setIsGlobalLoading(true);
      const messages = [
        'Polishing the display cases...',
        'Aligning the tourbillons...',
        'Winding the mainsprings...',
        'Moving to a new room...',
      ];
      setGlobalLoadingMessage(messages[Math.floor(Math.random() * messages.length)]);

      navigate(targetPath);

      const assetsToLoad = await getAssetsForPath(targetPath);
      const minDelayPromise = new Promise((resolve) => setTimeout(resolve, 1000));

      try {
        if (assetsToLoad.length > 0) {
          await Promise.all([preloadAssets(assetsToLoad), minDelayPromise]);
        } else {
          await minDelayPromise;
        }
      } catch (error) {
        console.error('Error during asset preloading or minimum delay:', error);
        await minDelayPromise;
      } finally {
        setIsGlobalLoading(false);
      }
    },
    [navigate, location.pathname, getAssetsForPath, isGlobalLoading],
  );

  const totalItems = getTotalItemsInCart();

  return (
    <div className='w-full h-full'>
      <AnimatePresence>{isGlobalLoading && <GlobalPreloader message={globalLoadingMessage} />}</AnimatePresence>

      <AnimatePresence>{isCartOpen && <CartSidebar />}</AnimatePresence>

      <AnimatePresence>
        {!opened && !isGlobalLoading && (
          <motion.div
            className='fixed inset-0 flex items-center justify-center z-20 cursor-pointer p-4'
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            onClick={() => setOpened(true)}
          >
            <img
              src='@/83Westv2.png'
              alt='83 West Watches Logo'
              className='w-auto h-auto max-w-[80vw] sm:max-w-[60vw] md:max-w-[50vw] max-h-[70vh] object-contain will-change-filter transition-filter duration-300 hover:drop-shadow-[0_0_2em_#bca68e]'
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!showMain && !isGlobalLoading && (
          <>
            <motion.div
              className='absolute top-0 left-0 w-1/2 h-screen z-[1] bg-black bg-[url("/lounge_left_half.png")] bg-cover bg-center border-r-2 border-[#bca68e] transition-colors duration-300'
              custom='left'
              animate={opened ? 'opened' : 'closed'}
              variants={columnVariants}
              initial='closed'
              onAnimationComplete={handleColumnAnimationComplete}
            />
            <motion.div
              className='absolute top-0 right-0 w-1/2 h-screen z-[1] bg-black bg-[url("/lounge_right_half.png")] bg-cover bg-center border-l-2 border-[#bca68e] transition-colors duration-300'
              custom='right'
              animate={opened ? 'opened' : 'closed'}
              variants={columnVariants}
              initial='closed'
            />
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showMain && (
          <motion.div
            className='w-full min-h-screen m-0 p-0'
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: isGlobalLoading ? 0 : 2.0, ease: [0.65, 0, 0.35, 1] }}
          >
            <nav className='sticky top-0 left-0 flex items-center justify-between px-8 py-4 z-[2000] bg-black/50 backdrop-blur-md w-full'>
              <ul className='flex gap-8 text-white font-normal text-xl list-none'>
                <li
                  className='hover:text-[#bca68e] cursor-pointer transition-colors'
                  onClick={() => performSmoothNavigation('/')}
                >
                  Home
                </li>
                <li
                  className='hover:text-[#bca68e] cursor-pointer transition-colors'
                  onClick={() => performSmoothNavigation('/shop')}
                >
                  Shop
                </li>
                <li
                  className='hover:text-[#bca68e] cursor-pointer transition-colors'
                  onClick={() => performSmoothNavigation('/sell')}
                >
                  Sell
                </li>
                <li
                  className='hover:text-[#bca68e] cursor-pointer transition-colors'
                  onClick={() => performSmoothNavigation('/contact')}
                >
                  Contact
                </li>
              </ul>
              <div
                className={`relative cursor-pointer p-2 rounded-full transition-all duration-300 ${totalItems > 0 ? 'text-[#C19765] hover:text-[#B49857] filter drop-shadow-[0_0_8px_#C19765]' : 'text-white hover:text-[#bca68e]'}`}
                onClick={toggleCart}
                aria-label='Toggle shopping cart'
              >
                <CartIconSVG className='w-7 h-7' />
                {totalItems > 0 && (
                  <span className='absolute -top-1 -right-1 bg-[#B49857] text-[#181818] text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center'>
                    {totalItems}
                  </span>
                )}
              </div>
            </nav>

            <AnimatePresence mode='wait'>
              <Routes location={location} key={location.pathname}>
                <Route path='/' element={<HomePage performSmoothNavigation={performSmoothNavigation} />} />
                <Route path='/shop' element={<ShopPage />} />
                <Route path='/sell' element={<SellPage />} />
                <Route path='/contact' element={<ContactPage />} />
                {/* Add CheckoutPage Route later */}
              </Routes>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <CartProvider>
        {' '}
        {/* Wrap AnimatedApp with CartProvider */}
        <AnimatedApp />
      </CartProvider>
    </HashRouter>
  );
};

export default App;
