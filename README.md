# Knowledge Spaces - React + TypeScript + Vite

This project is a React application built with TypeScript and Vite. It provides a fast and modern development environment with hot module replacement (HMR) and ESLint integration for code quality.

## Approach and Key Decisions

- **React with TypeScript**: Chosen for type safety and better developer experience.
- **Vite**: Selected for its fast build times and efficient development server.
- **Proxy Setup**: Configured a proxy in `vite.config.ts` to handle CORS issues when communicating with the backend API.
- **Component-Based Architecture**: The application is structured with reusable and modular components to ensure scalability and maintainability.
- **Error Handling**: Implemented centralized error handling in API calls to provide meaningful feedback to users.

## How to Run the Application Locally

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-username/knowledge-spaces.git
   cd knowledge-spaces
   ```

2. **Install Dependencies**:
   Make sure you have Node.js installed, then run:

   ```bash
   npm install
   ```

3. **Start the Development Server**:

   ```bash
   npm run dev
   ```

4. **Access the Application**:
   Open your browser and navigate to `http://localhost:5173`.

## Performance Optimizations

- **Code Splitting**: Leveraged Vite's built-in support for code splitting to load only the necessary JavaScript for each page.
- **Lazy Loading**: Implemented lazy loading for components and assets to improve initial load times.
- **Proxy for API Calls**: Configured a proxy to reduce latency and avoid CORS issues during development.
- **Optimized Builds**: Used Vite's production build optimizations to generate smaller and faster assets.

## Challenges Faced and Solutions

1. **CORS Issues**:

   - **Challenge**: The backend API did not include the `Access-Control-Allow-Origin` header, causing CORS errors.
   - **Solution**: Configured a proxy in `vite.config.ts` to route API requests through the development server, bypassing CORS restrictions.

2. **Error Handling**:
   - **Challenge**: Ensuring meaningful error messages for API failures.
   - **Solution**: Centralized error handling in the `fetchJson` function to provide consistent feedback.

## What I Would Improve with More Time

- **Testing**: Add unit tests and integration tests to ensure code reliability and catch regressions.
- **Accessibility**: Improve the application's accessibility to meet WCAG standards.
- **Documentation**: Expand the documentation to include detailed API references and component usage examples.
- **State Management**: Introduce a state management library like Redux or Zustand for better handling of global state.
- **CI/CD Pipeline**: Set up a continuous integration and deployment pipeline to automate testing and deployment.

## Expanding the ESLint Configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules.

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```
