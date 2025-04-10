import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { API_URL } from '../config';

function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberme, setRememberme] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('User:', user);
      navigate('/movie'); // 👈 THIS sends the user to the next page
    } catch (error) {
      console.error('Google login failed:', error);
      setError('Google login failed.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    if (type === 'checkbox') {
      setRememberme(checked);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    const loginUrl = rememberme
      ? `${API_URL}/login?useCookies=true`
      : `${API_URL}/login?useSessionCookies=true`;

    try {
      const response = await fetch(loginUrl, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      let data = null;
      const contentLength = response.headers.get('content-length');
      if (contentLength && parseInt(contentLength, 10) > 0) {
        data = await response.json();
      }

      if (!response.ok) {
        throw new Error(data?.message || 'Invalid email or password.');
      }

      navigate('/movie');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message || 'Error logging in.');
        console.error('Fetch attempt failed:', error.message);
      } else {
        setError('An unknown error occurred.');
        console.error('Fetch attempt failed:', error);
      }
    }
  };

  return (
    <>
      <div className="position-fixed top-0 start-0 w-100" style={{ zIndex: 3 }}>
        <Navbar onSearchChange={() => {}} homePageBool={true} />
      </div>

      <div className="position-relative vh-100 d-flex align-items-center justify-content-center bg-dark text-white">
        {/* Faded overlay like HomePage */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ zIndex: 1 }}
        >
          <div className="w-100 h-100 position-relative">
            <svg
              className="position-absolute top-0 start-0 w-100 h-100"
              preserveAspectRatio="none"
              viewBox="0 0 100 100"
              style={{ pointerEvents: 'none' }}
            >
              <defs>
                <linearGradient
                  id="fadeOverlay"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="0"
                  gradientUnits="objectBoundingBox"
                >
                  <stop offset="0%" stopColor="black" stopOpacity="1" />
                  <stop offset="100%" stopColor="black" stopOpacity="0" />
                </linearGradient>
              </defs>
              <rect
                x="0"
                y="0"
                width="100"
                height="100"
                fill="url(#fadeOverlay)"
              />
            </svg>
          </div>
        </div>

        {/* Form Content */}
        <div
          className="container position-relative z-2 text-white"
          style={{ maxWidth: '500px' }}
        >
          <h1 className="mb-4 fw-bold text-start">Sign In</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                className="form-control"
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="Email address"
              />
              <label htmlFor="email">Email address</label>
            </div>
            <div className="form-floating mb-3">
              <input
                className="form-control"
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="Password"
              />
              <label htmlFor="password">Password</label>

              <span
                className="position-absolute top-50 end-0 translate-middle-y me-3"
                style={{ cursor: 'pointer', zIndex: 5 }}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                <i
                  className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                  style={{ color: '#333' }}
                ></i>
              </span>
            </div>

            <div className="mb-3 d-flex align-items-center">
              <input
                className="form-check-input me-2"
                type="checkbox"
                id="rememberme"
                name="rememberme"
                checked={rememberme}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="rememberme">
                Remember password
              </label>
            </div>

            <div className="d-grid gap-2 mb-3">
              <button className="btn btn-primary fw-bold" type="submit">
                Sign In
              </button>
              <button
                className="btn btn-secondary fw-bold"
                type="button"
                onClick={handleRegisterClick}
              >
                Register
              </button>
            </div>

            <hr className="my-4" />

            <div className="d-grid gap-2 mb-2">
              <button onClick={handleGoogleLogin} className="btn btn-danger">
                <i className="fa-brands fa-google me-2"></i> Sign in with Google
              </button>
            </div>

            {error && <p className="text-danger mt-3">{error}</p>}
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default LoginPage;
