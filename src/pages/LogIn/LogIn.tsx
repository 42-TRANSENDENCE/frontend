import { LoginContainer, LoginButton } from "./styles";
import { Window } from "../../components/Window/Window";

const LogIn = () => {
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_REDIRECT_URI;

  const onClick = () => {
    const apiUrl = `https://api.intra.42.fr/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
    window.location.href = apiUrl;
  };

  return (
    // <>
    //   <Container>
    //     <Nav>○ ○ ○</Nav>
    //     <h1>42 PONG</h1>
    //     <Button onClick={onClick}>42 LogIn</Button>
    //   </Container>
    // </>
    <Window title="42Pong" width="80%" height="60%" background="#00e5ff">
      <LoginContainer>
        <h1>42 PONG</h1>
        <LoginButton onClick={onClick}>42 LogIn</LoginButton>
      </LoginContainer>
    </Window>
  );
};

export default LogIn;
