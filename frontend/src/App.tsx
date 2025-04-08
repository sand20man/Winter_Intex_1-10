import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MoviePage from './pages/MoviePage';
import PrivacyPage from './pages/PrivacyPage';
<<<<<<< HEAD
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
=======
import Details from './components/Details';
import LoginPage from './pages/LoginPage';
>>>>>>> 14b2f0cfaee860df61ddeb16a61444dbe3ef16ce

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
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
