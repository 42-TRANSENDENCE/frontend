import { Container } from './styles';
import loginButton from '../../assets/bigButton/loginButton.svg';
import Button from '../../components/Button';
import Title from '../../components/Title';

const LogIn = () => {
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_REDIRECT_URI;

  const onClick = () => {
    const apiUrl = `https://api.intra.42.fr/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
    window.location.href = apiUrl;
  };

  return (
    <Container>
      <div className='Title'>
        <Title title='PONG PONG' />
      </div>
      <div className='Body'>
        <Button img_url={loginButton} onClick={onClick} />
      </div>
    </Container>
  );
}

export default LogIn;
