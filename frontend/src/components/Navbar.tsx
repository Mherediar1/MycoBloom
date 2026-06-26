
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf, Menu, X, Contrast } from 'lucide-react';

export const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [highContrast, setHighContrast] = useState(() => {
    return localStorage.getItem('mycobloom-high-contrast') === 'true';
  });

  // Toggle body high-contrast class on highContrast state change
  useEffect(() => {
    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
    localStorage.setItem('mycobloom-high-contrast', String(highContrast));
  }, [highContrast]);

  // Close mobile menu when Route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/analizador', label: 'Analizador' },
    { path: '/historial', label: 'Historial' },
    { path: '/guia-de-campo', label: 'Guía de Campo' },
    { path: '/sobre-micorrizas', label: 'Micorrizas Arbusculares' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bg-dark/80 backdrop-blur-xl border-b border-white/5 h-[80px] flex items-center">
      <div className="max-w-[1240px] mx-auto w-full flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-accent flex items-center justify-center shadow-lg shadow-accent/20 transition-transform group-hover:rotate-12">
            <Leaf className="text-bg-dark" size={18} />
          </div>
          <span className="text-xl sm:text-2xl font-black tracking-tight text-accent">MYCO<span className="text-white">BLOOM</span></span>
        </Link>
        
        {/* Desktop Links */}
        <div className="hidden lg:flex xl:gap-8 lg:gap-5 text-xs font-bold uppercase tracking-widest">
          {navLinks.map((link) => (
            <Link 
               key={link.path}
              to={link.path} 
              className={`${location.pathname === link.path ? 'text-accent' : 'text-text-dim hover:text-white'} transition-colors`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 shrink-0">
          <button
            onClick={() => setHighContrast(!highContrast)}
            className="p-2.5 text-white bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 group shrink-0"
            title={highContrast ? "Desactivar modo lectura" : "Activar modo lectura (Letras negras)"}
            aria-label="Toggle High Contrast Mode"
          >
            <Contrast size={16} className={`transition-transform duration-500 group-hover:rotate-180 ${highContrast ? "text-accent animate-pulse" : "text-text-dim"}`} />
            <span className="hidden lg:inline text-[10px] font-black uppercase tracking-widest leading-none">Lectura</span>
          </button>

          <Link to="/analizador" className="hidden sm:inline-flex bg-white/5 border border-white/10 text-white px-4 sm:px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-[0.2em] hover:bg-accent hover:text-bg-dark transition-all active:scale-95 text-center">
            Identificar
          </Link>

          {/* Hamburger Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-white bg-white/[0.04] border border-white/5 hover:border-white/10 rounded-xl transition-all focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 top-[80px] z-40 bg-bg-dark/95 backdrop-blur-2xl lg:hidden flex flex-col p-8 border-t border-white/5"
          style={{ height: 'calc(100vh - 80px)' }}
        >
          <nav className="flex flex-col gap-6 text-xl font-black uppercase tracking-widest mt-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center justify-between border-b border-white/[0.03] pb-4 ${
                  location.pathname === link.path ? 'text-accent border-b-accent/20' : 'text-text-dim hover:text-white'
                } transition-colors`}
              >
                <span>{link.label}</span>
                <span className="text-xs font-mono opacity-20">/0{navLinks.indexOf(link) + 1}</span>
              </Link>
            ))}
          </nav>
          
          <div className="mt-auto pt-8 space-y-3">
            <button
              onClick={() => setHighContrast(!highContrast)}
              className="w-full bg-white/5 border border-white/10 py-4 rounded-xl text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-colors text-white active:scale-95"
            >
              <Contrast size={18} className={highContrast ? "text-accent" : ""} />
              <span>{highContrast ? "Lectura Atractivo (Blanco)" : "Modo Lectura Directo"}</span>
            </button>
            <Link 
              to="/analizador" 
              className="w-full bg-accent text-bg-dark py-4 rounded-xl text-sm font-black uppercase tracking-[0.2em] flex items-center justify-center hover:bg-white hover:text-bg-dark transition-colors text-center"
            >
              Iniciar Análisis
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
