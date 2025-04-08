import { useNavigate } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="footer-left" onClick={() => navigate('/')}>
        <img
          src="logos/horizontal logo.png"
          alt="CineNiche Logo"
          className="footer-logo"
          height={50}
        />
      </div>

      <div className="footer-center">
        <span onClick={() => navigate('/privacy')} className="footer-link">
          Privacy Policy
        </span>
      </div>

      <div className="footer-right">
        <span>
          &copy; {new Date().getFullYear()} CineNiche. All rights reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
