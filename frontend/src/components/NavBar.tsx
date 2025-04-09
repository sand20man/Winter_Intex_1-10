import { useNavigate } from 'react-router-dom';
import '/Users/colemansandy/Desktop/BYU/JuniorCore/intex winter/frontend/src/components/NavBar.css';
import SearchBar from './SearchBar';
import { useEffect, useState } from 'react';
import { fetchCurrentUser } from '../api/MovieAPI';

interface NavbarProps {
  onSearchChange?: (query: string | null) => void;
  homePageBool?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({
  onSearchChange = () => {},
  homePageBool = false,
}) => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>('Name');

  useEffect(() => {
    const loadUser = async () => {
      try {
        // Get user info from backend
        const user = await fetchCurrentUser();

        setName(user.name.split(' ')[0]);
      } catch (error) {
        console.error('Failed to load recommendations', error);
      }
    };

    loadUser();
  }, []);

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
              <button
                className="bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded"
                onClick={() => {
                  onSearchChange(null);
                }}
              >
                Clear Search
              </button>
              <div className="navbar-profile">
                <span className="navbar-avatar">👤</span>
                <span className="navbar-name">{name}</span>
              </div>
            </div>
          </>
        )}
      </nav>
    </>
  );
};

export default Navbar;
