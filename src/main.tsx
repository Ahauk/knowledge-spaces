import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename='/knowledge-spaces'>
    <App />
  </BrowserRouter>
);
