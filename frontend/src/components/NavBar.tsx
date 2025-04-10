import { useNavigate } from 'react-router-dom';
import './NavBar.css';
import SearchBar from './SearchBar';
import { useEffect, useRef, useState } from 'react';
import { fetchCurrentUser } from '../api/MovieAPI';
import LogoutButton from './LogoutButton';

interface NavbarProps {
  onSearchChange?: (query: string | null) => void;
  homePageBool?: boolean;
  showSearch: boolean;
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
}

const Navbar: React.FC<NavbarProps> = ({
  onSearchChange = () => {},
  homePageBool = false,
  showSearch,
  setShowSearch,
  searchInput,
  setSearchInput,
}) => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>('Name');

  const searchRef = useRef<HTMLDivElement>(null); // 👈 for detecting outside clicks

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSearch(false); // Close the search bar
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
      <nav className="navbar d-flex justify-content-between align-items-center px-4 py-3">
        <div className="navbar-left">
          <div
            className="navbar-logo"
            onClick={
              homePageBool ? () => navigate('/') : () => navigate('/movie')
            }
          >
            <img
              src="/logos/horizontal_logo_no_background.png"
              alt="Home logo"
              height={70}
            />
          </div>

          {!homePageBool && (
            <div className="navbar-links">
              <span onClick={() => navigate('/movie')}>Home</span>
              <span onClick={() => navigate('/admin')}>Admin</span>
              <span onClick={() => navigate('/profile')}>Watchlist</span>
              <span onClick={() => navigate('/privacy')}>Privacy</span>
            </div>
          )}
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
            <div className="navbar-right">
              {/* Search toggle button */}
              {/* Search toggle button (only shows when search is hidden) */}
              {!showSearch && (
                <button
                  onClick={() => setShowSearch(true)}
                  className="search-icon-button"
                >
                  <i className="fas fa-search" />
                </button>
              )}

              {/* Conditionally render SearchBar and Clear Search */}
              <div ref={searchRef} className="d-flex align-items-center gap-2">
                {showSearch && (
                  <div className="search-container d-flex align-items-center gap-2">
                    <SearchBar
                      value={searchInput}
                      setValue={setSearchInput}
                      onSearchSubmit={(query) => {
                        onSearchChange(query);
                        setShowSearch(true);
                      }}
                    />

                    <button
                      className="clear-search-btn"
                      onClick={() => {
                        onSearchChange(null);
                        setShowSearch(false);
                        setSearchInput('');
                      }}
                    >
                      Clear Search
                    </button>
                  </div>
                )}
              </div>

              <div className="d-flex align-items-center gap-2">
                <div className="avatar-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="white"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="12"
                      fill="#222"
                      stroke="white"
                      strokeWidth="1"
                    />
                    <path
                      fill="#ccc"
                      d="M12 12c1.66 0 3-1.34 3-3S13.66 6 12 6 9 7.34 9 9s1.34 3 3 3zm0 2c-2.67 0-8 1.34-8 4v1h16v-1c0-2.66-5.33-4-8-4z"
                    />
                  </svg>
                </div>

                <div className="d-flex flex-column align-items-start small-text">
                  <span className="fw-light">{name}</span>
                  <LogoutButton />
                </div>
              </div>
            </div>
          </>
        )}
      </nav>
    </>
  );
};

export default Navbar;
