import React, { useCallback, useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Nav } from './styles';
import GlobalStyles from '../../styles/global';


const LogIn = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate('/signup');
  }

  return (
    <>
      <GlobalStyles />
      <Container bg='#00E5FF'>
        <Nav>○ ○ ○</Nav>
        <h1>42 PONG</h1>
        <Button onClick={onClick}>42 LogIn</Button>
      </Container>
    </>
  )
}

export default LogIn;
