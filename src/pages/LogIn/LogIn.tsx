import { Container } from './styles';
import loginButton from '../../assets/bigButton/loginButton.svg';
import { BigButton } from '../../components/Button';
import Title from '../../components/Title';
import { useState } from 'react';
import { CircularProgress } from '@mui/material';

const LogIn = () => {
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_REDIRECT_URI;
  const [isLoading, setIsLoading] = useState(false);

  const onClick = () => {
    const apiUrl = `https://api.intra.42.fr/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
    window.location.href = apiUrl;
    setIsLoading(true);
  };

  return (
    <Container>
      <div className='Title'>
        <Title title='PONG PONG' />
      </div>
      <div className='BodyOuter'>
        <div className='Body'>
          <div className='BigButtons'>
            {isLoading ? <CircularProgress /> :
              <BigButton img_url={loginButton} onClick={onClick} />}
          </div>
        </div>
      </div>
    </Container>
  );
}

export default LogIn;
