import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '../types';
import { useCart } from '../src/context/CartContext'; // Corrected Path

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const { addToCart } = useCart(); // Use cart context
  const [addedToCartMessage, setAddedToCartMessage] = useState<string>('');

  const getImagePathWithExtension = (imageIdentifier: string): string => {
    if (!imageIdentifier) return '/placeholder.jpg';
    const baseName = imageIdentifier.startsWith('/') ? imageIdentifier : `/${imageIdentifier}`;
    let fullPath = `${baseName}`;

    if (/\.(jpeg|jpg|gif|png|webp)$/i.test(baseName)) {
      return fullPath;
    }
    return `${fullPath}.jpg`;
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + product.images.length) % product.images.length);
  };

  const mainImageSrc =
    product.images && product.images.length > 0
      ? getImagePathWithExtension(product.images[currentImageIndex])
      : '/placeholder.jpg';

  const handleMainImageClick = () => {
    if (product.images && product.images.length > 0) {
      setIsZoomed(true);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, 1);
    setAddedToCartMessage('Added to cart!');
    setTimeout(() => {
      setAddedToCartMessage('');
    }, 2000); // Clear message after 2 seconds
  };

  return (
    <>
      <motion.div
        className='fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center p-4 overflow-y-auto'
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className='bg-[#1c1c1c] rounded-2xl overflow-hidden shadow-2xl w-full max-w-3xl max-h-[90vh] relative flex flex-col md:flex-row'
          layoutId={`card-${product.id}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className='md:w-1/2 w-full p-4 flex flex-col items-center'>
            <motion.img
              key={mainImageSrc}
              src={mainImageSrc}
              alt={product.name}
              className='w-full h-[300px] md:h-[400px] object-contain rounded-lg mb-4 cursor-zoom-in hover:opacity-80 transition-opacity'
              layoutId={`img-${product.id}`}
              initial={{ opacity: 0.5, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              onClick={handleMainImageClick}
            />
            {product.images && product.images.length > 1 && (
              <div className='flex items-center justify-center space-x-2 mb-4'>
                <button
                  onClick={prevImage}
                  className='text-white bg-[#bca68e]/50 hover:bg-[#bca68e] rounded-full p-2 transition-colors'
                  aria-label='Previous image'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-6 h-6'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                  </svg>
                </button>
                <div className='flex space-x-1 overflow-x-auto py-1 scrollbar-thin scrollbar-thumb-[#bca68e]/30 scrollbar-track-transparent'>
                  {product.images.map((img, index) => (
                    <img
                      key={index}
                      src={getImagePathWithExtension(img)}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className={`w-12 h-12 object-cover rounded-md cursor-pointer border-2 ${index === currentImageIndex ? 'border-[#bca68e]' : 'border-transparent'} hover:border-[#bca68e]/70 transition-all`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
                <button
                  onClick={nextImage}
                  className='text-white bg-[#bca68e]/50 hover:bg-[#bca68e] rounded-full p-2 transition-colors'
                  aria-label='Next image'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-6 h-6'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                  </svg>
                </button>
              </div>
            )}
          </div>

          <div className='md:w-1/2 w-full p-6 text-white flex flex-col overflow-y-auto max-h-[calc(90vh-2rem)] md:max-h-full'>
            <motion.h2 layoutId={`name-${product.id}`} className='text-3xl font-["Georgia",_serif] text-[#bca68e] mb-3'>
              {product.name}
            </motion.h2>
            <motion.div layoutId={`model-${product.id}`} className='font-semibold mb-1 text-gray-300'>
              Model: <span className='text-[#bca68e]'>{product.model}</span>
            </motion.div>
            <motion.div layoutId={`price-${product.id}`} className='font-bold text-3xl text-[#bca68e] mb-4'>
              ${product.price.toLocaleString()}
            </motion.div>
            <div className='prose prose-sm prose-invert text-gray-300 max-w-none overflow-y-auto flex-grow mb-4 scrollbar-thin scrollbar-thumb-[#bca68e]/50 scrollbar-track-transparent pr-2 min-h-[180px] md:min-h-0'>
              <p dangerouslySetInnerHTML={{ __html: product.description.replace(/\n/g, '<br />') }} />
            </div>
            <button
              onClick={handleAddToCart}
              className={`mt-auto w-full py-3 px-8 rounded-lg bg-[#bca68e] text-[#1c1c1c] border-none font-semibold text-lg cursor-pointer hover:bg-[#a89174] transition-colors ${addedToCartMessage ? 'bg-[#a89174]' : ''}`}
            >
              {addedToCartMessage || 'Add to Cart'}
            </button>
          </div>

          <button
            onClick={onClose}
            className='absolute top-4 right-4 bg-transparent border-none text-white text-4xl cursor-pointer hover:text-[#bca68e] transition-colors z-10'
            aria-label='Close modal'
          >
            &times;
          </button>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {isZoomed && (
          <motion.div
            className='fixed inset-0 bg-black/80 z-[10000] flex items-center justify-center p-4 cursor-zoom-out'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsZoomed(false)}
          >
            <motion.img
              src={mainImageSrc}
              alt={`${product.name} - zoomed`}
              className='max-w-[90vw] max-h-[90vh] object-contain shadow-2xl rounded-lg'
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setIsZoomed(false)}
              className='absolute top-5 right-5 text-white text-3xl bg-black/50 rounded-full p-2 hover:bg-black/75 transition-colors'
              aria-label='Close zoomed image'
            >
              &times;
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductModal;
