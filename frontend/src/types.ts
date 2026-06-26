
export interface MycoIdentification {
  species: string;
  family: string;
  confidence: number;
  description: string;
  vegetation: string;
  habitat: string;
  country: string;
  locality: string;
  particularity: string;
  alternativeSpecies: { name: string; similarity: number }[];
  recommendations: string[];
  tips: string[];
  tipo_pared?: string;
  textura_suelo?: string;
  temperatura_rango?: string;
  ph_suelo?: string;
  altitud_msnm?: string;
  cluster_ITS?: string;
  cluster_genetico?: string;
  genetic_similarity_pct?: string;
}

export interface ThesisInput {
  tamano: string;
  forma: string;
  color: string;
  numero_paredes: number;
}

export interface HistoryItem {
  id: string;
  date: string;
  params: {
    sporeSize: string;
    shape: string;
    color: string;
    wallNumber: string;
    melzerReaction: string;
    hyphalConnection: string;
    texture: string;
    plantasHospederas?: string;
  };
  result: MycoIdentification;
}
