import { useCallback, useState } from 'react';
import { useMutation } from 'react-query';
import useInput from '../../hooks/useInput';
import { useNavigate } from 'react-router-dom';
import { Container, Label, Input, Inputs, Form, Conflict } from './styles';
import Button from '../../components/Button';
import Title from '../../components/Title';
import loginButton from '../../assets/bigButton/2FALoginButton.svg';

const TwoFactor = () => {
  const awsUrl = import.meta.env.VITE_AWS_URL;
  const p1 = useInput('');
  const p2 = useInput('');
  const p3 = useInput('');
  const p4 = useInput('');
  const p5 = useInput('');
  const p6 = useInput('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [twoFactorError, setTwoFactorError] = useState(false);

  const mutation = useMutation(async (password: string) => {
    const response = await fetch(awsUrl + '/2fa/validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ token: password }),
    });
    if (response.status === 200) {
      navigate('/home');
    } else if (response.status === 401) {
      setTwoFactorError(true);
      setPassword('');
    } else {
      throw new Error('Unexpected response status code');
    }
  });

  const handleInputChange = (index: number, value: string) => {
    if (value.length === 1 && !isNaN(Number(value))) {
      setPassword(password + value);
      const nextInput = document.getElementById(
        `p${index + 1}`
      ) as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      } else {
        const currentInput = document.getElementById(
          `p${index}`
        ) as HTMLInputElement;
        if (currentInput) {
          currentInput.blur();
        }
      }
    }
  };
  

  const onSubmit = useCallback(
    (e: any) => {
      e.preventDefault();
      mutation.mutate(password);
    },
    [mutation, password]
  );

  return (
    <Container>
      <div className='Title'>
        <Title title='PONG 2FA' />
      </div>
      <div className='Body'>
        <Form onSubmit={onSubmit}>
          <Label id='password'>
            <span>Google Authenticator</span>
            <Inputs>
              <Input
                id='p1'
                maxLength={1}
                onChange={(e) => handleInputChange(1, e.target.value)}
              />
              <Input
                id='p2'
                maxLength={1}
                onChange={(e) => handleInputChange(2, e.target.value)}
              />
              <Input
                id='p3'
                maxLength={1}
                onChange={(e) => handleInputChange(3, e.target.value)}
              />
              <Input
                id='p4'
                maxLength={1}
                onChange={(e) => handleInputChange(4, e.target.value)}
              />
              <Input
                id='p5'
                maxLength={1}
                onChange={(e) => handleInputChange(5, e.target.value)}
              />
              <Input
                id='p6'
                maxLength={1}
                onChange={(e) => handleInputChange(6, e.target.value)}
              />
            </Inputs>
          </Label>
          {twoFactorError && (
            <Conflict>2FA authentication failed. Please try again.</Conflict>
        )}

          <Button img_url={loginButton} type='submit' />
        </Form>
      </div>
    </Container>
  );
};

export default TwoFactor;
