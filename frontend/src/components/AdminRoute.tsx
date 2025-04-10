import { JSX, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config';

export default function AdminRoute({ children }: { children: JSX.Element }) {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const navigate = useNavigate();

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
