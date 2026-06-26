import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Layers, ArrowRight, Search, CircleDot, RefreshCw, AlertCircle } from 'lucide-react';
import { HistoryItem } from '../types';
import { ReportCard } from '../components/ReportCard';
import { getIdentifications, clearIdentifications, isSupabaseConfigured } from '../utils/supabaseClient';

export const HistoryPage = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const loadHistory = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await getIdentifications();
      setHistory(response.items);
      setIsOffline(response.isOffline);
      
      // Auto-select the first item if none is currently selected to populate detail view
      if (response.items.length > 0 && !selectedItem) {
        setSelectedItem(response.items[0]);
      }
    } catch (e: any) {
      console.error('[Load History Fail]:', e);
      setErrorMessage("No se pudo conectar a la base de datos de identificaciones.");
      setIsOffline(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const handleClearHistory = async () => {
    if (window.confirm("¿Estás seguro de que deseas borrar todo tu historial de este dispositivo? Esta acción eliminará los registros de Supabase y del almacenamiento de respaldo local.")) {
      try {
        await clearIdentifications();
        setHistory([]);
        setSelectedItem(null);
      } catch (e) {
        console.error("Error al limpiar historial:", e);
        alert("Ocurrió un error al limpiar el historial.");
      }
    }
  };

  return (
    <div className="py-12 md:py-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 w-full">
        <div>
          {/* Status badge cluster reflecting Cloud Synchronization telemetry */}
          <div className="flex flex-wrap gap-2 items-center mb-6">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[0.6rem] font-black uppercase tracking-widest border ${
              isOffline 
                ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' 
                : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
            }`}>
              <Layers size={14} /> {isOffline ? 'Memoria Local (Offline)' : 'En la Nube (Sincronizado)'}
            </div>
            
            {isSupabaseConfigured() ? (
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-[0.6rem] font-black uppercase tracking-widest">
                <CircleDot size={10} className="fill-emerald-400" /> Supabase Activo
              </div>
            ) : (
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-white/5 border border-white/10 rounded-full text-text-dim/60 text-[0.55rem] font-bold uppercase tracking-widest">
                <span>Modo Autónomo Local</span>
              </div>
            )}
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter leading-none">Tu Historial</h2>
          <p className="text-sm sm:text-base md:text-lg text-text-dim mt-4 font-bold font-sans uppercase tracking-wider opacity-70">
            Registro técnico de identificaciones previas en la nube.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button 
            type="button"
            onClick={loadHistory}
            disabled={loading}
            className="p-3 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest disabled:opacity-50"
            title="Refrescar historial"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            <span className="md:hidden">Refrescar</span>
          </button>

          {history.length > 0 && (
            <button 
              onClick={handleClearHistory}
              className="flex-1 md:flex-none px-6 py-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-red-500/20 transition-all text-center"
            >
              Limpiar Registro
            </button>
          )}
        </div>
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 bg-red-400/10 border border-red-400/20 rounded-2xl flex items-center gap-3 text-red-400 text-sm">
          <AlertCircle size={18} />
          <span>{errorMessage} - Operando con copia de seguridad local.</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-4 max-h-[350px] lg:max-h-[700px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-accent/20">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((n) => (
                <div key={n} className="w-full bento-card p-6 border border-white/5 animate-pulse bg-white/[0.01]">
                  <div className="h-3 w-16 bg-white/10 rounded mb-4" />
                  <div className="h-5 w-4/5 bg-white/10 rounded mb-3" />
                  <div className="h-4 w-2/5 bg-white/10 rounded" />
                </div>
              ))}
            </div>
          ) : history.length === 0 ? (
            <div className="bento-card p-8 md:p-12 text-center border-dashed border-white/5 opacity-50">
              <div className="w-16 h-16 rounded-full bg-white/5 mx-auto mb-6 flex items-center justify-center">
                <Search size={32} className="text-text-dim/20" />
              </div>
              <p className="text-sm font-black uppercase tracking-widest text-text-dim/40">Sin registros previos</p>
            </div>
          ) : (
            history.map((item) => (
              <button 
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className={`w-full text-left bento-card p-5 md:p-6 border transition-all hover:border-accent/40 group relative overflow-hidden ${
                  selectedItem?.id === item.id ? 'border-accent bg-accent/5' : 'border-white/5'
                }`}
              >
                <div className="flex justify-between items-start mb-4 relative z-10 w-full">
                  <div className="text-[0.6rem] font-black uppercase tracking-widest text-accent font-mono">{item.date}</div>
                  <ArrowRight size={14} className={`text-accent transition-transform ${
                    selectedItem?.id === item.id ? 'translate-x-1' : 'opacity-0 group-hover:opacity-100'
                  }`} />
                </div>
                <h4 className="text-base md:text-lg font-black uppercase tracking-tight text-white mb-2 relative z-10 break-words whitespace-normal">
                  {item.result.species}
                </h4>
                <div className="flex items-center gap-3 text-[0.65rem] text-text-dim font-bold uppercase tracking-wider relative z-10">
                  <span className="px-2 py-0.5 bg-[#4aa580]/10 border border-[#4aa580]/20 rounded-md text-accent font-mono font-black">
                    FAMILIA {item.result.family}
                  </span>
                </div>
                {selectedItem?.id === item.id && (
                  <div className="absolute top-0 right-0 w-16 h-16 bg-accent/5 blur-2xl rounded-full" />
                )}
              </button>
            ))
          )}
        </div>

        <div className="lg:col-span-2">
          {selectedItem ? (
            <motion.div 
              key={selectedItem.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bento-card p-5 sm:p-8 md:p-14 border border-white/10"
            >
              <ReportCard result={selectedItem.result} />
            </motion.div>
          ) : (
            <div className="bento-card min-h-[300px] h-full flex flex-col items-center justify-center text-center p-6 sm:p-12 md:p-20 border-dashed border-white/10">
              <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/5">
                <CircleDot size={48} className="text-text-dim/10" />
              </div>
              <h3 className="text-2xl font-black text-text-dim/40 uppercase tracking-tighter">Selecciona un registro</h3>
              <p className="text-sm text-text-dim/20 font-bold uppercase tracking-widest mt-2">
                Para ver el reporte técnico completo
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
