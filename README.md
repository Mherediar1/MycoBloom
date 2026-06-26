# MycoBloom

## Sistema Web para la Identificación de Hongos Micorrízicos Arbusculares mediante Aprendizaje Automático

**Trabajo de Titulación**  
**Universidad Politécnica Salesiana – Ecuador**

---

## Descripción

MycoBloom es una aplicación web desarrollada como trabajo de titulación que permite apoyar la identificación de especies de Hongos Micorrízicos Arbusculares (HMA) a partir de características morfológicas de las esporas utilizando modelos de Aprendizaje Automático.

El sistema integra una interfaz web desarrollada en React, un backend implementado con FastAPI, un modelo de Machine Learning previamente entrenado y una base de datos en Supabase para el almacenamiento del historial de identificaciones.

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
- Compartición temporal de la aplicación mediante **Cloudflare Tunnel**.

---

## Arquitectura del sistema

```text
                    Usuario
                       │
                       ▼
Frontend (React + TypeScript + Vite)
                       │
                       ▼
              Node.js / Express
                       │
                       ▼
               Backend FastAPI
                       │
          ┌────────────┴────────────┐
          ▼                         ▼
 Modelo Random Forest          Supabase
(modelo_micorrizas.pkl)      Historial
          │
          ▼
dataset_limpio.csv
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

### Compartición temporal

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

Agregar:

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

Cloudflare generará un enlace público temporal que permitirá acceder a la aplicación desde cualquier dispositivo conectado a Internet mientras los servicios permanezcan en ejecución.

---

## Modelo de Machine Learning

El sistema utiliza un modelo **Random Forest** entrenado específicamente para la clasificación de especies de Hongos Micorrízicos Arbusculares.

Archivos principales del modelo:

- `backend/model/modelo_micorrizas.pkl`
- `backend/model/columnas_modelo.pkl`
- `backend/model/label_encoder_especie.pkl`
- `backend/dataset_limpio.csv`

---

## Importante sobre el modelo de Machine Learning

Debido a que el archivo:

```text
backend/model/modelo_micorrizas.pkl
```

supera el límite de tamaño permitido por GitHub, este se almacena mediante **Git Large File Storage (Git LFS)**.

Por esta razón, **no se recomienda utilizar la opción "Download ZIP"** si desea ejecutar completamente la aplicación, ya que GitHub descargará un archivo puntero en lugar del modelo real.

Todos los demás archivos del proyecto (código fuente, notebook de entrenamiento, reporte HTML, dataset, documentación y archivos auxiliares) pueden descargarse normalmente desde GitHub.

Para obtener correctamente el modelo, siga los siguientes pasos.

### Instalar Git LFS

```bash
git lfs install
```

### Clonar el repositorio

```bash
git clone https://github.com/Mherediar1/MycoBloom.git
```

### Ingresar al proyecto

```bash
cd MycoBloom
```

### Descargar el modelo almacenado en Git LFS

```bash
git lfs pull
```

Una vez finalizado el proceso, el archivo:

```text
backend/model/modelo_micorrizas.pkl
```

se descargará correctamente y la aplicación podrá ejecutarse sin inconvenientes.

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

Si Supabase no se encuentra disponible, el sistema almacena automáticamente el historial en **localStorage**, garantizando que las predicciones realizadas no se pierdan.

---

## Documentación

Este README presenta únicamente una visión general del proyecto.

Para conocer en detalle la arquitectura del sistema, la implementación del frontend y backend, el entrenamiento del modelo de aprendizaje automático, la configuración de Supabase, el uso de Cloudflare Tunnel y el proceso completo para replicar el proyecto, consulte el **Manual de Implementación** ubicado en:

```text
documentation/
└── MANUAL DE IMPLEMENTACION - Andrea Murillo, Milton Heredia.pdf
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
