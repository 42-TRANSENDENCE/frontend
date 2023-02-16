import React, { useCallback, useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import useInput from '../../hooks/useInput';
import { Container, Button, Nav, Label, Input } from './styles';
import GlobalStyles from '../../styles/global';


const SignUp = () => {
  const maxLen = (value: string) => value.length < 12;
  const nickname = useInput('', maxLen);
  const navigate = useNavigate();

  const onSubmit = useCallback((e: any) => {
    e.preventDefault();
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nickname),
    });
    navigate('/home');
  }, [nickname]);

  return (
    <div>
      <GlobalStyles />
      <Container bg='#00E5FF'>
        <Nav>○ ○ ○</Nav>
        <h1>42 PONG</h1>
        <form onSubmit={onSubmit}>
          <Label id="nickname-label">
            <span>Nickname</span>
            <Input placeholder="nickname" {...nickname}/>
          </Label>
          <Button type='submit'>Sign Up</Button>
        </form>
      </Container>
    </div>
  )
}

export default SignUp;
