import { useNavigate } from 'react-router-dom';
import './NavBar.css';
const AdminTopBar = () => {
  const navigate = useNavigate();

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <div className="navbar-logo" onClick={() => navigate('/movie')}>
            <img src="logos/horizontal logo.png" alt="Home logo" height={70} />
          </div>

          <div className="navbar-links">
            <span onClick={() => navigate('/movie')}>Home</span>
            <span onClick={() => navigate('/admin')}>Admin</span>
            <span onClick={() => navigate('/profile')}>Watchlist</span>
            <span onClick={() => navigate('/privacy')}>Privacy</span>
          </div>
        </div>

        <div className="navbar-right">
          <div className="navbar-profile">
            <span className="navbar-avatar">👤</span>
            <span className="navbar-name">Name</span>
          </div>
        </div>
      </nav>
    </>
  );
};

export default AdminTopBar;
