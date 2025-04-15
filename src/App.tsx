import { Route, Routes } from 'react-router-dom';
import { Canvas } from './pages/Canvas';
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
    </Routes>
  );
}

export default App;
