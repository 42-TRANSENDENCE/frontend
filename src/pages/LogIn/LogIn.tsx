import { Container, Button, Nav } from './styles';
import GlobalStyles from '../../styles/global';

const LogIn = () => {
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_REDIRECT_URI;

  const onClick = () => {
    const apiUrl = `https://api.intra.42.fr/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
    window.location.href = apiUrl;
  };

  return (
    <>
      <GlobalStyles />
      <Container>
        <Nav>○ ○ ○</Nav>
        <h1>42 PONG</h1>
        <Button onClick={onClick}>42 LogIn</Button>
      </Container>
    </>
  );
};

export default LogIn;
