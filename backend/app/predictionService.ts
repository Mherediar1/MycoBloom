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

export async function identifyMycorrhizaBackend(params: any): Promise<MycoIdentification | string> {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/identify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params)
    });

    if (response.ok) {
      const result = await response.json();
      console.log("[Node Backend] Respuesta recibida con éxito de FastAPI:", result.species);
      return result as MycoIdentification;
    } else {
      let errDetail = `Error ${response.status}`;
      try {
        const errJson = await response.json();
        errDetail = errJson.detail || errJson.error || errDetail;
      } catch {}
      console.warn("[Node Backend] FastAPI retornó código de error:", response.status, errDetail);
      return errDetail;
    }
  } catch (error: any) {
    console.error("[Node Backend] Error al contactar con el backend FastAPI:", error);
    return "Error al conectar con el motor de predicción de FastAPI.";
  }
}
