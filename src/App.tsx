import { Route, Routes } from 'react-router-dom';
import { Canvas } from './components/Canvas';
import CardDetail from './pages/CardDetail';
import { Home } from './pages/Home';

function App() {
  return (
    <Routes>
      <Route
        path='/'
        element={<Home />}
      />
      <Route
        path='/canvas'
        element={<Canvas />}
      />
      <Route
        path='/card/:id'
        element={<CardDetail />}
      />
    </Routes>
  );
}

export default App;
