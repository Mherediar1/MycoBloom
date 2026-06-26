
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sprout, ArrowRight } from 'lucide-react';
import { Carousel } from '../components/Carousel';

export const Home = () => {
  return (
    <div className="flex flex-col gap-8 md:gap-12 py-8 md:py-20 animate-fade-in max-w-full overflow-hidden">
      <div className="bento-card relative z-10 p-5 sm:p-8 md:p-14 lg:p-20 overflow-hidden group">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-accent/10 blur-[100px] sm:blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        
        <div className="max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-accent/10 rounded-full text-accent text-[0.6rem] sm:text-[0.65rem] font-black uppercase tracking-[0.3em] mb-6 sm:mb-8"
          >
            <Sprout size={14} className="shrink-0" /> Inteligencia Micorrízica
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl xs:text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black mb-6 sm:mb-10 leading-[0.9] tracking-tighter break-words whitespace-normal"
          >
            Explora lo <br /> <span className="text-accent underline decoration-accent/10 underline-offset-[10px] sm:underline-offset-[16px]">Invisible.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-text-dim leading-snug md:leading-normal mb-10 sm:mb-14 font-medium opacity-80 break-words whitespace-normal"
          >
            Aplicación web desarrollada como trabajo de titulación para apoyar la identificación de micorrizas arbusculares mediante técnicas de aprendizaje automático y características morfológicas.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6"
          >
            <Link to="/analizador" className="group/btn relative bg-accent text-bg-dark px-8 sm:px-10 py-4 sm:py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs sm:text-sm overflow-hidden flex items-center justify-center gap-3 w-full sm:w-auto text-center shrink-0">
              <span className="relative z-10">Comenzar Análisis</span>
              <ArrowRight className="relative z-10 transition-transform group-hover/btn:translate-x-2 shrink-0" size={18} />
              <div className="absolute inset-0 bg-white scale-x-0 group-hover/btn:scale-x-100 transition-transform origin-left duration-500 opacity-20" />
            </Link>
            <Link to="/sobre-micorrizas" className="px-8 sm:px-10 py-4 sm:py-5 rounded-[2rem] border border-white/20 text-white font-black uppercase tracking-[0.2em] text-xs sm:text-sm hover:bg-white/5 transition-colors flex items-center justify-center w-full sm:w-auto text-center select-none">
              Aprender Más
            </Link>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Carousel />
      </motion.div>
    </div>
  );
};
