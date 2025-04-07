import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left" onClick={() => navigate('/')}>
          <div className="navbar-logo">
            <img src="logos/horizontal logo.png" alt="Home logo" height={70} />
          </div>

          <div className="navbar-links">
            <span onClick={() => navigate('/movies')}>Movies</span>
            <span onClick={() => navigate('/recommendations')}>
              Recommendations
            </span>
            <span onClick={() => navigate('/admin')}>Admin</span>
            <span onClick={() => navigate('/profile')}>Watchlist</span>
            <span onClick={() => navigate('/privacy')}>Privacy</span>
          </div>
        </div>

        <div className="navbar-right">
          <input
            type="text"
            placeholder="Search..."
            className="navbar-search"
          />
          <div className="navbar-profile">
            <span className="navbar-avatar">👤</span>
            <span className="navbar-name">Name</span>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
