# MycoBloom

## Sistema Web para la Identificación de Hongos Micorrízicos Arbusculares mediante Aprendizaje Automático

**Trabajo de Titulación**  
**Universidad Politécnica Salesiana – Ecuador**

---

## Descripción

MycoBloom es una aplicación web desarrollada como trabajo de titulación que permite apoyar la identificación de especies de Hongos Micorrízicos Arbusculares (HMA) a partir de características morfológicas de las esporas utilizando modelos de Aprendizaje Automático.

El sistema integra una interfaz web desarrollada en React, un backend en FastAPI, un modelo de Machine Learning previamente entrenado y una base de datos en Supabase para el almacenamiento del historial de identificaciones.

---

## Características principales

- Identificación automática de especies de Hongos Micorrízicos Arbusculares (HMA).
- Modelo Random Forest entrenado con **1281 registros**.
- **352 variables** utilizadas durante el proceso de predicción.
- Consulta de información taxonómica, ecológica y genética de la especie identificada.
- Historial persistente mediante **Supabase**.
- Respaldo automático del historial en **localStorage** cuando Supabase no está disponible.
- Guía de campo para la identificación morfológica.
- Diseño adaptable para dispositivos móviles y escritorio.

---

## Arquitectura del sistema

```text
Frontend (React + TypeScript + Vite)
                │
                ▼
         Node.js / Express
                │
                ▼
          Backend FastAPI
                │
                ▼
    Modelo Random Forest (.pkl)
                │
                ▼
       dataset_limpio.csv
                │
                ▼
       Supabase (Historial)
```

---

## Tecnologías utilizadas

### Frontend

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React

### Backend

- Python
- FastAPI
- Scikit-Learn
- Pandas
- NumPy
- Joblib

### Base de datos

- Supabase

### Compartición de la aplicación

- Cloudflare Tunnel

---

## Estructura del proyecto

```text
backend/
frontend/
documentation/
reports/
notebooks/
README.md
requirements.txt
package.json
```

---

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/Mherediar1/MycoBloom.git
```

### 2. Instalar dependencias de Node.js

```bash
npm install
```

### 3. Instalar dependencias de Python

```bash
pip install -r requirements.txt
```

### 4. Configurar las variables de entorno

Crear el archivo:

```text
frontend/.env
```

Agregar el siguiente contenido:

```env
APP_URL=http://localhost:3000

VITE_SUPABASE_URL=TU_SUPABASE_URL
VITE_SUPABASE_ANON_KEY=TU_SUPABASE_ANON_KEY
```

---

## Ejecución del proyecto

### Backend

```bash
cd backend
uvicorn main:app --host 0.0.0.0 --port 8000
```

### Frontend

Desde la raíz del proyecto:

```bash
npm run dev
```

La aplicación estará disponible en:

```text
http://localhost:3000
```

---

## Compartir la aplicación mediante Cloudflare Tunnel

Con el backend y el frontend en ejecución:

```bash
cloudflared tunnel --url http://localhost:3000
```

Cloudflare generará un enlace público temporal para acceder a la aplicación desde cualquier dispositivo sin necesidad de desplegarla en un servicio de hosting.

---

## Modelo de Machine Learning

El sistema utiliza un modelo Random Forest entrenado específicamente para la clasificación de especies de Hongos Micorrízicos Arbusculares.

Archivos principales del modelo:

- `modelo_micorrizas.pkl`
- `columnas_modelo.pkl`
- `label_encoder_especie.pkl`
- `dataset_limpio.csv`

---

## Base de datos

El historial de identificaciones se almacena mediante **Supabase**.

Cada identificación registra:

- Especie identificada.
- Familia taxonómica.
- Nivel de confianza.
- Datos ingresados por el usuario.
- Resultado completo de la predicción.
- Identificador único del dispositivo.
- Fecha de creación.

Si la conexión con Supabase no está disponible, el sistema almacena automáticamente el historial en **localStorage** para evitar la pérdida de información.

---

## Documentación

Este README presenta únicamente una visión general del proyecto.

Para conocer en detalle la arquitectura del sistema, la implementación del backend, frontend, modelo de aprendizaje automático, configuración de Supabase, uso de Cloudflare Tunnel y el proceso completo para replicar el proyecto, consulte el **Manual de Implementación** ubicado en:

```text
documentation/
└── Manual_Implementacion_MycoBloom.pdf
```

---

## Autores

**Milton Fernando Heredia Riera**

**Andrea Stephany Murillo Medina**

Universidad Politécnica Salesiana  
Guayaquil – Ecuador

---

## Licencia

Este proyecto fue desarrollado con fines académicos como parte del Trabajo de Titulación de la Universidad Politécnica Salesiana.
