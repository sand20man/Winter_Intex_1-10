import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import SearchBar from './SearchBar';

interface NavbarProps {
  onSearchChange?: (query: string) => void;
  homePageBool?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({
  onSearchChange = () => {},
  homePageBool = false,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <div className="navbar-logo" onClick={() => navigate('/movie')}>
            <img src="/logos/horizontal logo.png" alt="Home logo" height={70} />
          </div>
        </div>
        {homePageBool ? (
          <div className="navbar-right" style={{ paddingRight: '2.5%' }}>
            <div className="navbar-profile">
              <button
                className="btn btn-light"
                onClick={() => navigate('/login')}
              >
                Log In
              </button>
              <button
                className="btn btn-outline-light"
                onClick={() => navigate('/register')}
              >
                Get Started
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="navbar-left">
              <div className="navbar-links">
                <span onClick={() => navigate('/movie')}>Home</span>
                <span onClick={() => navigate('/admin')}>Admin</span>
                <span onClick={() => navigate('/profile')}>Watchlist</span>
                <span onClick={() => navigate('/privacy')}>Privacy</span>
              </div>
            </div>
            <div className="navbar-right">
              {onSearchChange && <SearchBar onSearchSubmit={onSearchChange} />}
              <div className="navbar-profile">
                <span className="navbar-avatar">👤</span>
                <span className="navbar-name">Name</span>
              </div>
            </div>
          </>
        )}
      </nav>
    </>
  );
};

export default Navbar;
