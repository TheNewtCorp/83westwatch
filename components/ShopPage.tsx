import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ProductModal from './ProductModal';
import { Product } from '../types'; // Import Product from types.ts

const pageTransitionProps = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -15 },
  transition: { duration: 0.3, ease: 'easeInOut' },
};

const ShopPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getImagePath = (imageIdentifier: string): string => {
    // Ensure the identifier from products.json (e.g., "/DSC_3715") is correctly formed.
    const baseName = imageIdentifier.startsWith('/') ? imageIdentifier : `/${imageIdentifier}`;
    let fullPath = `/public${baseName}`;

    // Check if the identifier already includes a common image extension.
    if (/\.(jpeg|jpg|gif|png|webp)$/i.test(baseName)) {
      // If products.json has "/DSC_3715.jpg", fullPath is now "/public/DSC_3715.jpg"
      return fullPath;
    }
    // If no extension, default to .jpg
    // fullPath is now "/public/DSC_3715", becomes "/public/DSC_3715.jpg"
    return `${fullPath}.jpg`;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('/public/products.json'); // Fetch from /public directory
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError('An unknown error occurred');
        }
        console.error('Failed to fetch products:', e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return (
      <motion.div {...pageTransitionProps} className='text-center text-white py-10 text-2xl'>
        Loading products...
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div {...pageTransitionProps} className='text-center text-red-500 py-10 text-2xl'>
        Error loading products: {error}
      </motion.div>
    );
  }

  return (
    <motion.div {...pageTransitionProps} className='py-10 px-4'>
      <h1 className="text-4xl font-['Georgia',_serif] text-white text-center mb-12">Our Collection</h1>
      <div className='flex flex-wrap justify-center gap-x-8 gap-y-12 mb-10'>
        {products.map((product) => (
          <motion.div
            key={product.id}
            className='bg-transparent p-0 text-center w-[280px] cursor-pointer group'
            onClick={() => setSelectedProduct(product)}
            layoutId={`card-${product.id}`}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <motion.img
              src={getImagePath(product.images[0])}
              alt={product.name}
              className='w-full max-w-[280px] aspect-square object-cover rounded-lg mb-5 mx-auto shadow-xl group-hover:shadow-2xl transition-shadow'
              layoutId={`img-${product.id}`}
            />
            <motion.div
              className='text-white text-xl font-["Georgia",_serif] mb-1 group-hover:text-[#bca68e] transition-colors'
              layoutId={`name-${product.id}`}
            >
              {product.name}
            </motion.div>
            <motion.div className='text-gray-400 text-md mb-3' layoutId={`model-${product.id}`}>
              {product.model}
            </motion.div>
            <motion.div
              className='text-white text-2xl font-semibold text-[#FFFFF] group-hover:text-[#bca68e] transition-colors'
              layoutId={`price-${product.id}`}
            >
              ${product.price.toLocaleString()}
            </motion.div>
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
      </AnimatePresence>
    </motion.div>
  );
};

export default ShopPage;
