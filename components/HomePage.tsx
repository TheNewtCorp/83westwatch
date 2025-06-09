import React from 'react';
import { motion } from 'framer-motion';

// Ensure heroImage, product images, expert.jpg, youtube-icon.svg are in public folder
// Example: /public/DSC_1425.png, /public/DSC_3715.jpg etc.

const pageTransitionProps = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -15 },
  transition: { duration: 0.3, ease: 'easeInOut' },
};

interface HomePageProps {
  performSmoothNavigation: (path: string) => void;
}

const ShieldIcon: React.FC = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='32'
    height='32'
    fill='none'
    stroke='#bca68e'
    strokeWidth='1.3'
    strokeLinecap='round'
    strokeLinejoin='round'
    viewBox='0 0 24 24'
  >
    <path d='M12 3l7.5 3v4.5c0 6-7.5 10.5-7.5 10.5S4.5 16.5 4.5 10.5V6L12 3z' />
  </svg>
);

const HomePage: React.FC<HomePageProps> = ({ performSmoothNavigation }) => {
  return (
    <motion.div {...pageTransitionProps}>
      {/* Hero watch image */}
      <div className='h-[40vh] text-center relative w-full aspect-[4/1] min-h-[320px] overflow-visible max-w-[2000px] mx-auto flex justify-center items-center'>
        <img
          src={'/public/DSC_1425.png'}
          alt='Luxury Watch Hero'
          className='w-auto h-[90%] relative object-contain filter brightness-90'
          draggable={false}
        />
      </div>

      {/* Available Now Section */}
      <div className='bg-transparent pt-12 pb-16 text-center'>
        <h2 className='text-white font-["Georgia",_serif] tracking-[0.08em] text-3xl font-normal mb-8'>
          AVAILABLE NOW
        </h2>
        <div className='flex flex-wrap justify-center gap-12 mb-10 px-4'>
          {/* Product Card 1 */}
          <div className='bg-transparent p-0 text-center w-[260px]'>
            <img
              src={'/public/product-images/zenith-defy-el-primero-titanium/DSC_3715.jpg'}
              alt='Zenith Defy El Primero Extreme'
              className='w-full max-w-[260px] aspect-square object-cover rounded-md mb-5 mx-auto shadow-lg'
            />
            <div className='text-white text-lg font-["Georgia",_serif] mb-1'>Zenith Defy El Primero Extreme</div>
            <div className='text-gray-400 text-base mb-3'>97.9100.9004/02.i001</div>
            <div className='text-white text-xl font-medium'>$13,500</div>
          </div>
          {/* Product Card 2 */}
          <div className='bg-transparent p-0 text-center w-[260px]'>
            <img
              src={'/public/product-images/omega-speedmaster-blue-panda/DSC_1897.jpg'}
              alt='Omega Speedmaster Blue Panda'
              className='w-full max-w-[260px] aspect-square object-cover rounded-md mb-5 mx-auto shadow-lg'
            />
            <div className='text-white text-lg font-["Georgia",_serif] mb-1'>Omega Speedmaster Blue Panda</div>
            <div className='text-gray-400 text-base mb-3'>329.30.43.51.03.001</div>
            <div className='text-white text-xl font-medium'>$7,200</div>
          </div>
          {/* Product Card 3 */}
          <div className='bg-transparent p-0 text-center w-[260px]'>
            <img
              src={'/public/product-images/audemars-piguet-royal-oak-chronograph/DSC_1316.jpg'}
              alt='Audemars Piguet Royal'
              className='w-full max-w-[260px] aspect-square object-cover rounded-md mb-5 mx-auto shadow-lg'
            />
            <div className='text-white text-lg font-["Georgia",_serif] mb-1'>Audemars Piguet Royal</div>
            <div className='text-gray-400 text-base mb-3'>26331BA.OO.1220BA.01</div>
            <div className='text-white text-xl font-medium'>$98,000</div>
          </div>
        </div>
        <button
          className='bg-transparent border border-white text-white py-3 px-8 text-base tracking-[0.08em] mt-5 rounded-sm cursor-pointer transition-colors duration-150 hover:border-[#bca68e] hover:text-[#bca68e]'
          onClick={() => performSmoothNavigation('/shop')}
        >
          VIEW ALL
        </button>
      </div>

      {/* How It Works Section */}
      <div className='bg-[#131313] w-full py-16 flex justify-center'>
        <div className='flex flex-col md:flex-row items-center md:items-stretch w-full max-w-6xl px-8 text-center md:text-left'>
          <div className='flex-1 text-white md:mr-12 mb-8 md:mb-0'>
            <h2 className='font-["Georgia",_serif] text-3xl tracking-[0.1em] mb-5'>HOW IT WORKS</h2>
            <p className='text-gray-400 text-lg mb-6 max-w-md mx-auto md:mx-0'>
              We source watches through trusted suppliers to guarantee 100% authentic pieces in either unworn or
              excellent condition
            </p>
            <div className='mt-2 flex justify-center md:justify-start'>
              <ShieldIcon />
            </div>
          </div>
          <div className='max-w-[260px] w-full'>
            <img
              src={'/public/DSC_1487.jpg'}
              alt='How it works watch'
              className='w-full rounded-lg filter brightness-95 shadow-lg'
            />
          </div>
        </div>
      </div>

      {/* Sell Your Watch Section */}
      <div className='bg-transparent py-16 text-center'>
        <h2 className='text-white font-["Georgia",_serif] text-3xl tracking-[0.11em] font-normal mb-10'>
          SELL YOUR WATCH
        </h2>
        <div className='flex flex-col md:flex-row items-center justify-center max-w-3xl mx-auto gap-10 md:gap-7 px-4'>
          <div className=''>
            <img
              src={'/public/expert.jpg'}
              alt='Expert'
              className='w-[175px] h-[175px] object-cover rounded-full block mx-auto shadow-[0_2px_24px_0_rgba(0,0,0,0.375)]'
            />
          </div>
          <div className='text-white text-base text-center md:text-left leading-relaxed max-w-md'>
            <p>
              With years of experience, we are dedicated to providing reputable, no wait-access to the world’s most
              exclusive buyers. Our team ensures a seamless and secure process for selling your luxury timepiece
            </p>
          </div>
        </div>
      </div>

      {/* For Enthusiasts Section */}
      <div className='bg-[#131313] w-full py-16 flex justify-center'>
        <div className='flex flex-col md:flex-row items-center md:items-stretch w-full max-w-6xl px-8 text-center md:text-left'>
          <div className='flex-1 text-white md:mr-12 mb-8 md:mb-0'>
            <h2 className='font-["Georgia",_serif] text-3xl tracking-[0.1em] mb-5'>FOR ENTHUSIASTS</h2>
            <p className='text-gray-400 text-lg mb-6 max-w-md mx-auto md:mx-0'>
              Our YouTube is underway and will have full breakdowns of your favorite timepieces and their mechanical
              ingenuity
            </p>
          </div>
          <div className='max-w-[260px] w-full flex justify-center md:justify-start'></div>
        </div>
      </div>
      <footer className='py-8 text-center text-gray-500'>83 West Watches &copy; {new Date().getFullYear()}</footer>
    </motion.div>
  );
};

export default HomePage;
