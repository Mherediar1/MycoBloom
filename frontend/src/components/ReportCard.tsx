
import { useState } from 'react';
import { CheckCircle2, Trees, Navigation, ExternalLink, CircleDot, Maximize2, Layers, FlaskConical, ChevronDown, ChevronUp, Dna } from 'lucide-react';
import { motion } from 'framer-motion';
import { MycoIdentification } from '../types';

interface ReportCardProps {
  result: MycoIdentification;
}

export const ReportCard = ({ result }: ReportCardProps) => {
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);

  const isProvisional = result.species ? /(\s|^)sp\d*(\s|$|\.)/i.test(result.species) : false;
  
  const extractGenus = (speciesName: string) => {
    if (!speciesName) return "Desconocido";
    const parts = speciesName.trim().split(/\s+/);
    return parts[0] || "Desconocido";
  };
  const genus = extractGenus(result.species);

  return (
    <div className="space-y-12">
      {/* Header with Species (No confidence percentage shown) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-10">
        <div className="flex-1 min-w-0">
          <div className="inline-flex items-center gap-2 text-accent mb-4 px-3 py-1 bg-accent/10 rounded-full">
            <CheckCircle2 size={18} className="shrink-0" />
            <span className="text-[0.6rem] font-black uppercase tracking-[0.2em] leading-none">Identificación de Laboratorio</span>
          </div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black italic leading-none tracking-tighter mb-4 text-white uppercase break-words whitespace-normal leading-[1.05]">{result.species}</h3>
          <p className="text-lg md:text-xl text-text-dim font-bold uppercase tracking-[0.1em] opacity-60 break-words">Familia {result.family}</p>
        </div>
      </div>

      {/* Metadata Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 border-b border-white/5 pb-10">
        {[
          { label: "Vegetación", value: result.vegetation, icon: Trees },
          { label: "Hábitat", value: result.habitat, icon: Navigation },
          { label: "País", value: result.country, icon: ExternalLink },
          { label: "Localidad", value: result.locality, icon: CircleDot }
        ].map((item, i) => (
          <div key={i} className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 space-y-2 hover:bg-white/[0.04] transition-all duration-300">
            <div className="flex items-center gap-2 text-text-dim opacity-50">
              <item.icon size={12} className="text-accent shrink-0" />
              <span className="text-[0.6rem] font-black uppercase tracking-[0.2em]">{item.label}</span>
            </div>
            <p className="text-xs md:text-sm font-bold text-white uppercase tracking-tight font-mono break-words whitespace-normal leading-relaxed">{item.value || "N/A"}</p>
          </div>
        ))}
      </div>

      {/* Description & Particularity */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        <div className="xl:col-span-2 space-y-8">
          {/* Alerta de Estado Taxonómico para Identificaciones Provisionales */}
          {isProvisional && (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 md:p-8 bg-accent/5 hover:bg-accent/[0.08] transition-all duration-300 border border-accent/20 rounded-2xl md:rounded-[2rem] space-y-6 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-accent/5 blur-3xl rounded-full pointer-events-none group-hover:bg-accent/10 transition-colors" />
              
              <div className="flex items-start gap-4">
                <div className="p-3 bg-accent/10 rounded-2xl text-accent border border-accent/25 shrink-0">
                  <Dna size={22} className="animate-pulse" />
                </div>
                <div>
                  <h4 className="text-[0.65rem] sm:text-xs font-black uppercase tracking-[0.25em] text-accent font-mono mb-1">Estado Taxonómico</h4>
                  <p className="text-sm md:text-base font-bold text-white uppercase tracking-tight">Identificación provisional a nivel de género</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-white/5 relative z-10">
                <div className="space-y-1">
                  <span className="text-[0.6rem] uppercase tracking-[0.2em] text-text-dim opacity-50 block font-mono">Nombre de Referencia</span>
                  <span className="text-sm font-semibold italic text-white">{result.species}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[0.6rem] uppercase tracking-[0.2em] text-text-dim opacity-50 block font-mono">Género Biológico</span>
                  <span className="text-sm font-black italic text-accent">{genus}</span>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/5 relative z-10">
                <div className="space-y-2">
                  <span className="text-[0.6rem] uppercase tracking-[0.2em] text-text-dim opacity-50 block font-mono">Descripción Estado</span>
                  <p className="text-xs md:text-sm text-text-dim leading-relaxed font-semibold">
                    Este registro corresponde a un morfotipo o taxón identificado únicamente hasta el nivel de género. La especie específica no ha sido determinada o descrita formalmente en la literatura científica disponible.
                  </p>
                </div>
                <div className="space-y-1.5 p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                  <span className="text-[0.6rem] uppercase tracking-[0.2em] text-accent opacity-80 block font-mono">Observación Científica</span>
                  <p className="text-xs text-text-dim/80 leading-relaxed font-semibold italic">
                    La denominación "sp" seguida de un número suele utilizarse para diferenciar morfotipos o entidades biológicas distintas dentro de estudios taxonómicos, ecológicos o moleculares cuando aún no existe una asignación formal de especie.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-accent flex items-center gap-3 font-sans text-wrap">
              <span className="w-10 h-[1px] bg-accent/30 shrink-0" /> Información General
            </h4>
            <p className="text-base md:text-lg lg:text-xl text-text-main leading-relaxed font-medium opacity-90 break-words whitespace-normal">{result.description}</p>
          </div>
          <div className="space-y-4 p-6 md:p-8 bg-accent/5 rounded-2xl md:rounded-[2rem] border border-accent/10">
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-accent font-mono">Particularidad</h4>
            <p className="text-sm md:text-base lg:text-lg text-white font-bold italic break-words whitespace-normal">"{result.particularity}"</p>
          </div>

          {/* Collapsible Technical Details Panel */}
          <div className="space-y-4 pt-2">
            <button
              onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
              className="flex items-center justify-between gap-4 px-6 py-4 bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 rounded-2xl text-[0.7rem] sm:text-xs font-black uppercase tracking-[0.2em] text-white transition-all group cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <FlaskConical size={16} className="text-accent shrink-0" />
                <span>{showTechnicalDetails ? "Ocultar detalles técnicos" : "Ver detalles técnicos"}</span>
              </span>
              {showTechnicalDetails ? (
                <ChevronUp size={16} className="text-accent group-hover:-translate-y-0.5 transition-transform shrink-0" />
              ) : (
                <ChevronDown size={16} className="text-accent group-hover:translate-y-0.5 transition-transform shrink-0" />
              )}
            </button>

            {showTechnicalDetails && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white/[0.02] border border-white/5 p-6 md:p-8 rounded-2xl md:rounded-[2rem] space-y-6"
              >
                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-accent flex items-center gap-2">
                  <FlaskConical size={14} className="text-accent shrink-0 animate-pulse" /> Microdatos Biológicos y de Suelo
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  <div className="space-y-1">
                    <span className="text-[0.6rem] uppercase tracking-wider text-text-dim opacity-40 block">Estructura Pared</span>
                    <span className="text-xs md:text-sm font-bold text-white uppercase break-words whitespace-normal block">{result.tipo_pared || "N/A"}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[0.6rem] uppercase tracking-wider text-text-dim opacity-40 block">Textura del Suelo</span>
                    <span className="text-xs md:text-sm font-bold text-white uppercase break-words whitespace-normal block">{result.textura_suelo || "N/A"}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[0.6rem] uppercase tracking-wider text-text-dim opacity-40 block">Suelo pH</span>
                    <span className="text-xs md:text-sm font-bold text-white uppercase font-mono break-words whitespace-normal block">{result.ph_suelo || "N/A"}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[0.6rem] uppercase tracking-wider text-text-dim opacity-40 block">Temperatura</span>
                    <span className="text-xs md:text-sm font-bold text-white uppercase break-words whitespace-normal block">{result.temperatura_rango || "N/A"}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[0.6rem] uppercase tracking-wider text-text-dim opacity-40 block">Altitud msnm</span>
                    <span className="text-xs md:text-sm font-bold text-white uppercase break-words whitespace-normal block">{result.altitud_msnm || "N/A"}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[0.6rem] uppercase tracking-wider text-text-dim opacity-40 block">Marcador ADN (ITS)</span>
                    <span className="text-xs md:text-sm font-bold text-accent font-mono break-words whitespace-normal block">{result.cluster_ITS || "N/A"}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[0.6rem] uppercase tracking-wider text-text-dim opacity-40 block">Clado Genético</span>
                    <span className="text-xs md:text-sm font-bold text-white font-mono break-words whitespace-normal block">{result.cluster_genetico || "N/A"}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[0.6rem] uppercase tracking-wider text-text-dim opacity-40 block">Similitud ADN %</span>
                    <span className="text-xs md:text-sm font-black text-accent font-sans tracking-normal break-words whitespace-normal block">{result.genetic_similarity_pct || "N/A"}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Alternative Species */}
        <div className="space-y-8 bg-white/[0.02] p-6 md:p-8 rounded-[2rem] border border-white/5 h-fit">
          <h4 className="text-xs font-black uppercase tracking-[0.3em] text-white flex items-center gap-3">
            <Layers size={16} className="text-accent shrink-0" /> Similitudes
          </h4>
          <div className="space-y-6">
            {result.alternativeSpecies.length > 0 ? (
              result.alternativeSpecies.map((alt, i) => (
                <div key={i} className="space-y-3">
                  <div className="flex justify-between text-[0.65rem] font-black uppercase tracking-wider gap-4">
                    <span className="text-text-dim italic break-words flex-1 min-w-0">{alt.name}</span>
                    <span className="text-accent font-sans font-black tracking-normal shrink-0">{alt.similarity}%</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden similarity-track">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${alt.similarity}%` }}
                      className="h-full bg-white/20 similarity-bar" 
                    />
                  </div>
                </div>
              ))
            ) : (
                <p className="text-[0.65rem] text-text-dim uppercase tracking-widest text-center opacity-40 py-4">No se detectaron especies cercanas</p>
            )}
          </div>
        </div>
      </div>

      {/* Recommendations and Search */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-white/5 pt-10">
        <div className="space-y-6">
          <h4 className="text-sm font-black uppercase tracking-widest text-accent flex items-center gap-3">
            <CheckCircle2 size={18} className="text-accent shrink-0" /> Recomendaciones
          </h4>
          <ul className="space-y-4">
            {result.recommendations.map((rec, i) => (
              <li key={i} className="text-sm text-text-dim flex gap-4 leading-relaxed font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                <span className="break-words whitespace-normal flex-1 min-w-0">{rec}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6 flex flex-col justify-between h-full">
          <div className="space-y-4">
            <h4 className="text-sm font-black uppercase tracking-widest text-accent flex items-center gap-3">
              <Dna size={18} className="text-accent shrink-0 animate-pulse" /> Investigación Adicional
            </h4>
            <p className="text-xs md:text-sm text-text-dim leading-relaxed font-semibold">
              Obtén acceso directo a reportes científicos consolidados, revisiones filogenéticas recientes y bases bibliográficas sobre <span className="italic font-bold text-white uppercase">{result.species}</span> mediante nuestro motor de búsqueda profunda.
            </p>
          </div>
          <div className="pt-4 flex">
            <a 
              href={`https://perplexity.ai/search?q=${encodeURIComponent("Proporciona información detallada sobre los datos morfológicos, datos genéticos, características taxonómicas, hábitat, distribución geográfica y particularidades biológicas de la especie " + result.species)}`}
              target="_blank"
              referrerPolicy="no-referrer"
              className="inline-flex items-center justify-center gap-3 bg-white/5 border border-white/10 px-6 md:px-8 py-4 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-[0.2em] hover:bg-white/10 hover:border-accent/40 hover:text-accent transition-all group w-full text-center"
            >
              <Maximize2 size={16} className="text-accent group-hover:rotate-45 transition-transform shrink-0" />
              <span>Búsqueda Profunda (Base Taxonómica)</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
