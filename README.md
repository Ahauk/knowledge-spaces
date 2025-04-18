# 🧠 Knowledge Spaces – React + TypeScript + Vite

Este proyecto es una aplicación web que permite visualizar, explorar y conectar tarjetas de conocimiento en un canvas dinámico, con funcionalidades de **drag & drop**, relaciones visuales y navegación por un feed de contenido. Construido con **React 19**, **TypeScript** y **Vite**.

## Approach and Key Decisions

- **React with TypeScript**: Chosen for type safety and better developer experience.
- **Vite**: Selected for its fast build times and efficient development server.
- **Proxy Setup**: Configured a proxy in `vite.config.ts` to handle CORS issues when communicating with the backend API.
- **Component-Based Architecture**: The application is structured with reusable and modular components to ensure scalability and maintainability.
- **Error Handling**: Implemented centralized error handling in API calls to provide meaningful feedback to users.

## 🚀 ¿Cómo ejecutar el proyecto localmente?

1. **Clona el repositorio**:

   ```bash
   git clone https://github.com/your-username/knowledge-spaces.git
   cd knowledge-spaces
   ```

2. **Instala las dependencias**:
   Asegúrate de tener instalado Node.js (v18+ recomendado):

   ```bash
   npm install
   ```

3. **Inicia el servidor de desarrollo**:

   ```bash
   npm run dev
   ```

4. **Abre la aplicación en tu navegador**:
   Abre una pestaña de tu browser y navega a esta dirección `http://localhost:5173`.

## Performance Optimizations

- **Alturas Dinámicas**: Se usa `ResizeObserver` para ajustar el layout según el contenido.
- **Memoización**: Se evita recalcular posiciones que ya existen.
- **Proxy de API**: Configurado en `vite.config.ts` para evitar CORS en desarrollo.
- **Carga bajo demanda**: Las tarjetas se obtienen por página y se agregan sin sobrecarga inicial.

## Retos Encontrados y Soluciones

1. **CORS Issues**:

   - **Problema**: La API del backend no incluyó el encabezado `Access-Control-Allow-Origin` lo que causó errores de CORS.
   - **Solución**: Se configuró un proxy en `vite.config.ts` para enrutar las solicitudes de la API a través del servidor de desarrollo, evitando las restricciones de CORS.

2. **Empalme de tarjetas**:

   - **Problema**: Las tarjetas de distinta altura se montaban unas sobre otras.
   - **Solución**: Se usó `ResizeObserver` para medir cada tarjeta y calcular su posición real con espacio vertical.

3. **Drag and drop inconsistente**:

   - **Problema**: Las tarjetas se saltaban o reiniciaban tras arrastrar.
   - **Solución**: Se sincronizó correctamente con Zustand y se actualiza solo al finalizar el arrastre.

4. **Paginación real**:
   - **Problema**: Se cargaban todas las tarjetas en un solo request.
   - **Solución**: Se usó el campo `next` del backend para cargar página por página.

## What I Would Improve with More Time

- **Pruebas automáticas**: Unitarias y de integración.
- **Accesibilidad (a11y)**: Cumplimiento con WCAG.
- **Edición inline**: Permitir modificar campos directamente en la tarjeta.
- **Agrupación de tarjetas**: Visualización de clústers o agrupaciones temáticas.
- **CI/CD Pipeline**: Automatización de pruebas y despliegue continuo.

## Expansión de la Configuración de ESLint

Si deseas mejorar la calidad del código en producción, te recomendamos activar reglas que entienden los tipos de TypeScript:

```js
export default tseslint.config({
  extends: [
    // Elimina ...tseslint.configs.recommended y reemplazalo con esto
    ...tseslint.configs.recommendedTypeChecked,
    // Alternativamente, usa esto para reglas más estrictas
    ...tseslint.configs.strictTypeChecked,
    // Opcionalmente, agrega esto para reglas de estilo
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // otras opciones...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

También puedes instalar [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) y [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) para reglas específicas de React.

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default tseslint.config({
  plugins: {
    // Agrega los plugins react-x and react-dom
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // Otras reglas...
    // Habilita sus reglas recomendadas de TypeScript
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```

## Estructura del Proyecto

├── components/ # Componentes reutilizables como Card y ConnectionLayer
├── pages/ # Vistas principales: Canvas.tsx, Feed.tsx
├── services/ # Funciones para llamadas a la API
├── store/ # Estado global con Zustand
├── styles/ # Estilos globales y Tailwind
└── vite.config.ts # Configuración de Vite con proxy incluido

## Autor

Desarrollado por `@Ahauk` como parte de un reto técnico de frontend.
