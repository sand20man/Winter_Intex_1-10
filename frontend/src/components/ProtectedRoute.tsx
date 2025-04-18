import { JSX, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { API_URL } from '../config';

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      // console.log('Getting to checkAuth');

      try {
        const response = await fetch(`${API_URL}/pingauth`, {
          method: 'GET',
          credentials: 'include',
        });

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Invalid response format');
        }

        const data = await response.json();

        if (response.ok && data?.email) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <p>Loading...</p>; // or a spinner
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
