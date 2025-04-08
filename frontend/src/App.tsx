import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MoviePage from './pages/MoviePage';
import PrivacyPage from './pages/PrivacyPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import Details from './components/Details';
import RegisterPage from './pages/RegisterPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <>
      <div className="min-h-screen bg-black text-white">
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movie" element={<MoviePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/movie/:showId" element={<Details />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
