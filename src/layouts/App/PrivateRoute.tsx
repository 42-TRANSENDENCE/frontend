import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const PrivateRoute = ({ component: Component }: { component: React.ComponentType<any> }) => {
  const awsUrl = `http://${import.meta.env.VITE_AWS_URL}`;
  const [authenticated, setAuthenticated] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch(awsUrl + '/users', {
        method: 'GET',
        credentials: 'include'
      })
      if (response.status === 401) {
        const response2 = await fetch(awsUrl + '/auth/refresh', {
          method: 'GET',
          credentials: 'include'
        })
        if (response2.status === 401) {
          setAuthenticated(false);
        }
      } else {
        // handle other response status codes...
      }
    };

    fetchUserData();
  }, []);

  if (!authenticated) {
    toast.warning('Login required');
    return <Navigate to='/login' />;
  }

  return <Component />;
};

export default PrivateRoute;
