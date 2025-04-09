import { JSX, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AdminRoute({ children }: { children: JSX.Element }) {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkRole = async () => {
      try {
        const response = await axios.get(
          'https://intexwinter-d4e7fdc7hhembcdg.eastus-01.azurewebsites.net/api/roles',
          {
            withCredentials: true,
          }
        );
        console.log(`response: ${response.data}`);
        setIsAdmin(response.data.includes('admin'));
      } catch (error) {
        setIsAdmin(false);
        console.log(`Error, ${error}`);
      }
    };

    checkRole();
  }, []);

  // Redirect once when determined user is not admin
  useEffect(() => {
    if (isAdmin === false) {
      alert('You are not an admin!');
      navigate('/movie');
    }
  }, [isAdmin, navigate]);

  if (isAdmin === null) return <p>Loading...</p>;
  if (!isAdmin) return null;

  return children;
}
