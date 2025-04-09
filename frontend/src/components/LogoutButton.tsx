import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // 1. Sign out of backend first — it has session cookies
      await axios.post(
        'https://intexwinter-d4e7fdc7hhembcdg.eastus-01.azurewebsites.net/logout',
        {},
        { withCredentials: true }
      );

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
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
    >
      Logout
    </button>
  );
}
