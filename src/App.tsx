import { Route, Routes } from 'react-router-dom';
import { Canvas } from './pages/Canvas';
import { Feed } from './pages/Feed';
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
        path='/feed'
        element={<Feed />}
      />
    </Routes>
  );
}

export default App;
