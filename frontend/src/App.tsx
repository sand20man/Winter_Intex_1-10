import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MoviePage from './pages/MoviePage';
import PrivacyPage from './pages/PrivacyPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import Details from './components/Details';
import RegisterPage from './pages/RegisterPage';
import AdminPage from './pages/AdminPage';
import AdminRoute from './components/AdminRoute';
import ProtectedRoute from './components/ProtectedRoute';
import CookieConsent from 'react-cookie-consent';

function App() {
  return (
    <>
      <div className="min-h-screen bg-black text-white">
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route
              path="/movie"
              element={
                <ProtectedRoute>
                  <MoviePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/movie/:showId"
              element={
                <ProtectedRoute>
                  <Details />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminRoute>
                    <AdminPage />
                  </AdminRoute>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </div>
      <CookieConsent
        location="bottom"
        buttonText="Accept"
        declineButtonText="Decline"
        enableDeclineButton
        cookieName="cookie_consent"
        style={{ background: '#2B373B' }}
        buttonStyle={{ color: '#4e503b', fontSize: '13px' }}
        declineButtonStyle={{
          color: '#fff',
          backgroundColor: '#8b0000',
          fontSize: '13px',
        }}
        expires={365}
        onAccept={() => {
          document.cookie = 'cookie_consent=true; path=/; max-age=31536000';
          console.log('Consent accepted');
          // Optional: load analytics or tracking here
        }}
        onDecline={() => {
          document.cookie = 'cookie_consent=false; path=/; max-age=31536000';
          console.log('Consent declined');
        }}
      >
        We use cookies to personalize content and analyze our traffic.{' '}
        <a
          href="/privacy"
          style={{ color: '#fff', textDecoration: 'underline' }}
        >
          Learn more
        </a>
      </CookieConsent>
    </>
  );
}

export default App;
