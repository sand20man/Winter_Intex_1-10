import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MoviePage from './pages/MoviePage';
import PrivacyPage from './pages/PrivacyPage';
import PosterWall from './components/PosterWall';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MoviePage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/showGrace" element={<PosterWall />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
