import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import { registerUser } from '../api/MovieAPI';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
    if (name === 'confirmPassword') setConfirmPassword(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      setError(['Please fill in all fields.']);
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(['Please enter a valid email address.']);
    } else if (password !== confirmPassword) {
      setError(['Passwords do not match.']);
    } else {
      try {
        await registerUser(email, password);
        setError(['Successful registration. Please log in.']);
        navigate('/login');
      } catch (err) {
        const errorData = err as { errors?: Record<string, string[]> };
        if (errorData.errors) {
          // Combine all messages from the server
          const allErrors = Object.values(errorData.errors).flat();
          setError(allErrors); // You could also map these into <ul> if you prefer
        } else {
          setError(['Error registering.']);
        }
      }
    }
  };

  return (
    <>
      <div className="position-fixed top-0 start-0 w-100" style={{ zIndex: 3 }}>
        <Navbar
          onSearchChange={() => {}}
          homePageBool={true}
          showSearch={false}
          setShowSearch={() => {}}
          searchInput=""
          setSearchInput={() => {}}
        />
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
          <h1 className="mb-4 fw-bold text-start">Register</h1>
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
            <div className="form-floating mb-3">
              <input
                className="form-control"
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
              />
              <label htmlFor="confirmPassword">Confirm Password</label>
              <span
                className="position-absolute top-50 end-0 translate-middle-y me-3"
                style={{ cursor: 'pointer', zIndex: 5 }}
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                <i
                  className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                  style={{ color: '#333' }}
                ></i>
              </span>
            </div>

            <div className="d-grid mb-3">
              <button
                className="btn btn-primary fw-bold text-uppercase"
                type="submit"
              >
                Register
              </button>
            </div>

            {error.length > 0 && (
              <div className="text-danger mb-3">
                <ul className="mb-0">
                  {error.map((errMsg, idx) => (
                    <li key={idx}>{errMsg}</li>
                  ))}
                </ul>
              </div>
            )}
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Register;
