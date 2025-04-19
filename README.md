# 🧠 Knowledge Spaces – React + TypeScript + Vite

Este proyecto fue desarrollado como parte de un _technical assessment_ para una posición de **Senior Frontend Design Engineer** en Sublime. Permite visualizar, explorar y conectar tarjetas de conocimiento en un canvas dinámico, con funcionalidades de **drag & drop**, relaciones visuales y navegación por un feed de contenido. Construido con **React 19**, **TypeScript** y **Vite**.

## 🧠 Características principales

- **Canvas interactivo:** Tarjetas tipo post-it con drag & drop.
- **Feed paginado:** Vista en grid con tarjetas relacionadas.
- **AI Enhancement:** Resumen generado por IA al ver una tarjeta (vía API gratuita).
- **Diseño responsivo:** Adaptado a todos los tamaños de pantalla.

---

## 🛠️ Tecnologías utilizadas

- **React 19** con **TypeScript**
- **Vite** como bundler
- **Zustand** para manejo de estado global
- **@dnd-kit** para drag & drop
- **TailwindCSS** para estilos
- **ApyHub API** para generación de resúmenes IA

---

## 📐 Decisiones clave

- **Diseño minimalista** con tarjetas pastel tipo post-it.
- Uso de **drag and drop controlado** con @dnd-kit para reordenamiento.
- **Cálculo dinámico de layout** en el canvas (posición y tamaño).
- **Resumen por IA** usando texto de la tarjeta principal.

---

## 🚀 ¿Cómo ejecutar el proyecto localmente?

1. **Clona el repositorio**:

   ```bash
   git clone https://github.com/your-username/knowledge-spaces.git
   cd knowledge-spaces
   ```

2. **Instala las dependencias**:

   ```bash
   npm install
   ```

3. **Crea un archivo `.env` con tu API Key de ApyHub**:

   ```bash
   echo "VITE_APYHUB_API_KEY=TU_API_KEY_AQUI" > .env
   ```

4. **Inicia el servidor de desarrollo**:

   ```bash
   npm run dev
   ```

5. **Abre la aplicación en tu navegador**:

   http://localhost:5173

---

## 🌟 Optimizaciones de performance

- **Alturas dinámicas** con `ResizeObserver`.
- **Memoización** de layout para evitar re-render innecesario.
- **Scroll inteligente y carga por página** usando `next` del backend.
- **Proxy local** para evitar problemas de CORS.

---

## 🧩 Retos Encontrados y Soluciones

- **Empalme de tarjetas**:
  Se resolvió midiendo altura real con `ResizeObserver` y actualizando layout dinámico.

- **Drag & Drop inconsistente**:
  Se sincronizó correctamente el estado con Zustand.

- **CORS en desarrollo**:
  Se configuró un proxy en `vite.config.ts` para evitar errores.

- **Paginación infinita**:
  Se implementó carga progresiva con scroll/intersección y luego con botón manual.

---

## 📁 Estructura del Proyecto

```
├── components/         # Componentes reutilizables (Card, ConnectionLayer)
├── pages/              # Vistas principales (Canvas, Feed)
├── services/           # Lógica de acceso a API externa
├── store/              # Zustand global store
├── styles/             # Tailwind y estilos personalizados
└── vite.config.ts      # Configuración de Vite + proxy API
```

---

## 🧪 CI/CD con GitHub Actions

Este proyecto incluye integración continua utilizando **GitHub Actions**. Cada vez que haces un `push` o abres un `pull request` en la rama `main`, se ejecuta automáticamente:

- Instalación de dependencias
- Lint con ESLint
- Build de producción
- Pruebas

El archivo se encuentra en:

```
.github/workflows/ci.yml
```

---

## 🌍 Despliegue en GitHub Pages

La aplicación está desplegada públicamente en GitHub Pages y puede visitarse en:

🔗 **[https://ahauk.github.io/knowledge-spaces](https://ahauk.github.io/knowledge-spaces)**

El proceso de despliegue es automático mediante GitHub Actions. Cada vez que haces `push` a la rama `main`, se ejecuta el workflow en `.github/workflows/deploy.yml`, que:

- Construye el proyecto con `vite build`
- Publica el contenido de la carpeta `dist/` en la rama `gh-pages`

---

## ✨ Cosas que haría con más tiempo

### Diseño y UX

- Microinteracciones más "delightful": transiciones suaves, efectos de hover enriquecidos.
- Refinamiento de tipografía y spacing.

### Código y arquitectura

- Tests unitarios y de integración (Jest + React Testing Library).
- Mejorar accesibilidad: navegación por teclado, roles, focus rings.
- Agregar soporte para SSR (Next.js).

### AI

- Agregar botón "Generar tarjeta relacionada con IA" como prototipo funcional o mock.

---

## ✅ Checklist actual

| Funcionalidad                     | Estado        |
| --------------------------------- | ------------- |
| Canvas con tarjetas y drag & drop | ✅ Completado |
| Feed paginado                     | ✅ Completado |
| Tarjetas relacionadas             | ✅ Completado |
| Resumen IA en tarjeta principal   | ✅ Completado |
| Estilos detallados y responsivos  | ✅ Completado |
| Microinteracciones & tipografía   | 🔲 Parcial    |
| Tests                             | 🔲 No incluye |
| Accesibilidad avanzada            | 🔲 Parcial    |
| CI/CD con GitHub Actions          | ✅ Completado |
| Despliegue                        | ✅ Completado |
| README técnico completo           | ✅ Completado |

---

Desarrollado por `@Ahauk` como parte del challenge de Sublime ✨
