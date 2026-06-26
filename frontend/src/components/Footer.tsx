
import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="py-12 md:py-20 border-t border-white/5 bg-bg-dark/40 backdrop-blur-3xl w-full px-4 sm:px-6">
      <div className="max-w-[1240px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-8 mb-12 md:mb-20">
          <div className="md:col-span-12 lg:col-span-5 space-y-4 md:space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shadow-lg shadow-accent/20">
                <Leaf className="text-bg-dark" size={18} />
              </div>
              <span className="text-xl font-black tracking-tight text-accent uppercase">Myco<span className="text-white">bloom</span></span>
            </div>
            <p className="text-sm text-text-dim leading-relaxed font-semibold max-w-md">
              Aplicación web desarrollada como trabajo de titulación para apoyar la identificación de micorrizas arbusculares mediante técnicas de aprendizaje automático y características morfológicas.
            </p>
          </div>
          
          <div className="md:col-span-4 lg:col-span-2 space-y-4 md:space-y-6">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white">Navegación</h4>
            <div className="flex flex-col gap-3 text-sm text-text-dim font-semibold">
              <Link to="/" className="hover:text-accent transition-colors w-fit">Inicio</Link>
              <Link to="/analizador" className="hover:text-accent transition-colors w-fit">Analizador</Link>
              <Link to="/historial" className="hover:text-accent transition-colors w-fit">Historial</Link>
            </div>
          </div>

          <div className="md:col-span-4 lg:col-span-3 space-y-4 md:space-y-6">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white">Recursos</h4>
            <div className="flex flex-col gap-3 text-sm text-text-dim font-semibold">
              <Link to="/sobre-micorrizas" className="hover:text-accent transition-colors w-fit">Sobre las Micorrizas Arbusculares</Link>
              <Link to="/guia-de-campo" className="hover:text-accent transition-colors w-fit">Guía de Campo</Link>
            </div>
          </div>

          <div className="md:col-span-4 lg:col-span-2 space-y-4 md:space-y-6">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white">Tecnologías</h4>
            <div className="flex flex-wrap gap-2 max-w-xs">
              {["React", "TypeScript", "Vite", "FastAPI", "Python", "Scikit-Learn"].map((tech) => (
                <span 
                  key={tech} 
                  className="bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold text-accent/90 uppercase tracking-widest leading-none select-none hover:bg-white/10 hover:border-accent/20 transition-all"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 text-[0.7rem] text-text-dim font-black uppercase tracking-[0.2em] opacity-55 text-center sm:text-left space-y-2">
          <div>© 2026 MycoBloom | Prototipo Académico de Titulación</div>
          <div className="text-accent/90 font-bold">Universidad Politécnica Salesiana</div>
        </div>
      </div>
    </footer>
  );
};
