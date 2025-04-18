import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { API_URL } from '../config';

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // 1. Sign out of backend first — it has session cookies
      await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });

      // 2. Then sign out from Firebase if needed
      const auth = getAuth();
      if (auth.currentUser) {
        await signOut(auth);
      }

      // 3. Clear only what's needed, not blindly everything
      localStorage.removeItem('user'); // or just your app-specific keys
      // Optionally: context reset (if using UserContext)

      // 4. Redirect to login
      navigate('/');
    } catch (err: unknown) {
      console.error('Logout error:', err);
      alert('Failed to log out');
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="text-white text-start px-0 py-1 border-0 bg-transparent small-hover"
    >
      Logout
    </button>
  );
}
