import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useState } from 'react';

interface NavbarProps {
  onSearchChange: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearchChange }) => {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);
    onSearchChange(value); // 👈 sends input to parent
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <div className="navbar-logo" onClick={() => navigate('/')}>
            <img src="logos/horizontal logo.png" alt="Home logo" height={70} />
          </div>

          <div className="navbar-links">
            <span onClick={() => navigate('/')}>Home</span>
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
            value={searchInput}
            onChange={handleSearchChange}
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
