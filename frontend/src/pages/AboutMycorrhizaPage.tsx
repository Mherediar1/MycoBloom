import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sprout, Eye, Globe, Heart, Sparkles, Tractor, Compass, BookOpen } from 'lucide-react';

export const AboutMycorrhizaPage = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const sections = [
    {
      title: "¿Qué son las micorrizas arbusculares?",
      icon: <Sprout size={28} className="text-accent" />,
      tagline: "La red de ayuda bajo la tierra",
      content: "Básicamente, las micorrizas arbusculares son una sociedad de ayuda mutua entre ciertos hongos buenos del suelo y las raíces de las plantas. El hongo entra con mucho cuidado en las raíces de la planta, formando una especie de mini-árboles microscópicos de intercambio. A través de ellos, la planta le comparte al hongo el alimento que fabrica gracias a la luz del sol (azúcares), y a cambio, el hongo busca agua y nutrientes como el fósforo en lugares de la tierra donde las raíces de la planta jamás podrían llegar por sí solas."
    },
    {
      title: "¿Qué son las esporas?",
      icon: <Sparkles size={28} className="text-accent" />,
      tagline: "Las semillas protectoras del hongo",
      content: "Piensa en ellas como si fueran pequeñas semillas o cápsulas de supervivencia. Aunque técnicamente no son semillas, cumplen la misma función: ayudar a que el hongo se reproduzca y vuelva a crecer. Tienen unas capas protectoras muy duras que les permiten aguantar heladas, incendios o sequías extremas durante años. Cuando el suelo vuelve a estar húmedo y una planta cercana empieza a crecer, la espora 'despierta', saca un pequeño hilito y va directo a unirse a la raíz para empezar a trabajar juntos en su red de beneficio."
    },
    {
      title: "¿Cómo se observan bajo el microscopio?",
      icon: <Eye size={28} className="text-accent" />,
      tagline: "Joyas escondidas en la tierra",
      content: "Como son microscópicas, no vas a ver champiñones grandes en el campo. Para verlas en un laboratorio de forma sencilla, se toma una muestra de tierra de las raíces y se lava pasándola por coladores muy finos (tamices). Luego de centrifugarlas un momento en agua dulce con azúcar, se colocan bajo el lente de un microscopio común. ¡Ahí ocurre la magia! Se ven como pequeñas canicas brillantes amarillas, naranjas o rojizas. Parecen verdaderas piedras preciosas escondidas en una maceta."
    },
    {
      title: "Importancia ecológica",
      icon: <Globe size={28} className="text-accent" />,
      tagline: "El pegamento del suelo sano",
      content: "Sin estos hongos, muchas áreas verdes se convertirían gradulamente en desiertos secos. Al crecer, los finos hilos del hongo sostienen la tierra uniendo los granos sueltos de arena. Además, producen una sustancia natural pegajosa llamada glomalina que funciona como un pegamento ecológico. Esto ayuda a que el suelo respire mejor, retenga la humedad de las lluvias por más tiempo y no sea arrastrado fácilmente por los fuertes vientos de la temporada o tormentas."
    },
    {
      title: "Beneficios para las plantas",
      icon: <Heart size={28} className="text-accent" />,
      tagline: "Un escudo de protección natural",
      content: "Son el mejor chaleco de seguridad para tus cultivos. Una planta bien micorrizada soporta muchísimo mejor la falta de agua, tolera la sal del suelo y resiste de gran manera el ataque de plagas e insectos malos. Pero además, los hilos de los hongos conectan a varias plantas entre sí de forma subterránea, como una línea telefónica. Si una planta sufre el ataque de una plaga, puede enviarle señales químicas de alerta a su vecina bajo tierra para que empiece a preparar sus defensas biológicas."
    },
    {
      title: "Aplicaciones prácticas",
      icon: <Tractor size={28} className="text-accent" />,
      tagline: "Dile hola a la agricultura orgánica",
      content: "Hoy en día, estos hongos son los mejores aliados para una agricultura más verde y amigable. Se usan como fertilizantes orgánicos naturales, permitiendo que productores y familias cultiven alimentos sanos reduciendo bastante el uso de químicos tóxicos en el campo. También son la herramienta estrella para reforestar áreas dañadas por incendios o minería, logrando que los árboles jóvenes se agarren con fuerza de los suelos difíciles y no se sequen al poco tiempo."
    }
  ];

  const funFact = {
    title: "¿Sabías que les debemos la vida en la tierra?",
    icon: <BookOpen size={32} className="text-accent" />,
    tagline: "Compañeras desde hace millones de años",
    content: "Estos hongos son sumamente antiguos. Se han descubierto esporas fosilizadas idénticas a las actuales que datan de hace más de 450 millones de años. La ciencia afirma que cuando las primeras plantas salieron del agua para vivir en la tierra firme (que entonces era pura roca pelada sin nutrientes), solo pudieron sobrevivir porque estos amigables hongos se fusionaron con sus raíces primitivas para extraer fósforo y agua de la piedra estéril. ¡Sin este abrazo original bajo el suelo, hoy nuestro planeta sería inhabitable!"
  };

  return (
    <div className="py-12 md:py-24 space-y-16">
      <div className="bento-card max-w-[1200px] mx-auto p-5 sm:p-8 md:p-14 lg:p-16 relative overflow-hidden">
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 pointer-events-none grid grid-cols-4 grid-rows-4 opacity-[0.02]">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="border border-white" />
          ))}
        </div>
        <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="mb-12 sm:mb-16 relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 rounded-full text-accent text-[0.6rem] font-black uppercase tracking-widest mb-4 border border-accent/20 font-mono">
            <Compass size={14} className="shrink-0 animate-spin-slow" /> Enciclopedia MycoBloom
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-4 leading-none uppercase">
            Sobre las Micorrizas Arbusculares
          </h2>
          <p className="text-base sm:text-lg text-text-dim/90 font-semibold font-sans leading-relaxed max-w-2xl text-left">
            Te explicamos de forma simple, cercana y sin complicaciones cómo funcionan estas maravillas microscópicas encargadas de alimentar los bosques y proteger la vida de los cultivos agrícolas.
          </p>
        </div>

        {/* Content Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {sections.map((sec, idx) => (
            <motion.div
              key={idx}
              layoutId={`card-${idx}`}
              onClick={() => setActiveCard(activeCard === idx ? null : idx)}
              className={`p-6 sm:p-8 rounded-3xl border transition-all cursor-pointer select-none flex flex-col justify-between group h-full ${
                activeCard === idx
                  ? 'bg-accent/10 border-accent/40 shadow-xl shadow-accent/5 col-span-1 md:col-span-2 lg:col-span-3'
                  : 'bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.04]'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-white/5 dark:bg-white/5 rounded-2xl border border-white/10 shrink-0 group-hover:scale-105 transition-transform">
                    {sec.icon}
                  </div>
                  <span className="text-[0.6rem] md:text-[0.65rem] font-mono font-black text-accent/50 group-hover:text-accent tracking-widest uppercase">
                    Lección 0{idx + 1}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black tracking-tight text-white mb-1 uppercase group-hover:text-accent transition-colors">
                    {sec.title}
                  </h3>
                  <p className="text-xs font-black uppercase tracking-wider text-accent/80 opacity-90 font-mono mb-3">
                    {sec.tagline}
                  </p>
                  <motion.p
                    className={`text-sm md:text-base text-text-dim leading-relaxed font-medium transition-all ${
                      activeCard === idx ? 'opacity-100 line-clamp-none' : 'opacity-60 line-clamp-3'
                    }`}
                  >
                    {sec.content}
                  </motion.p>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[0.65rem] sm:text-[0.7rem] uppercase tracking-widest font-black text-accent/60 group-hover:text-accent">
                <span>{activeCard === idx ? "Haz clic para cerrar" : "Haz clic para leer completo"}</span>
                <span className="font-mono">{activeCard === idx ? "↑" : "↓"}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Highlighted Fun Fact Block */}
        <div className="mt-8 relative z-10 bg-gradient-to-r from-accent/10 to-[#122e1b]/20 border border-accent/30 rounded-3xl md:rounded-[2.5rem] p-6 sm:p-8 md:p-12 overflow-hidden flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 hover:border-accent/50 transition-colors">
          <div className="p-4 sm:p-5 bg-white/5 rounded-2xl border border-white/10 shrink-0 self-start md:self-center shadow-lg shadow-accent/10">
            {funFact.icon}
          </div>
          <div className="space-y-3 flex-1 min-w-0">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-accent/20 rounded-md text-accent text-[0.6rem] font-black uppercase tracking-widest font-mono">
              ★ Curiosidad Sorprendente
            </div>
            <h4 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase leading-none">
              {funFact.title}
            </h4>
            <p className="text-sm text-text-dim leading-relaxed font-semibold">
              {funFact.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
