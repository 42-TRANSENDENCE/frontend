import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const PrivateRoute = ({ component: Component }: { component: React.ComponentType<any> }) => {
  const awsUrl = `http://${import.meta.env.VITE_AWS_URL}:${import.meta.env.VITE_AWS_PORT}`;
  const [authenticated, setAuthenticated] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const userResponse = await fetch(awsUrl + '/users', {
        method: 'GET',
        credentials: 'include'
      })
      if (userResponse.status === 404) {
        setAuthenticated(false);
      }
      else if (userResponse.status === 401) {
        const refreshResponse = await fetch(awsUrl + '/auth/refresh', {
          method: 'GET',
          credentials: 'include'
        })
        if (refreshResponse.status === 401) {
          setAuthenticated(false);
        }
        else {
          const userResponse2 = await fetch(awsUrl + '/users', {
            method: 'GET',
            credentials: 'include'
          })
          if (userResponse2.status === 401)
            setAuthenticated(false);
        }
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

export const TwoFactorRoute = ({ component: Component }: { component: React.ComponentType<any> }) => {
  const awsUrl = `http://${import.meta.env.VITE_AWS_URL}:${import.meta.env.VITE_AWS_PORT}`;
  const [authenticated, setAuthenticated] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const refreshResponse = await fetch(awsUrl + '/auth/refresh', {
        method: 'GET',
        credentials: 'include'
      })
      if (refreshResponse.status === 401) {
        setAuthenticated(false);
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
