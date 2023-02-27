import React, { useEffect } from 'react';
import { Container, Nav } from '../../styles/styles';
import GlobalStyles from '../../styles/global';

const LoginCheck = () => {
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
  const redirectUri = import.meta.env.VITE_REDIRECT_URI;

  useEffect(() => {
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get('code');

    if (authorizationCode) {
      const data = {
        grant_type: 'authorization_code',
        client_id: clientId,
        client_secret: clientSecret,
        code: authorizationCode,
        redirect_uri: redirectUri,
      };

      window.history.replaceState(
        {},
        document.title,
        window.location.pathname
      );

      fetch('https://api.intra.42.fr/oauth/token', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          console.log(response);
          if (!response.ok) {
            throw new Error('Failed to retrieve access token');
          }
          return response.json();
        })
        .then((data) => {
          const accessToken = data.access_token;
          const headers = {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          };
          // Include any additional data you want to send in the body of the request
          const body = JSON.stringify({
            accessToken: accessToken,
            // Add any additional properties you want to send
          });
        
          fetch('http://3.239.39.168/auth/login', {
            method: 'GET',
            headers: headers,
          })
          .then((response) => {
            if (response.status === 200) {
              window.location.href = 'http://localhost:5173/home';
            } else if (response.status === 401) {
              window.location.href = 'http://localhost:5173/twofactor';
            } else if (response.status === 404) {
              window.location.href = 'http://localhost:5173/signUp';
            } else {
              throw new Error('Unexpected response status code');
            }
          })
        })
        .catch((error) => console.error(error));
    }
  }, [clientId, clientSecret, redirectUri]);

  return (
    <div>
      <GlobalStyles />
      <Container bg='#00E5FF'>
        <Nav>○ ○ ○</Nav>
        <h1>Loading...</h1>
      </Container>
    </div>
  );
}

export default LoginCheck;
