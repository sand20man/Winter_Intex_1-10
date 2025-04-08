import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import SearchBar from './SearchBar';
import { Movie } from '../types/Movie';
import { fetchSearch } from '../api/MovieAPI';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleSearch = async (query: string) => {
    try {
      const results: Movie[] = await fetchSearch(query);
      // Navigate to home with state that includes the results
      navigate('/', { state: { searchResults: results, query } });
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <div className="navbar-logo" onClick={() => navigate('/')}>
            <img src="/logos/horizontal logo.png" alt="Home logo" height={70} />
          </div>

          <div className="navbar-links">
            <span onClick={() => navigate('/')}>Home</span>
            <span onClick={() => navigate('/admin')}>Admin</span>
            <span onClick={() => navigate('/profile')}>Watchlist</span>
            <span onClick={() => navigate('/privacy')}>Privacy</span>
          </div>
        </div>

        <div className="navbar-right">
          <SearchBar onSearchSubmit={handleSearch} />
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
