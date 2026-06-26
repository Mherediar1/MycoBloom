import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Maximize2, CircleDot, Palette, Layers, FlaskConical, GitCommit, Fingerprint, Trees, CheckCircle2, ChevronDown, Sparkles 
} from 'lucide-react';

export const FieldGuidePage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const parameters = [
    {
      name: "Tamaño de la espora",
      icon: <Maximize2 size={24} className="text-accent" />,
      tag: "Dimensión Física",
      desc: "Representa el contorno o diámetro volumétrico de la espora en micrómetros (µm). Facilita una primera clasificación crucial entre esporas diminutas y gigantes.",
      howTo: "Usa un micrómetro de ocular calibrado en un microscopio óptico combinando aumentos medios o altos (40x o 100x). Enfoca el eje más ancho y alineado de la espora para tomar su longitud real.",
      tip: "¡No confundas esporas individuales con agrupaciones densas como los esporocarpos! Toma lecturas de al menos 5 esporas independientes de la misma muestra para calcular una media estadística saludable."
    },
    {
      name: "Forma",
      icon: <CircleDot size={24} className="text-accent" />,
      tag: "Morfología Exterior",
      desc: "Es la figura geométrica natural tridimensional del cuerpo de la espora al desarrollarse libre en los poros del suelo.",
      howTo: "Obsérvala suspendida en agua o solución de conservación antes de aplicar excesiva fuerza física. Clasifícala según su simetría: redonda perfecta (globosa), ligeramente chata (subglobosa), ovalada como huevo (ovoide) o sin patrón regular (irregular).",
      tip: "Las esporas pueden deformarse por resequedad o si ejerces demasiada presión directa con el cubreobjetos al montar la placa. Compara siempre múltiples ejemplares para deducir la forma dominante legítima."
    },
    {
      name: "Color",
      icon: <Palette size={24} className="text-accent" />,
      tag: "Propiedades Cromáticas",
      desc: "Refleja el tono pigmentario del citoplasma interno y del complejo sistema de capas externas de la espora en estado maduro.",
      howTo: "Usa iluminación blanca neutra balanceada directa del microscopio. Detecta si la muestra es transparente-clara (hialina), amarilla vibrante, rojizo-miel, ámbar profundo o café oscuro chocolate.",
      tip: "Las esporas jóvenes e inmaduras suelen ser casi siempre transparentes o blancas límpidas. Procura buscar ejemplares que muestren hifas bien desarrolladas para determinar el color maduro final con total certeza."
    },
    {
      name: "Número de paredes",
      icon: <Layers size={24} className="text-accent" />,
      tag: "Estructura Celular",
      desc: "El conjunto de láminas o membranas concéntricas que protegen el material genético y las grasas del interior de la espora contra agentes hostiles.",
      howTo: "Aplica de manera muy controlada una fuerza diagonal o compresión suave directa sobre el cubreobjetos (la prueba 'squash') para que la espora se abra gradualmente. Esto separará las capas concéntricas permitiéndote contarlas.",
      tip: "Domina el juego con el tornillo micrométrico de tu microscopio. Subir y bajar ligeramente el plano focal de manera continua te dará una visión tridimensional de las paredes celulares sin romper necesariamente la muestra."
    },
    {
      name: "Reacción con Melzer",
      icon: <FlaskConical size={24} className="text-accent" />,
      tag: "Análisis Químico",
      desc: "Una reacción colorimétrica diagnóstica invaluable que utiliza reactivo de Melzer (yodo y yoduro de potasio) para detectar glúcidos y polisacáridos especializados en las capas de la espora.",
      howTo: "Coloca una pequeña microgota de Melzer en un costado de la placa y deja que se distribuya. Si las cubiertas celulares del hongo adquieren tonos rojizos-vino oscuros o púrpuras, la reacción es Positiva. Si queda inalterada, es Negativa.",
      tip: "Lava a fondo cualquier residuo de azúcar proveniente del proceso de pretratamiento y separación del suelo, ya que la presencia de sacarosa externa puede falsear los cambios colorimétricos alterando los resultados."
    },
    {
      name: "Conexión hifal",
      icon: <GitCommit size={24} className="text-accent" />,
      tag: "Punto de Inserción",
      desc: "Es la zona anatómica precisa donde la hifa suspensora se conecta a la base de la espora para alimentar y bombear los nutrientes de la simbiosis.",
      howTo: "Enfoca la espora en su base buscando la porción de filamento remanente. Observa la morfología de la unión: si es recta ordinaria (cilíndrica), ensanchada hacia afuera (conic-fina), inflada como ampolla (bulbosa) o sin ensanchamientos (simple).",
      tip: "Los rabillos de las hifas se desprenden fácilmente durante el lavado y centrifugado de la muestra en laboratorio. Investiga pacientemente buscando ejemplares que aún conserven parte de su conexión original intacta."
    },
    {
      name: "Textura",
      icon: <Fingerprint size={24} className="text-accent" />,
      tag: "Relieve Cuticular",
      desc: "Los pequeños patrones estéticos y ornamentales del exterior de la capa más superficial de la espora. No todas las especies poseen superficies finas o lisas.",
      howTo: "Establece el foco en la coordenada superior o plano tangencial del hemisferio superior de la espora. Identifica si es lisa y reluciente, o si presenta pequeñas espinas, canales sinuosos (estrías) o retículas de red.",
      tip: "Las arcillas microscópicas no lavadas y las basurillas finas de la muestra suelen pegarse en superficies perfectamente lisas simulando texturas rugosas. Limpia a conciencia las esporas antes del dictamen visual."
    },
    {
      name: "Plantas hospederas",
      icon: <Trees size={24} className="text-accent" />,
      tag: "Relación Ecológica",
      desc: "Describe las especies de árboles o cultivos con los que este hongo forma y sella alianzas preferentes bajo el suelo del campo.",
      howTo: "No busques este dato analizando físicamente la espora. Recopila meticulosamente el inventario florístico del suelo antes de desenterrar la muestra de tierra fértil (ej. maíz, café, gramíneas silvestres, leguminosas).",
      tip: "Para fines de agricultura de restauración, registra siempre qué plantas cultivadas crecen exuberantes sobre los focos donde extrajiste la muestra de micorrizas locales para potenciar tu biofertilizante."
    }
  ];

  const filteredParams = parameters.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="py-12 md:py-24 space-y-12">
      <div className="bento-card max-w-4xl mx-auto p-5 sm:p-8 md:p-14 lg:p-16 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[350px] h-[350px] bg-accent/5 blur-[90px] rounded-full pointer-events-none" />
        
        <div className="mb-10 sm:mb-14 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 rounded-full text-accent text-[0.6rem] font-black uppercase tracking-widest mb-4 border border-accent/20 font-mono">
            <BookOpen size={14} className="shrink-0" /> Laboratorio e Investigación
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-4 uppercase">
            Guía Técnica de Campo
          </h2>
          <p className="text-base sm:text-lg text-text-dim/90 font-semibold font-sans leading-relaxed max-w-2xl">
            Aprende a analizar, observar e identificar correctamente las variables morfológicas clave empleadas por nuestro Clasificador Inteligente de Micorrizas.
          </p>
        </div>

        {/* Dynamic Search Bar */}
        <div className="relative z-10 mb-8 sm:mb-12">
          <input 
            type="text"
            placeholder="Buscar variable morfológica... (ej: Melzer, tamaño, textura)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-14 bg-white/[0.03] hover:bg-white/[0.05] focus:bg-white/[0.06] border border-white/10 focus:border-accent/40 rounded-2xl px-6 text-sm text-white placeholder-text-dim/40 transition-all outline-none"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[0.65rem] font-black uppercase tracking-widest text-text-dim/60 hover:text-accent transition-colors"
            >
              Limpiar
            </button>
          )}
        </div>

        <div className="space-y-4 sm:space-y-5 relative z-10">
          {filteredParams.length > 0 ? (
            filteredParams.map((param, idx) => {
              const isOpened = openIndex === idx;
              return (
                <div 
                  key={idx} 
                  className={`border rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300 ${
                    isOpened 
                      ? 'bg-white/[0.03] border-accent/30 shadow-[0_8px_30px_rgb(0,0,0,0.12)]' 
                      : 'bg-white/[0.01] border-white/5 hover:bg-white/[0.02] hover:border-white/10'
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpened ? null : idx)}
                    className="w-full p-5 sm:p-7 flex items-center justify-between text-left gap-4 cursor-pointer"
                  >
                    <div className="flex items-center gap-4 sm:gap-6 min-w-0 flex-1">
                      <div className={`p-3 rounded-xl border transition-all ${
                        isOpened ? 'bg-accent/10 border-accent/20' : 'bg-white/5 border-white/10'
                      }`}>
                        {param.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-[0.55rem] sm:text-[0.6rem] font-black tracking-widest text-accent uppercase block mb-0.5 opacity-85">
                          {param.tag}
                        </span>
                        <h3 className="text-base sm:text-lg md:text-xl font-black text-white uppercase tracking-tight leading-tight">
                          {param.name}
                        </h3>
                      </div>
                    </div>
                    
                    <div className="p-1 rounded-full bg-white/5 border border-white/10">
                      <ChevronDown size={18} className={`text-accent transition-transform duration-500 shrink-0 ${isOpened ? 'rotate-180' : ''}`} />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpened && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-5 sm:px-7 pb-6 sm:pb-8 pt-1 space-y-5 border-t border-white/5 bg-accent/[0.01]">
                          {/* Desc */}
                          <div className="space-y-1">
                            <span className="text-[0.6rem] uppercase font-black tracking-widest text-accent/40 block">¿Qué es?</span>
                            <p className="text-sm sm:text-base text-text-dim leading-relaxed font-semibold">
                              {param.desc}
                            </p>
                          </div>

                          {/* How to Observe */}
                          <div className="space-y-1">
                            <span className="text-[0.6rem] uppercase font-black tracking-widest text-accent/40 block">¿Cómo observarlo en laboratorio?</span>
                            <p className="text-sm sm:text-base text-text-dim leading-relaxed font-semibold">
                              {param.howTo}
                            </p>
                          </div>

                          {/* Lab Tip box */}
                          <div className="p-4 sm:p-5 bg-accent/5 border border-accent/20 rounded-xl sm:rounded-2xl space-y-1">
                            <div className="flex items-center gap-1.5 text-accent text-[0.6rem] font-black uppercase tracking-widest">
                              <Sparkles size={12} className="shrink-0 animate-pulse" /> Consejo Práctico Mycobloom
                            </div>
                            <p className="text-xs sm:text-sm text-text-dim leading-relaxed font-bold">
                              {param.tip}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-[1.25rem] bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-text-dim/30">
                <CheckCircle2 size={32} />
              </div>
              <h4 className="text-lg font-black text-text-dim max-w-xs mx-auto">Sin Resultados Coincidentes</h4>
              <p className="text-xs text-text-dim/45 max-w-xs mx-auto">Prueba buscando otra característica o pulsa borrar en el buscador.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
