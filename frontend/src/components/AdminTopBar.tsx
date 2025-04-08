import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const AdminTopBar = () => {
  const navigate = useNavigate();

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <div className="navbar-logo" onClick={() => navigate('/')}>
            <img src="logos/horizontal logo.png" alt="Home logo" height={70} />
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
