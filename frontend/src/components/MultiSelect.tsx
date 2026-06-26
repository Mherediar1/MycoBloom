import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, X, Search } from 'lucide-react';
import { formatOptionLabel } from '../utils/format';

interface MultiSelectProps {
  label: string;
  name: string;
  options: string[];
  value: string; // Comma separated string from form
  onChange: (name: string, newValue: string) => void;
  placeholder?: string;
  hasError?: boolean;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  label,
  name,
  options,
  value,
  onChange,
  placeholder = "Seleccionar opciones...",
  hasError = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedItems = value ? value.split(',').map(s => s.trim()).filter(Boolean) : [];

  const handleToggleOption = (option: string) => {
    let newItems: string[];
    if (selectedItems.includes(option)) {
      newItems = selectedItems.filter(item => item !== option);
    } else {
      newItems = [...selectedItems, option];
    }
    onChange(name, newItems.join(', '));
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(name, "");
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter(opt =>
    opt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    formatOptionLabel(opt).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`flex flex-col gap-3 relative ${isOpen ? "z-40" : "z-10"}`} ref={containerRef}>
      <label className="text-xs sm:text-sm font-bold text-text-main/90 font-sans tracking-wide">
        {label}
      </label>
      
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`min-h-[64px] bg-white/[0.03] border p-4 rounded-2xl flex items-center justify-between cursor-pointer hover:border-white/20 transition-all select-none gap-2 ${
          isOpen ? "border-accent" : hasError ? "border-red-500/50 bg-red-500/[0.01] shadow-[0_0_15px_rgba(239,68,68,0.1)]" : "border-white/10"
        }`}
      >
        <div className="flex flex-wrap gap-1.5 flex-1 max-w-[90%]">
          {selectedItems.length > 0 ? (
            selectedItems.map(item => (
              <span
                key={item}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent/10 border border-accent/20 text-accent text-xs font-bold rounded-lg transition-all hover:bg-accent/20"
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleOption(item);
                }}
              >
                {formatOptionLabel(item)}
                <X size={12} className="hover:text-white transition-colors" />
              </span>
            ))
          ) : (
            <span className="text-white/40 text-sm font-medium">{placeholder}</span>
          )}
        </div>
        
        <div className="flex items-center gap-2 text-text-dim">
          {selectedItems.length > 0 && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 hover:text-white transition-colors text-xs text-text-dim/60 font-mono tracking-widest uppercase mr-2"
            >
              Limpiar
            </button>
          )}
          <ChevronDown size={18} className={`transform transition-transform duration-200 ${isOpen ? "rotate-180 text-accent" : ""}`} />
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-[#141414] border border-white/15 rounded-2xl shadow-2xl z-50 p-4 space-y-3 max-h-[320px] flex flex-col backdrop-blur-md">
          <div className="relative flex items-center">
            <Search size={14} className="absolute left-3 text-white/40" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar opción..."
              onClick={(e) => e.stopPropagation()}
              className="w-full bg-white/[0.03] border border-white/5 pl-9 pr-4 py-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-accent font-mono placeholder-white/30"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck="false"
            />
          </div>

          <div className="overflow-y-auto flex-1 space-y-1 pr-1" style={{ scrollbarWidth: 'thin' }}>
            {filteredOptions.length > 0 ? (
              filteredOptions.map(opt => {
                const isSelected = selectedItems.includes(opt);
                return (
                  <div
                    key={opt}
                    onClick={() => handleToggleOption(opt)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                      isSelected
                        ? "bg-accent/10 text-accent font-semibold"
                        : "text-white/70 hover:bg-white/[0.04] hover:text-white"
                    }`}
                  >
                    <span>{formatOptionLabel(opt)}</span>
                    {isSelected && <Check size={14} className="text-accent" />}
                  </div>
                );
              })
            ) : (
              <div className="text-center text-text-dim/40 py-6 text-xs font-mono">
                No se encontraron opciones
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
