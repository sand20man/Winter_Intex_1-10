import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MoviePage from './pages/MoviePage';
import PrivacyPage from './pages/PrivacyPage';
import Details from './components/Details';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MoviePage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/movie/:showId" element={<Details />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
