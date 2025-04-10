import { JSX, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AdminRoute({ children }: { children: JSX.Element }) {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkRole = async () => {
      try {
        const response = await fetch(
          'https://intexwinter-d4e7fdc7hhembcdg.eastus-01.azurewebsites.net/api/roles',
          {
            method: 'GET',
            credentials: 'include',
          }
        );

        console.log('Roles response:', response.data);

        // ✅ assumes response is a raw array like ["admin"]
        setIsAdmin(
          Array.isArray(response.data) && response.data.includes('admin')
        );
      } catch (error) {
        console.error('Error checking roles:', error);
        setIsAdmin(false);
      }
    };

    checkRole();
  }, []);

  useEffect(() => {
    if (isAdmin === false) {
      alert('You are not an admin!');
      navigate('/movie');
    }
  }, [isAdmin, navigate]);

  if (isAdmin === null) return <p>Checking admin privileges...</p>;
  if (!isAdmin) return null;

  return children;
}
