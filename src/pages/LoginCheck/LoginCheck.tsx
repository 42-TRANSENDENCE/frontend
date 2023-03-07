import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { Container, Nav } from '../../styles/styles';
import GlobalStyles from '../../styles/global';

const LoginCheck = () => {
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
  const redirectUri = import.meta.env.VITE_REDIRECT_URI;
  const awsUrl = import.meta.env.VITE_AWS_URL;

  const loginCheckQuery = useQuery('loginCheck', async () => {
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get('code');

    if (!authorizationCode) {
      throw new Error('Authorization code not found');
    }

    const data = {
      grant_type: 'authorization_code',
      client_id: clientId,
      client_secret: clientSecret,
      code: authorizationCode,
      redirect_uri: redirectUri,
    };

    const response = await fetch('https://api.intra.42.fr/oauth/token', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to retrieve access token');
    }

    const tokenData = await response.json();
    const accessToken = tokenData.access_token;
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };

    const loginResponse = await fetch(awsUrl + '/auth/login', {
      method: 'GET',
      headers: headers,
    });

    if (loginResponse.status === 200) {
      window.location.href = 'http://localhost:5173/home';
    } else if (loginResponse.status === 401) {
      window.location.href = 'http://localhost:5173/twofactor';
    } else if (loginResponse.status === 404) {
      window.location.href = 'http://localhost:5173/signUp';
    } else {
      throw new Error('Unexpected response status code');
    }
  });

  useEffect(() => {
    const { status, data, error } = loginCheckQuery;

    if (status === 'error') {
      console.error(error);
    }

    if (status === 'success') {
      console.log(data);
    }
  }, [loginCheckQuery]);

  return (
    <div>
      <GlobalStyles />
      <Container bg='#00E5FF'>
        <Nav>○ ○ ○</Nav>
        <h1>Loading...</h1>
      </Container>
    </div>
  );
};

export default LoginCheck;
