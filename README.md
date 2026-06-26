# MycoBloom — Sistema Experto de Clasificación e Identificación de HMA
### Prototipo Académico y Tecnológico de Graduación / Trabajo de Titulación
**Universidad Politécnica Salesiana**

Este documento constituye la documentación técnica exhaustiva del software **MycoBloom**, una plataforma científica integrada para la clasificación automatizada de Hongos Micorrízicos Arbusculares (HMA) mediante modelos matemáticos de Aprendizaje Automático (Machine Learning).

---

## 1. Descripción General del Proyecto

### ¿Qué es MycoBloom?

MycoBloom es una aplicación web desarrollada como prototipo académico para apoyar la identificación de Hongos Micorrízicos Arbusculares (HMA) mediante técnicas de aprendizaje automático supervisado. El sistema permite ingresar características morfológicas de esporas y obtener una predicción de la especie más probable junto con información taxonómica, ecológica y descriptiva asociada.

La plataforma integra una interfaz web desarrollada con tecnologías modernas y un modelo de clasificación entrenado a partir de información recopilada y estructurada desde diversas fuentes científicas especializadas en micorrizas arbusculares.

### Contexto Académico
Este proyecto ha sido diseñado e implementado como un **Trabajo de Titulación (Tesis de Grado)** en ciencias de la ingeniería y computación, orientado a la validación de técnicas de aprendizaje supervisado en el dominio de la microbiología agrícola y la ecología de suelos.

### Problema que aborda el proyecto

La identificación de Hongos Micorrízicos Arbusculares suele requerir la observación e interpretación de múltiples características morfológicas microscópicas, tales como tamaño, forma, color, número de paredes, reacción a reactivos específicos y otros rasgos taxonómicos relevantes.

Este proceso puede resultar complejo para estudiantes o investigadores en formación debido a la dispersión de información en diferentes publicaciones científicas y bases de datos especializadas. En este contexto, MycoBloom busca servir como una herramienta de apoyo que facilite el acceso a información organizada y contribuya al proceso de identificación mediante técnicas de aprendizaje automático.

### Público Objetivo

MycoBloom está orientado principalmente a:

- Investigadores interesados en el estudio de hongos micorrízicos arbusculares.
- Estudiantes universitarios de carreras relacionadas con biología, microbiología, agronomía, biotecnología y ciencias ambientales.
- Profesionales y técnicos vinculados al análisis microbiológico de suelos.
- Usuarios con conocimientos básicos o intermedios en identificación morfológica de micorrizas arbusculares.

### Alcance Actual del Prototipo

El sistema permite ingresar características morfológicas observadas o documentadas de una espora de HMA y generar una predicción de especie mediante un modelo de aprendizaje automático previamente entrenado.

Además de la clasificación, el sistema muestra información complementaria relacionada con la especie identificada, incluyendo familia taxonómica, distribución geográfica registrada, hábitat, vegetación asociada, rangos ambientales y observaciones descriptivas disponibles dentro del conjunto de datos utilizado por la aplicación.

La plataforma también incorpora módulos informativos y un historial local de consultas almacenado en el navegador del usuario.

### Objetivos Funcionales Principales
1. **Predicción Taxonómica Multiclase**: Evaluar vectores de entrada categóricos y numéricos para realizar inferencias taxonómicas instantáneas guiadas por clasificadores inteligentes entrenados.
2. **Interactividad Optimizada con Cero Ruido**: Proveer selectores inteligentes avanzados libres de autocompletado automático (blindados contra la contaminación de datos históricos de análisis previos) para maximizar la rapidez al llenar los descriptores científicos en el laboratorio.
3. **Divulgación Científica Activa**: Proveer guías metodológicas interactivas y material educativo integrado para capacitar al usuario sobre mejores prácticas de recolección, tamizado por vía húmeda e identificación de HMA.

---

## 2. Tecnologías Utilizadas

La arquitectura física y de software de MycoBloom ha sido estructurada utilizando componentes robustos, modernos y de alto desempeño:

### Módulo de Presentación (Frontend)
* **React 19**: Biblioteca de código abierto utilizada para el modelado reactivo de interfaces de usuario adaptables mediante componentes modulares y estados lógicos desacoplados.
* **TypeScript (v5.8)**: Superconjunto de tipado estático que de forma estricta rige los esquemas de transferencia de datos científicos, evitando incongruencias lógicas o estructuras incompletas entre el cliente, el middleware y el backend de Python.
* **Vite (v6.2)**: Entorno ágil de bundling y empaquetador eficiente que de manera optimizada procesa los activos web, eliminando latencias molestas.
* **Tailwind CSS (v4)**: Motor de procesamiento visual utilizado para estructurar interfaces armónicas, minimalistas y ergonómicas. Utiliza colores de bajo contraste enfocados en el descanso visual de investigadores de laboratorio y diseño fluido responsivo.
* **Framer Motion / Motion (v12)**: Biblioteca matemática de interpolación de transiciones de pantalla para garantizar un cambio armonioso y fluido entre páginas fúngicas.
* **Lucide React**: Kit de iconos vectoriales interactivos para representar de forma directa microscopios, esporas, suelos, alertas e indicadores estéticos.

### Capa de Enlace e Integración (Middleware Proxy)
* **Node.js**: Entorno de ejecución en servidor para coordinar las operaciones del portal.
* **Express (v4.21)**: Framewok web minimalista que en producción sirve los activos de React compilados y en desarrollo actúa como proxy inverso interceptando llamadas REST a la ruta `/api/*` para transferirlas transparentemente al microservicio de Python.
* **TSX (v4.21)**: Herramienta de compilación en tiempo real en desarrollo, permitiendo correr archivos de Node escritos directamente en TypeScript de forma nativa.

### Motor de Inferencia y Cómputo (Backend)
* **FastAPI (v0.115 - Python)**: Framework de microservicios asíncronos y ultrarrápidos de Python. Garantiza un procesamiento asíncrono robusto de vectores con validación estricta de parámetros morfológicos de entrada a nivel de API RESTful.
* **Python (v3.9 - v3.11)**: Entorno principal de cómputo científico seleccionado por su robustez en el modelado estadístico e integraciones con librerías matriciales.
* **Scikit-Learn (v1.5)**: Biblioteca fundamental de aprendizaje supervisado de Python empleada para reconstruir el grafo del bosque aleatorio de decisión, predecir el taxón correspondiente y procesar las probabilidades del error estadístico.
* **Pandas**: Motor analítico estructurado y versátil utilizado para mapear, filtrar e interrogar bases de datos tabulares taxonómicas en formato de archivo de texto plano (CSV).
* **NumPy**: Biblioteca de cómputo matemático de vectores de alta velocidad.
* **Joblib (v1.4)**: Deserializador binario rápido utilizado para leer archivos con serialización persistente `.pkl` que contienen los coeficientes matemáticos optimizados durante el entrenamiento.

---

## 3. Arquitectura General y Flujo de Comunicación

El flujo general del sistema de MycoBloom está compuesto por tres capas desacopladas que operan sincrónicamente sin acoplamiento de lógica rígida:

```
[ FRONTEND SPA (React) ] 
       │ 
       ▼ (Peticiones POST /api/identify en JSON)
[ MIDDLEWARE ENGINE (Node/Express Server) ]
       │ 
       ▼ (Proxy DNS interno a Puerto 8000)
[ SCIENTIFIC BACKEND (Python FastAPI) ] <───> [ ML FILES (.pkl) y DATASET (.csv) ]
```

1. **Entrada de Datos**: El usuario selecciona los atributos macro y microscópicos de la espora fúngica en la pantalla de análisis de React. Al presionar el comando de inicio, el cliente valida el esquema y emite una solicitud con carga HTTP codificada en JSON hacia el servidor central.
2. **Orquestación Intermedia (Proxy)**: El cargador central en Node.js desarrollado en `server.ts` gestiona la llamada de red de manera segura. Intercepta los datos con destino a la ruta `/api/identify` y los reenvía de forma transparente a través de sockets TCP al microservicio científico de FastAPI.
3. **Inferencia de Machine Learning (Inferencia Real)**: FastAPI recibe la solicitud morfológica, verifica la sanidad de los parámetros a través de un esquema estricto de Pydantic (`SporeParams`), y dispara el extractor de características:
   * Normaliza los textos ingresados a minúsculas, retirando acentos ortográficos y caracteres incidentales.
   * Procesa rangos numéricos de tamaño microscópico obteniendo promedios, mínimos y máximos lógicos.
   * Arma dinámicamente el vector One-Hot de características binarias mapeándolo con la secuencia precisa del clasificador requerida por `columnas_modelo.pkl`.
   * Pasa el vector de entrada al estimador recuperado desde `modelo_micorrizas.pkl`, el cual calcula las probabilidades multiclase y emite el taxón correspondiente.
   * Traduce el identificador del taxón indexado de vuelta a un string legible de nombre científico a través de la conversión brindada por `label_encoder_especie.pkl`.
4. **Enriquecimiento contextual de la especie**: Con la especie clasificada en sus manos (ej. *Glomus intraradices*), FastAPI interroga por correspondencia de texto el archivo `dataset_limpio.csv`. Al realizar una unión indexada por nombre de taxón normalizado, extrae metadatos específicos sobre afinidades microbiológicas (altitud óptima, pH recomendado de suelo, porcentajes de filiación fúngica, secuencia de bases genómicas del clúster ITS, especies alternativas taxonómicamente idénticas y sugerencias de manejo sustentable de cultivos).
5. **Persistencia Local**: React captura la respuesta JSON estructurada, presenta el reporte interactivo ordenado en el panel visual del usuario, y archiva una copia física compacta del análisis dentro de `localStorage` del navegador. Esto le permite retener su libreta de campo fúngica histórica sin requerir el mantenimiento de cuentas de bases de datos centralizadas propensas a sobrecargar la red o comprometer la privacidad.

---

## 4. Documentación Completa de Carpetas

La jerarquía del repositorio ha sido organizada de acuerdo a los estándares técnicos más estrictos de modularidad y escalabilidad estructural:

### `/` (Directorio Raíz)
Contiene las configuraciones globales necesarias para inicializar el proyecto de extremo a extremo, estructurar los entornos de ejecución, especificar dependencias cruzadas de node y python, configurar los tipados e interactuar con el entorno integrado.

### `/backend`
Centraliza la lógica en Python dirigida al cómputo y clasificación científica de las esporas:
* Contiene el servidor central de FastAPI.
* Incorpora el dataset de conocimiento taxonómico y ecológico estructurado para el cruce dinámico.
* Contiene opcionalmente el directorio `/backend/model` destinado a alojar de forma local y segregada los binarios pickle de la inteligencia artificial.

### `/backend/app`
Carpeta que provee compatibilidad con la plataforma centralizada en Node.js. Alberga un router lógico desarrollado en TypeScript para canalizar y canalizar solicitudes REST hacia la capa de Python.

### `/frontend`
Contiene la base física de la Single Page Application (SPA). Almacena el fichero indexado estático de inicio (`index.html`), que actúa como punto de cargado para que el empaquete de Vite inyecte y compile el árbol virtual de componentes React.

### `/frontend/src`
Contiene la arquitectura lógica, recursos y código funcional de la interfaz visual en React. Se subdivide de la siguiente manera:
* **`components/`**: Módulos atómicos autocontenidos visuales y de interacción física del usuario.
* **`pages/`**: Páginas estructurales independientes que corresponden al mapa de navegación taxonómica de MycoBloom.
* **`utils/`**: Código auxiliar de normalización, saneamiento de strings y transformaciones estéticas.

---

## 5. Documentación Completa de Archivos

A continuación de detalla el papel e interdependencia de cada archivo presente en el repositorio de MycoBloom sin omisiones de archivos de configuración clásicos:

### Archivos en Directorio Raíz (`/`)

* **`server.ts`** *(Archivo Crítico de Orquestación)*: Desarrollado en TypeScript. Configura un servidor Express centralizado en el puerto `3000`. En desarrollo, inicializa el servidor middleware interno de Vite y redirige de manera directa el tráfico a FastAPI en el puerto `8000`. En producción, compila y sirve estáticamente las vistas compiladas de React de `/dist`.
* **`package.json`** *(Configuración Crítica de Node)*: Define la metadata global de Mycobloom, especificando los scripts ejecutivos (`npm run dev`, `npm run build`, `npm run start`, `npm run lint`) y listando con precisión matemática las versiones requeridas de React, Express, Vite, Framer Motion, y TypeScript.
* **`package-lock.json`** *(Auxiliar)*: Bloquea las versiones exactas del árbol jerárquico de dependencias del ecosistema Node.js.
* **`requirements.txt`** *(Configuración Crítica Python)*: Enumera todos los paquetes numéricos, frameworks científicos y librerías de inferencia requeridas en el backend (`fastapi`, `uvicorn`, `pydantic`, `pandas`, `scikit-learn`, `joblib`), garantizando construcciones limpias en el container.
* **`vite.config.ts`** *(Configuración)*: Configura el motor de bundler de Vite, registrando las integraciones rápidas con el compilador reactivo `@vitejs/plugin-react` y el optimizador de estilos `@tailwindcss/vite`.
* **`tsconfig.json`** *(Configuración)*: Establece los parámetros matemáticos y de análisis estático del compilador de TypeScript, fijando la resolución de rutas relativas y la compatibilidad con módulos ES.
* **`metadata.json`** *(Configuración del Entorno)*: Contiene metadatos de acceso público del prototipo, tales como el nombre del sistema, la descripción académica y los permisos estructurales del contenedor (cámara, geolocalización, etc.).
* **`.env.example`** *(Configuración)*: Plantilla indicativa que describe las variables del sistema requeridas para fines de portabilidad ambiental.
* **`.gitignore`** *(Auxiliar)*: Configura las exclusiones lógicas del control de versiones git, impidiendo subir archivos residuales pesados, claves, dependencias de `node_modules` o archivos compilados.

### Archivos de la Capa de Backend (`/backend`)

* **`backend/main.py`** *(Archivo Físico Crítico del Sistema)*: El código ejecutor del servidor FastAPI. Implementa el validador estricto `SporeParams`, orquesta la llamada asíncrona a `load_ml_assets()`, preprocesa de forma limpia las dimensiones de tamaño espora, mapea los rasgos físicos categorizados mediante patrones regex robustos que evalúan el vector en One-Hot, invoca a Scikit-Learn para deducir la especie con confianza porcentual de predicción y consulta el archivo de datos local.
* **`backend/dataset_limpio.csv`** *(Datos Críticos)*: Base de datos estructurada con múltiples columnas ecológicas avanzadas de los taxones de HMA locales. Es interrogada dinámicamente mediante pandas por FastAPI para autocompletar la ficha microbiológica de los análisis morfológicos emitidos por el estimador inteligente.
* **`backend/__init__.py`** *(Auxiliar)*: Inicializador vacío de Python para calificar de manera correcta a la carpeta general como un paquete interpretable.
* **`backend/app/main.ts`** *(Enlace)*: Expone un enrutador de Express que intercepta llamadas dirigidas originalmente hacia el middleware en Node y las redirige hacia FastAPI.
* **`backend/app/predictionService.ts`** *(Soporte)*: Interfaz estructurada que define el esquema TypeScript tipado de la especie HMA devuelta por el clasificador y define la llamada sincrónica mediante `fetch` hacia el backend científico de Python.

### Archivos de la Capa de Frontend (`/frontend`)

* **`frontend/index.html`** *(Crítico de Entrada)*: El contenedor de marcado global SPA. Define la estructura HTML base, el ícono representativo de la aplicación y el punto físico de enganche (`<div id="root">`) donde React inyecta el árbol de componentes virtuales dinámicamente.
* **`frontend/src/main.tsx`** *(Crítico de Entrada)*: Inicializador inicial y punto ejecutor del cliente SPA. Monta de forma estricta el árbol reactivo del componente raíz `App` dentro del DOM físico del navegador.
* **`frontend/src/App.tsx`** *(Crítico de Configuración)*: El enrutador central y mapa de navegación reactivo del cliente en React. Define las rutas unificadas, implementa la barra de navegación global, el bloque de pie de autor, y asocia orquestadores dinámicos de transiciones suaves de Framer Motion mediante una etiqueta `AnimatePresence`.
* **`frontend/src/index.css`** *(Estilos Críticos)*: Fichero de estilos universal. Importa la biblioteca optimizada Tailwind CSS utilizando la sintaxis de vanguardia `@import "tailwindcss";`, define la tipografía clásica Inter y JetBrains Mono, estructura los esquemas de color corporativos basados en la relajación del ojo humano en laboratorios y aplica configuraciones específicas para clases personalizadas.
* **`frontend/src/types.ts`** *(Tipos Críticos)*: Fichero conceptual de ingeniería de software. Define los contratos de tipo unificados de React y TypeScript para interfaces tales como la respuesta científica `MycoIdentification`, el modelo de envío `ThesisInput` y el historial local `HistoryItem`.
* **`frontend/src/utils/format.ts`** *(Soporte)*: Contiene el transcriptor utilitario global que toma claves codificadas en minúscula y bajo-guión del motor predictivo de Python de FastAPI y las decodifica instantáneamente en títulos limpios de texto (*Title Case*), por ejemplo de `positiva (rojo/púrpura)` a `Positiva (rojo/púrpura)`.

---

## 6. Explicación de los Componentes React (`/frontend/src/components`)

Los widgets interactivos de MycoBloom están estructurados con base en el paradigma de diseño atómico y se dividen de la siguiente manera:

* **`SingleSelect.tsx`** *(Funcional e Interactivo)*: Reemplazo sofisticado del aburrido control selector que posee el navegador por defecto. Permite elegir un único parámetro físico morfológico (como Forma, Tipo de Reacción o Capas de pared). Incorpora botones para borrar la selección limpia del campo directamente, resalta opciones enfocadas, posee transiciones de apertura animadas mediante etiquetas `motion` y despliega la información formateada estéticamente.
* **`MultiSelect.tsx`** *(Funcional e Interactivo)*: Selector avanzado para rasgos morfológicos o agrícolas del hongo que admiten múltiples categorías simultáneas (tales como Color Dominante, Plantas Hospederas, Texturas físicas visualizadas, etc.). Ofrece una **caja de búsqueda rápida integrada** que permite filtrar rasgos extensos sobre la marcha y presenta los valores elegidos como burbujas de texto (*Badges*) interactivas que pueden eliminarse de manera intuitiva con hacer clic sobre su ícono de cierre.
* **`ReportCard.tsx`** *(Visual y Funcional)*: Es el presentador central estructurado encargado de materializar visualmente los datos microbiológicos de la espora fúngica analizada por FastAPI. Ordena de forma jerárquica las descripciones físicas analizadas contra las sugerencias de suelo (altitud msnm sugerida, grado de pH fúngico, clúster genético con genes ITS locales y porcentaje de filiación fúngica). Integra un botón especializado que gatilla búsquedas automáticas en la base mundial taxonómica científica indexada de acuerdo con el taxón específico diagnosticado por la IA.
* **`Navbar.tsx`** *(Visual y de Navegación)*: Encabezado interactivo con respuesta móvil que se adapta a las dimensiones de pantalla, destacando visualmente la página seleccionada e integrando transiciones fluidas.
* **`Footer.tsx`** *(Visual)*: El extremo final e informativo de Mycobloom. Detalla de forma formal la afiliación del Trabajo de Titulación de grado con la Universidad Politécnica Salesiana de forma impecable e incluye distintivos interactivos (*Badges*) que enuncian las tecnologías de software implementadas.
* **`Carousel.tsx`** *(Visual)*: Presentador de imágenes dinámico con paginado en carrusel integrado que rota automáticamente o de forma manual imágenes de campo, montajes en laboratorio y microscopia de esporas de HMA junto con explicaciones conceptuales técnicas asociadas.
* **`CarouselImages.ts`** *(Estructural - Datos)*: Proveedor estructurado y mapeado que contiene el array estático de direcciones físicas de imágenes biológicas reales, sus créditos legales de investigación y títulos de cátedra expuestos en el carrusel de bienvenida.

---

## 7. Explicación de las Páginas (`/frontend/src/pages`)

MycoBloom estructura la navegación del prototipo de grado utilizando cinco interfaces independientes de una sola vista fluida de React:

* **`Home.tsx`**: La página de bienvenida del sistema experto. Introduce la investigación, enlaza directamente a los módulos funcionales, explica la sinergia entre Inteligencia Artificial y Microbiología, e integra el widget de carrusel interactivo para brindar un vistazo rápido a la morfología de HMA.
* **`PredictPage.tsx`**: El analizador inteligente. Ofrece el formulario de descriptores científicos necesarios para gatillar la predicción. Administra los estados de envío, incorpora un temporizador estético e informativo para ejemplarizar el retraso analítico computacional del servidor fúngico y guarda la estructura en la libreta científica del historial del navegador al recibir la respuesta confirmatoria.
* **`HistoryPage.tsx`**: El registro de muestras de campo locales del usuario. Interroga de forma autónoma el `localStorage` del cliente para desplegar las identificaciones fúngicas realizadas en el dispositivo del investigador ordenándolas cronológicamente. Cuenta con motores dinámicos de filtrado de búsqueda textual y expande los reportes detallados científicos completos sin necesidad de re-evaluar la muestra en FastAPI.
* **`AboutMycorrhizaPage.tsx`**: Módulo educativo de sustento teórico. Explica detalladamente de qué forma se definen las micorrizas arbusculares, detalla el proceso de colonización de la rizósfera vegetal e instruye al estudiante universitario en taxonomía y ecología agrícola.
* **`FieldGuidePage.tsx`**: Módulo de guía metodológica interactiva. Describe paso a paso los procesos de laboratorio para recuperar esporas desde suelos agrícolas rudimentarios (detallando muestreos de campo, técnica de tamizado por vía húmeda combinado con decantación y centrifugado, y preparación física de montajes bajo reactivo de Melzer o solución PVLG).

---

## 8. Explicación Detallada del Backend en FastAPI (`backend/main.py`)

El backend de Python ha sido diseñado siguiendo estándares de alta escalabilidad e inmediatez de respuesta de servicio REST de la siguiente forma:

1. **Endpoints del Servicio**:
   * **`GET /api/health`**: Verifica y retorna el estado de los componentes del servidor predictivo. Informa dinámicamente si el motor de Machine Learning está operando con normalidad o si el sistema ha caído al modo preventivo clásico de aviso de recarga, y notifica si el dataset CSV estructural de conocimiento complementario se encuentra cargado y mapeando correctamente.
   * **`POST /api/identify`**: Endpoint crítico del estimador científico de MycoBloom. Consume y valida el JSON de entrada y retorna la ficha taxonómica robusta `MycoIdentification` que contiene la predicción, su precisión decimal, de qué familia forma parte la espora HMA, altitud óptima fúngica, pH analítico, filiación genética y sugerencias agroecológicas generales.
2. **Validaciones Estrictas por Pydantic**:
   * Las entradas son gestionadas analíticamente por la clase `SporeParams`, un validador que previene la inserción de formatos de datos defectuosos, inyecciones perjudiciales, o variables de cadena vacías incompatibles con el cálculo de Scikit-Learn.
3. **Mecanismo de Carga Floja (`load_ml_assets`)**:
   * Al iniciar el backend de FastAPI, la función analiza las rutas del sistema del servidor. Si los tres activos binarios `.pkl` están disponibles en `/backend/model/`, los carga a memoria utilizando la persistencia de `joblib`. Si los binarios faltan, el servidor se mantiene arriba de forma normal permitiendo navegar por la interfaz de usuario pero protegiendo al modelo lanzando códigos HTTP `503` estructurados al usuario, advirtiendo que debe subir el modelo real para gatillar la clasificación real.
4. **Matriz Matricial y Cómputo de Inferencia**:
   * **Cero Autocompletado Previo (Autofill Blindado)**: Se diseñó el procesamiento de strings con limpieza profunda, eliminando interferencias de autocompletado en navegadores locales aplicando marcas `autoComplete="off"` a nivel HTML para que el investigador obtenga siempre datos de análisis microscópico limpios.
   * **Normalización de Texto y Parsing**: Descompone las cadenas ingresadas basándose en expresiones de patrones regulares estrictos, procesando el Tamaño de la Espora obteniendo los valores numéricos mínimos, máximos y promedios y cargando de forma por defecto valores neutros estándar sobre variables de suelo para mantener los modelos sin distorsiones en su predicción final.
   * **One-Hot Encoding Predictivo**: Transforma variables discretas de texto mapeándolas con el orden idéntico secuencial que demanda `columnas_modelo.pkl`. Ejecuta la predicción, decodifica el índice con el codificador de etiquetas e interroga mediante Pandas el catálogo taxonómico detallado de `dataset_limpio.csv` consolidando el reporte consolidado.

---

## 9. Explicación de los Archivos de Machine Learning

Los recursos científicos en memoria de MycoBloom cooperan de forma armoniosa estableciendo una tubería coordinada de cómputo predictivo:

```
                  ┌──────────────────────────────┐
                  │ 1. Entrada de Parámetros de  │
                  │   Muestra (Región de Suelo)  │
                  └──────────────┬───────────────┘
                                 │ (One-Hot Encoding de variables)
                                 ▼
                  ┌──────────────────────────────┐
                  │ 2. columnas_modelo.pkl       │ ◄─── (Asegura simetría exacta
                  └──────────────┬───────────────┘       del vector de entrada)
                                 │
                                 ▼
                  ┌──────────────────────────────┐
                  │ 3. modelo_micorrizas.pkl     │ ◄─── (Clasifica y computa las
                  └──────────────┬───────────────┘       probabilidades estadísticas)
                                 │
                                 ▼ (Índice entero predicho, ej: 14)
                  ┌──────────────────────────────┐
                  │ 4. label_encoder_especie.pkl │ ◄─── (Traduce a String legible,
                  └──────────────┬───────────────┘       ej: Glomus mosseae)
                                 │
                                 ▼ (Filtro por Nombre Taxonómico)
                  ┌──────────────────────────────┐
                  │ 5. dataset_limpio.csv        │ ◄─── (Cruce con la base de datos
                  └──────────────┬───────────────┘       de metadatos ecológicos)
                                 │
                                 ▼
                   [ Ficha de Diagnóstico Final ]
```

* **`modelo_micorrizas.pkl`** *(Fichero Binario Estimador de Scikit-Learn)*:
  * **Qué Contiene**: El estado completo persistente estructurado del modelo de aprendizaje automático una vez finalizados los ciclos de optimización y entrenamiento supervisado en laboratorio.
  * **Cómo fue Generado**: Entrenado usando librerías de data science en Python que ajustaron pesos del clasificador evaluando variables de esporas fúngicas clasificadas.
  * **Papel Activo**: Evalúa la matriz binaria alineada final, estima las ecuaciones matemáticas de frontera de decisión probabilística multiclase y determina el índice numérico que representa al taxón de micorrizas HMA con mayor correlación biológica estructural.
* **`columnas_modelo.pkl`** *(Fichero Binario de Estructura)*:
  * **Qué Contiene**: La lista ordenada de strings que definen a cada una de las dimensiones y columnas exactas del dataset de ingeniería final con el cual el estimador inteligente fue entrenado original y matemáticamente.
  * **Cómo fue Generado**: Exportado como un volcado secuencial del índice del DataFrame de Pandas durante el procesamiento original del pipeline.
  * **Papel Activo**: Permite que FastAPI inicialice de manera exacta un vector de entrada relleno con valores de coma flotante cero, activando únicamente los valores lógicos categóricos ingresados por el usuario. Garantiza simetría matemática exacta y previene fallos o detenciones del motor clasificador frente a discrepancias en el orden de las variables.
* **`label_encoder_especie.pkl`** *(Fichero Binario Decodificador)*:
  * **Qué Contiene**: Los metadatos de mapeo de clases textuales taxonómicas frente a índices enteros deScikit-Learn.
  * **Cómo fue Generado**: Serializado con el objeto `LabelEncoder` del paquete de preprocesamiento de Scikit-Learn durante el formateo del target en el conjunto de entrenamiento.
  * **Papel Activo**: Al recibir el valor representativo predicho de forma numérica (por ejemplo un entero puro `14`), realiza una transformación sintáctica inversa para retornar la cadena textual nominal con la especie exacta correspondiente (por ejemplo: `Glomus mosseae`), garantizando la correcta interpretación biológica del diagnóstico.
* **`dataset_limpio.csv`** *(Dataset Tabular Estructurado)*:
 Contiene el conjunto de datos estructurado utilizado por la aplicación para complementar la información mostrada al usuario después de una predicción.

El dataset fue construido mediante la recopilación, integración, depuración y normalización de información proveniente de artículos científicos, literatura especializada y fuentes taxonómicas relacionadas con hongos micorrízicos arbusculares.

Incluye información morfológica, ecológica, geográfica y taxonómica utilizada tanto durante el entrenamiento del modelo como para enriquecer los resultados presentados en la interfaz web.

---

## 10. Métricas del Modelo de Aprendizaje Supervisado

Durante el desarrollo de la investigación de titulación, se realizó una rigurosa evaluación de tres algoritmos candidatos frente a múltiples conjuntos y fases de control científico. A continuación se detallan de forma estricta las métricas matemáticas obtenidas en cada fase del modelado:

### Fase 1: Métricas de Evaluación Iniciales

| Algoritmo | Accuracy (Exactitud) | Precision (Precisión) | Recall (Sensibilidad) | F1-Score |
| :--- | :---: | :---: | :---: | :---: |
| **Random Forest** | **0.984375** | **0.980851** | **0.978723** | **0.977935** |
| **XGBoost** | 0.937500 | 0.904930 | 0.919014 | 0.904695 |
| **LightGBM** | 0.937500 | 0.895833 | 0.907986 | 0.894841 |

### Fase 2: Resultados de la Validación Cruzada (K-Fold Cross-Validation)

La validación cruzada se utilizó para evaluar la capacidad de generalización de los modelos frente a datos no utilizados durante el entrenamiento, permitiendo estimar de manera más confiable el comportamiento esperado del clasificador ante nuevas observaciones.

| Algoritmo | Accuracy Media | Precision Media | Recall Medio | F1-Score Medio |
| :--- | :---: | :---: | :---: | :---: |
| **Random Forest** | **0.934004** | **0.937064** | **0.947712** | **0.935123** |
| **XGBoost** | 0.856823 | 0.831427 | 0.861111 | 0.833232 |
| **LightGBM** | 0.888143 | 0.887745 | 0.900327 | 0.882065 |

### Fase 3: Resultados de las Métricas Finales en Conjunto de Prueba (Test Set)

| Algoritmo | Accuracy (Test) | Precision (Test) | Recall (Test) | F1-Score (Test) | Tasa de Error |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Random Forest** | **0.958333** | **0.940048** | **0.942446** | **0.936211** | **0.041667** |
| **XGBoost** | 0.942708 | 0.908392 | 0.913121 | 0.906484 | 0.057292 |
| **LightGBM** | 0.932292 | 0.919031 | 0.913121 | 0.908612 | 0.067708 |

### Fase 4: Análisis de Ajuste y Diagnóstico (Overfitting / Underfitting)

| Algoritmo | Train Accuracy | Validation Accuracy | Test Accuracy | Train F1-Score | Validation F1-Score | Test F1-Score | Diagnóstico Taxonómico |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Random Forest** | **0.997763** | **0.984375** | **0.958333** | **0.997652** | **0.981087** | **0.936211** | **Buen ajuste (Optimum Fit)** |
| **XGBoost**| 0.998881 | 0.932292 | 0.942708 | 0.998599 | 0.903286 | 0.906484 | Buen ajuste |
| **LightGBM** | 0.998881 | 0.942708 | 0.932292 | 0.998599 | 0.893706 | 0.908612 | Buen ajuste |

### Justificación de la selección de Random Forest

Durante la fase experimental se evaluaron tres algoritmos de aprendizaje supervisado: Random Forest, XGBoost y LightGBM.

Los resultados obtenidos mostraron que Random Forest alcanzó el mejor desempeño general tanto en las métricas de validación como en el conjunto de prueba, obteniendo una exactitud final de 95.83%, una precisión de 94.00%, un recall de 94.24% y un F1-score de 93.62%.

Adicionalmente, presentó las menores diferencias entre las métricas de entrenamiento y prueba, lo que indica una adecuada capacidad de generalización sin evidencia significativa de sobreajuste o subajuste.

Por estas razones, Random Forest fue seleccionado como modelo definitivo para la implementación del sistema.
---

## 11. Instalación y Ejecución

Sigue detalladamente esta secuencia técnica para compilar, levantar y probar los entornos de MycoBloom localmente de forma sincronizada:

### Requisitos Previos e Instrumentales
* Contar con **Node.js** instalado (versión 18, 20 o superior).
* Contar con **Python** instalado (versión 3.9, 3.10 o 3.11).
* Instalar de forma global el gestor de paquetes **npm**.

### Paso 1: Clonar y descargar dependencias del Entorno Integrado
Abra un terminal de comandos en el directorio raíz de la aplicación e invoque el comando de instalación de paquetes del ecosistema Node.js:
```bash
npm install
```

### Paso 2: Configurar el Servidor y Dependencias Python
Instale toda la biblioteca científica listada estrictamente en el archivo de orquestación de python ejecutando:
```bash
pip install -r requirements.txt
```

### Paso 3: Disposición Biológica de los Archivos Pickle (.pkl)
Para habilitar el motor real inteligente de inferencia de Scikit-Learn de MycoBloom, debe colocar sus binarios entrenados en la ubicación correcta que lee FastAPI:
1. Cree un subdirectorio llamado `model` en la ubicación `/backend/` (Ruta física resultante: `backend/model/`).
2. Copie sus cuatro ficheros científicos serializados directamente dentro de esta carpeta:
   * **`modelo_micorrizas.pkl`**
   * **`columnas_modelo.pkl`**
   * **`label_encoder_especie.pkl`**
   * **`dataset_limpio.csv`** (colocar este archivo CSV de forma limpia directamente en la raíz de `/backend/` junto a `main.py`).

### Paso 4: Levantar los Entornos en Modo Desarrollo
Ejecute el microservicio y el servidor proxy de MycoBloom con una sola instrucción en la consola desde la raíz del proyecto general:
```bash
npm run dev
```

Este comando levantará con éxito el backend integrado en Express (`server.ts`) operando en el puerto `3000` redirigiendo fluidamente las llamadas REST necesarias al subproceso API y cargando el código React en vivo para comenzar la exploración taxonímica en segundos de manera ágil.

---

## 12. Funcionalidades Disponibles

- Registro de características morfológicas mediante formularios interactivos.
- Clasificación automática de especies de HMA mediante un modelo Random Forest entrenado previamente.
- Visualización de información taxonómica y ecológica asociada a la especie identificada.
- Consulta de recomendaciones y observaciones descriptivas almacenadas en el conjunto de datos.
- Historial local de identificaciones realizadas desde el navegador.
- Guía de campo para interpretación de características morfológicas.
- Sección educativa sobre micorrizas arbusculares y su importancia ecológica.
- Interfaz adaptable a dispositivos móviles y de escritorio.

---

## 13. Observaciones Técnicas y Recomendaciones para Mantenimiento

* **Acoplamiento Tipo-Seguro de Contratos**: Cualquier cambio estructurado en el objeto del reporte fúngico que se desee implementar en el código del servidor FastAPI de Python (`main.py`) debe verse obligatoriamente reflejado en la interfaz `MycoIdentification` detallada en `/frontend/src/types.ts` de React. Esto evita detenciones de renderizado fúngico y errores de desestructuración durante la transferencia JSON en el proxy Express.
* **Mantenimiento y Actualización de Pickle de Machine Learning**: Si en fases posteriores del Trabajo de Titulación de Grado se re-entrena el algoritmo con un mayor número de muestras de suelo o especies fúngicas andinas, es imperativo asegurarse de re-exportar y actualizar simultáneamente en `/backend/model/` los archivos `modelo_micorrizas.pkl`, `columnas_modelo.pkl` y `label_encoder_especie.pkl`. El API de FastAPI recopilará las dimensiones asimétricas nuevas y los cargará automáticamente gracias a su rutina dinámica de inicialización sin necesidad de modificar el código web ni recompilar el servidor proxy.
* **Seguridad de Ejecución frente a Ausencia de Licencias o Archivos PKL**: Se implementó una lógica defensiva robusta que evalúa la presencia de los binarios del hongo. Si un evaluador abre MycoBloom sin disponer físicamente de los archivos `.pkl` del modelo en su servidor de ejecución, el sistema no colapsará. Permitirá la libre navegación por los espectros didácticos, guías de tamizado de laboratorio e historial visual, arrojando alertas preventivas limpias al intentar gatillar una predicción científica real, garantizando confiabilidad y transparencia.
