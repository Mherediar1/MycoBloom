import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { IMAGES } from './CarouselImages';

export const Carousel = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setIndex((prev) => (prev + 1) % IMAGES.length);
  const prev = () => setIndex((prev) => (prev - 1 + IMAGES.length) % IMAGES.length);

  return (
    <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[21/9] rounded-[2rem] overflow-hidden group border border-white/5">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <img 
            src={IMAGES[index].url} 
            alt={IMAGES[index].title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/50 to-transparent opacity-95 carousel-overlay" />
          
          <div className="absolute bottom-0 left-0 p-5 sm:p-8 md:p-12 max-w-xl">
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-sans font-black tracking-tighter mb-2 text-accent uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] break-words whitespace-normal carousel-title"
            >
              {IMAGES[index].title}
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xs sm:text-sm md:text-base lg:text-lg text-white font-semibold drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] break-words whitespace-normal leading-snug carousel-desc"
            >
              {IMAGES[index].desc}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 flex items-center justify-between px-3 sm:px-6 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={prev}
          className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-accent hover:text-bg-dark transition-all shrink-0"
        >
          <ChevronLeft size={18} className="sm:w-6 sm:h-6" />
        </button>
        <button 
          onClick={next}
          className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-accent hover:text-bg-dark transition-all shrink-0"
        >
          <ChevronRight size={18} className="sm:w-6 sm:h-6" />
        </button>
      </div>

      <div className="absolute top-5 sm:top-8 right-5 sm:right-8 flex gap-1.5 sm:gap-2">
        {IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-1 transition-all duration-500 rounded-full ${i === index ? 'w-6 sm:w-8 bg-accent' : 'w-1.5 sm:w-2 bg-white/20'}`}
          />
        ))}
      </div>
    </div>
  );
};
