import { Route, Routes } from 'react-router-dom';
import CardDetail from './pages/CardDetail';
import Home from './pages/Home';
import KnowledgeSpace from './pages/KnowledgeSpace';

function App() {
  return (
    <Routes>
      <Route
        path='/'
        element={<Home />}
      />
      <Route
        path='/space'
        element={<KnowledgeSpace />}
      />
      <Route
        path='/card/:id'
        element={<CardDetail />}
      />
    </Routes>
  );
}

export default App;
