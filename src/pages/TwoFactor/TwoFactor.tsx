import { useCallback, useState, useEffect, useRef } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Container, Label, Input, Inputs, Form, Conflict } from './styles';
import Button from '../../components/Button';
import Title from '../../components/Title';
import loginButton from '../../assets/bigButton/2FALoginButton.svg';

const TwoFactor = () => {
  const awsUrl = import.meta.env.VITE_AWS_URL;
  const [password, setPassword] = useState('');
  const ref1 = useRef<HTMLInputElement>(null);
  const ref2 = useRef<HTMLInputElement>(null);
  const ref3 = useRef<HTMLInputElement>(null);
  const ref4 = useRef<HTMLInputElement>(null);
  const ref5 = useRef<HTMLInputElement>(null);
  const ref6 = useRef<HTMLInputElement>(null);
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

  const handleOnChange = useCallback((index: number, value: string) => {
    if (value.length === 1 && !isNaN(Number(value))) {
      setPassword((prevPassword) => {
        const newPassword = prevPassword.slice(0, index) + value + prevPassword.slice(index + 1);
        return newPassword;
      });
      switch (index) {
        case 0:
          ref2.current?.focus();
          break;
        case 1:
          ref3.current?.focus();
          break;
        case 2:
          ref4.current?.focus();
          break;
        case 3:
          ref5.current?.focus();
          break;
        case 4:
          ref6.current?.focus();
          break;
        case 5:
          ref6.current?.blur();
          break;
        default:
          break;
      }
    } else {
      setPassword((prevPassword) => {
        const newPassword = prevPassword.slice(0, index) + prevPassword.slice(index + 1);
        return newPassword;
      });
    }
    if (twoFactorError) {
      setTwoFactorError(false);
    }
  }, [twoFactorError]);

  const onSubmit = useCallback(
    (e: any) => {
      e.preventDefault();
      mutation.mutate(password);
    },
    [mutation, password]
  );

   useEffect(() => {
    ref1.current?.focus();
  }, []);

  useEffect(() => {
    if (twoFactorError) {
      ref1.current!.value = '';
      ref2.current!.value = '';
      ref3.current!.value = '';
      ref4.current!.value = '';
      ref5.current!.value = '';
      ref6.current!.value = '';
      ref1.current?.focus();
      setPassword('');
    }
  }, [twoFactorError]);

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
              <Input type='text' maxLength={1} ref={ref1} onChange={(event) => handleOnChange(0, event.target.value)} />
              <Input type='text' maxLength={1} ref={ref2} onChange={(event) => handleOnChange(1, event.target.value)} />
              <Input type='text' maxLength={1} ref={ref3} onChange={(event) => handleOnChange(2, event.target.value)} />
              <Input type='text' maxLength={1} ref={ref4} onChange={(event) => handleOnChange(3, event.target.value)} />
              <Input type='text' maxLength={1} ref={ref5} onChange={(event) => handleOnChange(4, event.target.value)} />
              <Input type='text' maxLength={1} ref={ref6} onChange={(event) => handleOnChange(5, event.target.value)} />
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
