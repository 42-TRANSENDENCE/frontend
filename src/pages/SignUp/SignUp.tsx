import React, { useCallback, useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import useInput from '../../hooks/useInput';
import { Container, Button, Nav, Label, Input, Conflict } from './styles';
import GlobalStyles from '../../styles/global';
import { useRecoilValue } from 'recoil';
import { accessTokenState } from '../../recoil/authState';

const SignUp = () => {
  const awsUrl = import.meta.env.VITE_AWS_URL;
  const navigate = useNavigate();
  const queryClient = new QueryClient();
  const accessToken = useRecoilValue(accessTokenState);

  const isValidUsername = (username: string): boolean => {
    const consecutivePeriodsRegex = /\.{2,}/;
    const invalidCharactersRegex = /[^\w-.']/;

    // lowercase the username
    username = username.toLowerCase();

    // check for consecutive periods and invalid characters
    if (
      consecutivePeriodsRegex.test(username) ||
      invalidCharactersRegex.test(username)
    ) {
      return false;
    }

    // check the length
    if (username.length > 12) {
      return false;
    }

    return true;
  };

  const nickname = useInput('', isValidUsername);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [nicknameConflict, setNicknameConflict] = useState(false);

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setNicknameConflict(false);
      queryClient
        .fetchQuery('signup', () =>
          fetch(awsUrl + '/auth/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ nickname: nickname.value }),
          })
        )
        .then((response) => {
          if (response.status === 201) {
            navigate('/home');
          } else if (response.status === 401) {
            console.log('accessToken expired');
          } else if (response.status === 400) {
            setNicknameConflict(true);
          } else {
            throw new Error('Unexpected response status code');
          }
        });
    },
    [nickname, navigate, queryClient, awsUrl]
  );

  const onNicknameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      nickname.onChange(e);

      // enable submit button if nickname is valid and has at least 3 characters
      setIsSubmitDisabled(e.target.value.length < 3);
    },
    [nickname]
  );

  return (
    <div>
      <GlobalStyles />
      <Container>
        <Nav>○ ○ ○</Nav>
        <h1>42 PONG</h1>
        <form onSubmit={onSubmit}>
          <Label id='nickname-label'>
            <span>Nickname</span>
            <Input
              placeholder='nickname'
              {...nickname}
              onChange={onNicknameChange}
            />
          </Label>
          {nicknameConflict && (
            <Conflict>Nickname already exist. Try something else.</Conflict>
          )}
          <Button type='submit' disabled={isSubmitDisabled}>
            Sign Up
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default SignUp;
