export const formatOptionLabel = (val: string): string => {
  if (!val) return "";
  
  const manualMappings: Record<string, string> = {
    // Shapes
    "globosa": "Globosa",
    "subglobosa": "Subglobosa",
    "ovoide": "Ovoide",
    "elipsoide": "Elipsoide",
    "piriforme": "Piriforme",
    "clavada": "Clavada",
    "cilindrica": "Cilíndrica",
    "oblonga": "Oblonga",
    "reniforme": "Reniforme",
    "fusiforme": "Fusiforme",
    "triangular": "Triangular",
    "recta": "Recta",
    "curvada": "Curvada",
    "recurvada": "Recurvada",
    "irregular": "Irregular",
    "multiples": "Múltiples",
    "cerebriforme": "Cerebriforme",
    "fig_like": "Fig-Like",
    "glomoide": "Glomoide",
    "hipogea": "Hipogea",
    "tuberculada": "Tuberculada",
    "alargada": "Alargada",
    "sesil": "Sésil",
    
    // Colors
    "hialino": "Hialino",
    "blanco": "Blanco",
    "crema": "Crema",
    "amarillo": "Amarillo",
    "dorado": "Dorado",
    "ocre": "Ocre",
    "ambar": "Ámbar",
    "miel": "Miel",
    "naranja": "Naranja",
    "rojo": "Rojo",
    "marron": "Marrón",
    "negro": "Negro",
    "verdoso": "Verdoso",
    "gris": "Gris",

    // Melzer
    "positiva": "Positiva",
    "negativa": "Negativa",
    "ninguna o sin_reporte": "Ninguna o Sin Reporte",
    "ambas": "Ambas",
    
    // Textures
    "alveolada": "Alveolada",
    "aspera": "Áspera",
    "cristalina": "Cristalina",
    "estratificada": "Estratificada",
    "fibrosa": "Fibrosa",
    "foveolada": "Foveolada",
    "granular": "Granular",
    "laberintiforme": "Laberintiforme",
    "laminada": "Laminada",
    "lisa": "Lisa",
    "membranosa": "Membranosa",
    "mucilaginosa": "Mucilaginosa",
    "ondulada": "Ondulada",
    "ornamentada": "Ornamentada",
    "perforada": "Perforada",
    "reticulada": "Reticulada",
    "rugosa": "Rugosa",
    "scrobiculada": "Scrobiculada",
    "verrugosa": "Verrugosa",
    "delgada": "Delgada",
    "doble": "Doble",
    "evanescente": "Evanescente",
    "flexible": "Flexible",
    "gruesa": "Gruesa",
    "hialina": "Hialina",
    "sublaminada": "Sublaminada",
    "fragil": "Frágil",
    "quebradiza": "Quebradiza",
    "rigida": "Rígida",
    "semiflexible": "Semiflexible",
    "crestas": "Crestas",
    "depresiones": "Depresiones",
    "espinas": "Espinas",
    "estrias": "Estrías",
    "hoyos": "Hoyos",
    "papilas": "Papilas",
    "protuberancias": "Protuberancias",
    "proyecciones": "Proyecciones",
    "pustulas": "Pústulas",
    "reticulo": "Retículo",
    "sin_ornamentacion": "Sin Ornamentación",
    
    // Hyphal connection
    "lateral": "Lateral",
    "saco_esporifero": "Saco Esporífero",
    "hifa_subtendente": "Hifa Subtendente",
    "hifa_sustentora": "Hifa Sustentora",
    "pedicelo": "Pedicelo",
    "cicatriz": "Cicatriz",
    "cicatriz_denticulada": "Cicatriz Denticulada",
    "celula_bulbosa": "Célula Bulbosa",
    "claviforme": "Claviforme",
    "intrahifal": "Intrahifal",
    "extradical": "Extradical",
    "intrarradical": "Intrarradical",
    "embudo": "Embudo",
    "acampanada": "Acampanada",
    "con_septo": "Con Septo",
    "septo_transversal": "Septo Transversal",
    "septo_curvo": "Septo Curvo",
    "septo_grueso": "Septo Grueso",
    "septo_laminado": "Septo Laminado",
    "sin_septo": "Sin Septo",
    "poro_abierto": "Poro Abierto",
    "poro_cerrado": "Poro Cerrado",
    "poro_ocluido": "Poro Ocluido",
    "poro_tapon": "Poro Tapón",
    "colapso": "Colapso",
    "presente": "Presente",
    "no_observada": "No Observada",
    "no_reportada": "No Reportada",
    "simple": "Simple",
    "terminal": "Terminal",
    "multiple": "Múltiple"
  };

  const lowered = val.toLowerCase().trim();
  if (manualMappings[lowered]) {
    return manualMappings[lowered];
  }

  // Fallback: replace underscores/dashes with space and capitalize each word
  return val
    .replace(/[_-]/g, ' ')
    .split(/\s+/)
    .map(word => {
      if (!word) return "";
      let startChar = "";
      let actualWord = word;
      if (word.startsWith('(')) {
        startChar = '(';
        actualWord = word.slice(1);
      }
      if (actualWord.length === 0) return startChar;
      return startChar + actualWord.charAt(0).toUpperCase() + actualWord.slice(1);
    })
    .join(' ');
};
