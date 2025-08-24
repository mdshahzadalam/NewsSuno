'use client';

import { motion } from 'framer-motion';

export default function TricolorBanner() {
  return (
    <div className="relative w-full overflow-hidden py-4 md:py-6">
      {/* Saffron Stripe */}
      <motion.div 
        className="h-12 md:h-16 w-full bg-[#FF9933] flex items-center justify-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2 
          className="text-lg md:text-2xl font-bold text-white text-center px-4"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Stay Informed with India's Latest News
        </motion.h2>
      </motion.div>
      
      {/* White Stripe with Ashoka Chakra */}
      <div className="h-12 md:h-16 w-full bg-white flex items-center justify-center relative">
        <motion.div 
          className="absolute w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-[#000080] flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(24)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-0.5 h-4 md:h-5 bg-[#000080]"
              style={{ transform: `rotate(${i * 15}deg) translateY(-6px)` }}
            />
          ))}
          <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#000080]" />
        </motion.div>
      </div>
      
      {/* Green Stripe */}
      <motion.div 
        className="h-12 md:h-16 w-full bg-[#138808] flex items-center justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.p 
          className="text-white text-sm md:text-base text-center px-4"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Bringing you the most relevant news from across the nation
        </motion.p>
      </motion.div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-30" />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-30" />
      </div>
    </div>
  );
}
