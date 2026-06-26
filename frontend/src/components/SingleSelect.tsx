import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { formatOptionLabel } from '../utils/format';

interface SingleSelectProps {
  label: string;
  name: string;
  options: string[];
  value: string;
  onChange: (name: string, newValue: string) => void;
  placeholder?: string;
  required?: boolean;
  hasError?: boolean;
}

export const SingleSelect: React.FC<SingleSelectProps> = ({
  label,
  name,
  options,
  value,
  onChange,
  placeholder = "Seleccionar...",
  required = false,
  hasError = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  const handleSelectOption = (option: string) => {
    onChange(name, option);
    setIsOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(name, "");
  };

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
        <div className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
          {value ? (
            <span className="text-white text-sm font-medium">
              {formatOptionLabel(value)}
            </span>
          ) : (
            <span className="text-white/40 text-sm font-medium">{placeholder}</span>
          )}
        </div>
        
        <div className="flex items-center gap-2 text-text-dim">
          {value && !required && (
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
        <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-[#141414] border border-white/15 rounded-2xl shadow-2xl z-50 p-4 max-h-[280px] overflow-y-auto space-y-1 backdrop-blur-md" style={{ scrollbarWidth: 'thin' }}>
          {options.map(opt => {
            const isSelected = value === opt;
            return (
              <div
                key={opt}
                onClick={() => handleSelectOption(opt)}
                className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                  isSelected
                    ? "bg-accent/10 text-accent font-semibold"
                    : "text-white/70 hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                <span>{formatOptionLabel(opt)}</span>
                {isSelected && <Check size={14} className="text-accent shrink-0" />}
              </div>
            );
          })}
        </div>
      )}
      
      {/* Hidden inputs to support standard HTML5 validation for form submissions */}
      <input
        type="text"
        tabIndex={-1}
        value={value}
        onChange={() => {}}
        required={required}
        className="absolute bottom-0 left-1/2 w-0 h-0 opacity-0 pointer-events-none"
      />
    </div>
  );
};
