
import { Router } from "express";
import { identifyMycorrhizaBackend } from "./predictionService.js";

const router = Router();

// Middleware de log simple
router.use((req, res, next) => {
  console.log(`[API] ${req.method} ${req.url}`);
  next();
});

router.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

router.post("/identify", async (req, res) => {
  try {
    const params = req.body;
    
    // Validación de entrada para IA
    if (!params.sporeSize || !params.shape) {
      return res.status(400).json({ error: "Faltan parámetros de entrada necesarios (Tamaño, Forma)." });
    }

    const result = await identifyMycorrhizaBackend(params);
    
    if (typeof result === "string") {
      return res.status(500).json({ error: result });
    }
    
    res.json(result);
  } catch (error) {
    console.error("Identify Endpoint Error:", error);
    res.status(500).json({ error: "Ocurrió un error inesperado al procesar la identificación." });
  }
});

export default router;
