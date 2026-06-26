
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FlaskConical, CloudLightning, Send, Search } from 'lucide-react';
import { MycoIdentification } from '../types';
import { ReportCard } from '../components/ReportCard';
import { MultiSelect } from '../components/MultiSelect';
import { SingleSelect } from '../components/SingleSelect';
import { saveIdentification } from '../utils/supabaseClient';

const WAIT_MESSAGES = [
  "Analizando morfología...",
  "Consultando bases taxonómicas...",
  "Contrastando caracteres...",
  "Calculando intervalos de confianza...",
  "Generando reporte técnico..."
];

const SHAPE_OPTIONS = [
  "globosa", "subglobosa", "ovoide", "elipsoide", "piriforme", "clavada", 
  "cilindrica", "oblonga", "reniforme", "fusiforme", "triangular", "recta", 
  "curvada", "recurvada", "irregular", "multiples", "cerebriforme", "fig_like", 
  "glomoide", "hipogea", "tuberculada", "alargada", "sesil"
];

const COLOR_OPTIONS = [
  "hialino", "blanco", "crema", "amarillo", "dorado", "ocre", "ambar", 
  "miel", "naranja", "rojo", "marron", "negro", "verdoso", "gris"
];

const WALL_OPTIONS = ["1", "2", "3", "4", "5", "6"];

const MELZER_OPTIONS = ["positiva", "negativa", "ninguna o sin_reporte", "ambas"];

const TEXTURE_OPTIONS = [
  "alveolada", "aspera", "cristalina", "estratificada", "fibrosa", "foveolada", 
  "granular", "laberintiforme", "laminada", "lisa", "membranosa", "mucilaginosa", 
  "ondulada", "ornamentada", "perforada", "reticulada", "rugosa", "scrobiculada", 
  "verrugosa", "delgada", "doble", "evanescente", "flexible", "gruesa", "hialina", 
  "sublaminada", "fragil", "quebradiza", "rigida", "semiflexible", "crestas", 
  "depresiones", "espinas", "estrias", "hoyos", "papilas", "protuberancias", 
  "proyecciones", "pustulas", "reticulo", "sin_ornamentacion"
];

const HYPHAL_OPTIONS = [
  "lateral", "saco_esporifero", "hifa_subtendente", "hifa_sustentora", "pedicelo", 
  "cicatriz", "cicatriz_denticulada", "sesil", "celula_bulbosa", "claviforme", 
  "intrahifal", "extradical", "intrarradical", "embudo", "acampanada", "recta", 
  "curvada", "recurvada", "con_septo", "septo_transversal", "septo_curvo", 
  "septo_grueso", "septo_laminado", "sin_septo", "poro_abierto", "poro_cerrado", 
  "poro_ocluido", "poro_tapon", "colapso", "presente", "no_observada", 
  "no_reportada", "simple", "terminal", "multiple"
];

const HOST_PLANT_OPTIONS = [
  "Poaceae", "Fabaceae", "Rubiaceae", "Malvaceae", "Caricaceae", "Euphorbiaceae", 
  "Solanaceae", "Rosaceae", "Fagaceae", "Asteraceae", "Plantaginaceae", "Lamiaceae", 
  "Rutaceae", "Cyperaceae", "Juncaceae", "Pinaceae", "Cupressaceae", "Myrtaceae", 
  "Multiples", "Vegetacion_mixta", "Plantas_nativas", "Herbaceas", "Arboles", 
  "Arbustos", "Cultivos", "Pastizal", "Vegetacion_tropical", "Vegetacion_costera", 
  "Halofitas", "No_reportada"
];

export const PredictPage = () => {
  const [formData, setFormData] = useState({
    sporeSize: "",
    shape: "",
    color: "",
    wallNumber: "",
    melzerReaction: "",
    hyphalConnection: "",
    texture: "",
    plantasHospederas: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<MycoIdentification | string | null>(null);
  const [loading, setLoading] = useState(false);
  const [waitMessageIndex, setWaitMessageIndex] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      interval = setInterval(() => {
        setWaitMessageIndex((prev) => (prev + 1) % WAIT_MESSAGES.length);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones visuales/obligatorias en campo por campo
    const validationErrors: Record<string, string> = {};
    if (!formData.sporeSize.trim()) {
      validationErrors.sporeSize = "Debe indicar el tamaño de la espora.";
    }
    if (!formData.shape.trim()) {
      validationErrors.shape = "Debe seleccionar una forma.";
    }
    if (!formData.color.trim()) {
      validationErrors.color = "Debe indicar el color dominante.";
    }
    if (!formData.wallNumber.trim()) {
      validationErrors.wallNumber = "Debe seleccionar un número de paredes.";
    }
    if (!formData.melzerReaction.trim()) {
      validationErrors.melzerReaction = "Debe seleccionar una reacción de Melzer.";
    }
    if (!formData.texture.trim()) {
      validationErrors.texture = "Debe indicar la textura.";
    }
    if (!formData.hyphalConnection.trim()) {
      validationErrors.hyphalConnection = "Debe seleccionar una conexión hifal.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    setResult(null);
    setWaitMessageIndex(0);

    let identification: MycoIdentification | any;

    try {
      const response = await fetch('/api/identify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.detail || errData.error || 'Error en el servicio');
      }
      
      const data = await response.json();
      
      // Normalizar confianza si viene en formato 0-1
      identification = {
        ...data,
        confidence: data.confidence <= 1 ? Math.round(data.confidence * 100) : data.confidence
      };
    } catch (err: any) {
      console.error(err);
      identification = err.message || "Error al conectar con el servidor.";
    }

    setResult(identification);
    setLoading(false);

    if (typeof identification !== 'string') {
      // Save identification asynchronously (handles cloud storage and local backups internally)
      saveIdentification(formData, identification)
        .then(({ savedToCloud }) => {
          if (savedToCloud) {
            console.log('[History System] Solicitud de identificación sincronizada en Supabase con éxito.');
          } else {
            console.warn('[History System] La base no está disponible. Resguardado en caché fuera de línea.');
          }
        })
        .catch(err => {
          console.error('[History System Error] Falló el guardado unificado:', err);
        });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (value.trim()) {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleMultiChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (value.trim()) {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  return (
    <div className="py-12 md:py-24 space-y-12">
      {/* Form Container */}
      <div className="bento-card p-5 sm:p-8 md:p-12 lg:p-16 border border-white/5 relative bg-gradient-to-br from-bg-dark to-[#0f0f0f]">
        {/* Decorative Grid Lines - Swiss Modernist Recipe wrapped in an overflow-hidden wrapper to prevent dropdowns from clipping while keeping lines bound within the card border */}
        <div className="absolute inset-0 rounded-[inherit] overflow-hidden pointer-events-none">
          <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 opacity-[0.03]">
              {Array.from({length: 16}).map((_, i) => <div key={i} className="border border-white" />)}
          </div>
        </div>

        <div className="space-y-10 relative z-10 max-w-4xl mx-auto">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 rounded-full text-accent text-[0.6rem] font-black uppercase tracking-widest mb-6 border border-accent/20">
              <FlaskConical size={14} /> Laboratorio Digital
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter mb-4 sm:mb-6 leading-none break-words whitespace-normal">Identificador de Especies</h2>
            <p className="text-base sm:text-lg md:text-xl text-text-dim leading-relaxed font-medium break-words whitespace-normal">
              Utiliza micro-datos taxonómicos para identificar el espécimen de HMA con el modelo entrenado de Machine Learning.
            </p>
          </div>

          <form onSubmit={handlePredict} className="space-y-6" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1">
                <div className="flex flex-col gap-3">
                  <label className="text-xs sm:text-sm font-bold text-text-main/90 font-sans tracking-wide">
                    Tamaño Espora <span className="normal-case opacity-80 font-mono italic">(µm)</span>
                  </label>
                  <input 
                    name="sporeSize"
                    type="text" 
                    value={formData.sporeSize} 
                    onChange={handleChange}
                    placeholder="Ej: 150-200"
                    className={`bg-white/[0.03] border text-white p-4 sm:p-5 rounded-2xl text-sm sm:text-base focus:border-accent outline-none transition-all focus:ring-1 focus:ring-accent font-mono ${
                      errors.sporeSize ? "border-red-500/50 bg-red-500/[0.01] shadow-[0_0_15px_rgba(239,68,68,0.1)] focus:border-red-500" : "border-white/10"
                    }`}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="none"
                    spellCheck="false"
                  />
                </div>
                {errors.sporeSize && (
                  <span className="text-red-400 text-xs font-semibold mt-1.5 block leading-none">
                    {errors.sporeSize}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <MultiSelect
                  label="Forma"
                  name="shape"
                  options={SHAPE_OPTIONS}
                  value={formData.shape}
                  onChange={handleMultiChange}
                  placeholder="Seleccionar formas..."
                  hasError={!!errors.shape}
                />
                {errors.shape && (
                  <span className="text-red-400 text-xs font-semibold mt-1.5 block leading-none">
                    {errors.shape}
                  </span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1">
                <MultiSelect
                  label="Color Dominante"
                  name="color"
                  options={COLOR_OPTIONS}
                  value={formData.color}
                  onChange={handleMultiChange}
                  placeholder="Seleccionar colores..."
                  hasError={!!errors.color}
                />
                {errors.color && (
                  <span className="text-red-400 text-xs font-semibold mt-1.5 block leading-none">
                    {errors.color}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <SingleSelect
                  label="Nº de Paredes"
                  name="wallNumber"
                  options={WALL_OPTIONS}
                  value={formData.wallNumber}
                  onChange={handleMultiChange}
                  placeholder="Seleccionar..."
                  hasError={!!errors.wallNumber}
                />
                {errors.wallNumber && (
                  <span className="text-red-400 text-xs font-semibold mt-1.5 block leading-none">
                    {errors.wallNumber}
                  </span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1">
                <SingleSelect
                  label="React. Melzer"
                  name="melzerReaction"
                  options={MELZER_OPTIONS}
                  value={formData.melzerReaction}
                  onChange={handleMultiChange}
                  placeholder="Seleccionar..."
                  hasError={!!errors.melzerReaction}
                />
                {errors.melzerReaction && (
                  <span className="text-red-400 text-xs font-semibold mt-1.5 block leading-none">
                    {errors.melzerReaction}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <MultiSelect
                  label="Textura"
                  name="texture"
                  options={TEXTURE_OPTIONS}
                  value={formData.texture}
                  onChange={handleMultiChange}
                  placeholder="Seleccionar texturas..."
                  hasError={!!errors.texture}
                />
                {errors.texture && (
                  <span className="text-red-400 text-xs font-semibold mt-1.5 block leading-none">
                    {errors.texture}
                  </span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1">
                <MultiSelect
                  label="Conexión Hifal"
                  name="hyphalConnection"
                  options={HYPHAL_OPTIONS}
                  value={formData.hyphalConnection}
                  onChange={handleMultiChange}
                  placeholder="Seleccionar conexiones hifales..."
                  hasError={!!errors.hyphalConnection}
                />
                {errors.hyphalConnection && (
                  <span className="text-red-400 text-xs font-semibold mt-1.5 block leading-none">
                    {errors.hyphalConnection}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <MultiSelect
                  label="Plantas Hospederas (Opcional)"
                  name="plantasHospederas"
                  options={HOST_PLANT_OPTIONS}
                  value={formData.plantasHospederas}
                  onChange={handleMultiChange}
                  placeholder="Seleccionar plantas hospederas..."
                />
              </div>
            </div>

            <button 
              disabled={loading}
              className="w-full bg-accent text-bg-dark py-4 sm:py-6 rounded-3xl font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-xxs sm:text-xs hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-accent/20 mt-4 h-14 sm:h-[70px]"
            >
              {loading ? (
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                  <CloudLightning size={20} className="sm:w-6 sm:h-6" />
                </motion.div>
              ) : <><Send size={18} className="sm:w-6 sm:h-6" /> Procesar Identificación IA</>}
            </button>
          </form>
        </div>
      </div>

      {/* Prediction Result Box (Full-width, styling copied from HistoryPage details block) */}
      <div className="bento-card p-5 sm:p-8 md:p-14 border border-white/10 relative overflow-hidden bg-white/[0.02] backdrop-blur-sm min-h-[300px]">
        <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none">
          <Search size={400} />
        </div>
        
        <AnimatePresence mode="wait">
          {!result && !loading && (
            <motion.div 
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col items-center justify-center text-center py-12 space-y-6"
            >
              <div className="w-20 h-20 rounded-[1.5rem] bg-white/5 flex items-center justify-center border border-white/10">
                <FlaskConical size={40} className="text-text-dim/20" />
              </div>
              <div className="max-w-xs">
                <h3 className="text-xl font-black text-text-dim/40 mb-2 uppercase tracking-tighter">Esperando Parámetros</h3>
                <p className="text-xs text-text-dim/20 font-bold uppercase tracking-widest">Completa el formulario y presiona Procesar para ver los resultados aquí abajo</p>
              </div>
            </motion.div>
          )}

          {loading && (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col items-center justify-center text-center py-12 space-y-8"
            >
              <div className="relative">
                <div className="w-24 h-24 rounded-full border-[8px] border-accent/10 border-t-accent animate-spin" />
                <FlaskConical size={32} className="absolute inset-0 m-auto text-accent" />
              </div>
              <div className="space-y-3">
                <h3 className="text-3xl font-black text-accent tracking-tighter uppercase">Identificando Especie</h3>
                <p className="text-sm text-text-dim uppercase tracking-[0.2em] font-mono h-4">
                   {WAIT_MESSAGES[waitMessageIndex]}
                </p>
              </div>
            </motion.div>
          )}

          {result && (
            <motion.div 
              key="result"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1"
            >
              {typeof result === 'string' ? (
                <div className="flex-1 flex flex-col items-center justify-center p-12 bg-red-400/10 border border-red-400/20 rounded-3xl h-full">
                  <CloudLightning size={48} className="text-red-400 mb-6 opacity-40 animate-pulse" />
                  <p className="text-lg font-black text-red-400 uppercase tracking-widest text-center">{result}</p>
                  <button onClick={() => setResult(null)} className="mt-8 text-[0.6rem] font-black uppercase tracking-widest text-red-400/60 hover:text-red-400">Reintentar</button>
                </div>
              ) : (
                <ReportCard result={result} />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
