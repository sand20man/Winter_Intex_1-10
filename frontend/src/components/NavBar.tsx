import { useNavigate } from 'react-router-dom';
import './NavBar.css';
import { useEffect, useRef, useState } from 'react';
import { fetchCurrentUser } from '../api/MovieAPI';
import LogoutButton from './LogoutButton';
import { API_URL } from '../config';

interface NavbarProps {
  onSearchChange?: (query: string | null) => void;
  onHomeClick?: () => void;
  homePageBool?: boolean;
  showSearch: boolean;
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
}

const Navbar: React.FC<NavbarProps> = ({
  //onSearchChange = () => {},
  onHomeClick = () => {}, // ← Add this default so it's defined
  homePageBool = false,
  //showSearch,
  setShowSearch,
  //searchInput,
  //setSearchInput,
}) => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>('Name');
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

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
  }, [setShowSearch]);

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

  useEffect(() => {
    const checkRole = async () => {
      try {
        let email = '';
        console.log('Getting users credentials');
        await fetch(`${API_URL}/pingauth`, {
          method: 'GET',
          credentials: 'include',
        })
          .then((res) => res.json())
          .then((data) => {
            email = data.email;
            console.log(`Email: ${data.email}`);
          })
          .catch((err) => console.error('PingAuth Fetch failed:', err));

        console.log('fetching user role through loops');
        const encodedEmail = encodeURIComponent(email);
        const response = await fetch(
          `${API_URL}/get-role-by-email?email=${encodedEmail}`,
          {
            method: 'GET',
            credentials: 'include',
          }
        );
        console.log('data retrieval...');
        const data = await response.json();
        console.log(`data: ${data}`);

        if (data.role === 'admin') {
          console.log('user is admin');
          setIsAdmin(true);
        } else {
          console.log('user is not admin');
          setIsAdmin(false);
        }
      } catch (error) {
        console.error('Error checking roles:', error);
        setIsAdmin(false);
      }
    };

    checkRole();
  }, []);

  return (
    <>
      <nav className="navbar d-flex justify-content-between align-items-center px-4 py-3">
        <div className="navbar-left">
          <div
            className="navbar-logo"
            onClick={() => {
              onHomeClick?.(); // ← reset search, genre, etc.
              navigate('/movie'); // ← go to movie page
            }}
          >
            <img
              src="/logos/horizontal_logo_no_background.png"
              alt="Home logo"
              height={70}
            />
          </div>

          {!homePageBool && (
            <div className="navbar-links">
              <span
                onClick={() => {
                  onHomeClick?.(); // ← Clears search state
                  navigate('/movie'); // ← Navigates to movie page
                }}
              >
                Home
              </span>

              {isAdmin ? (
                <span onClick={() => navigate('/admin')}>Admin</span>
              ) : null}
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
