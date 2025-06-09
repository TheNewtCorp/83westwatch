import React from 'react';
import { motion } from 'framer-motion';

interface GlobalPreloaderProps {
  message: string;
}

const GlobalPreloader: React.FC<GlobalPreloaderProps> = ({ message }) => {
  return (
    <motion.div
      className="fixed inset-0 bg-[#0a0a0a]/95 z-[10001] flex flex-col items-center justify-center text-white px-4 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* You can add your logo or a relevant icon here if desired */}
      {/* <img src="/public/83Westv2.png" alt="Loading" className="w-24 h-24 mb-6 opacity-50" /> */}
      <div className="text-2xl font-['Georgia',_serif] tracking-wider mb-6">
        {message}
      </div>
      <div className="w-10 h-10 border-4 border-t-[#bca68e] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
    </motion.div>
  );
};

export default GlobalPreloader;