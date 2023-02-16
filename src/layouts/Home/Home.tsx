import React, { useCallback, useEffect, useState } from 'react';
import loadable from '@loadable/component';
import { useNavigate, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { Container, InnerContainer, Button, Nav, Label, Input, Workspaces, WorkspaceButton, AddButton, Div } from './styles';
import GlobalStyles from '../../styles/global';

// const Channel = loadable(() => import('@pages/Channel'));
const Channel = loadable(() => import('../../pages/Channel/Channel'));

const Home = () => {
  const navigate = useNavigate();
  const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] = useState(false);

  const onClickLogOut = () => {
    navigate('/');
  }

  const onClickGame = () => {
    navigate('/game');
  }

  const onClickChat = () => {
    navigate('/chat');
  }

  const onClickCreateWorkspace = useCallback(() => {
    setShowCreateWorkspaceModal(true);
  }, []);

  const data = () => {
    fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then((response) => response.json())
      .then((data) => console.log(data));
  }


  return  (
    <div>
      <GlobalStyles />
      <Container bg='#00E5FF'>
        <Nav>○ ○ ○</Nav>
        <h1>Main Page!</h1>
        <Div>
          <Workspaces>
            <WorkspaceButton onClick={onClickLogOut}>LogOut</WorkspaceButton>
            <WorkspaceButton onClick={onClickGame}>Play Game</WorkspaceButton>
            <WorkspaceButton onClick={onClickChat}>Chat</WorkspaceButton>
            <AddButton onClick={onClickCreateWorkspace}>+</AddButton>
          </Workspaces>
          <InnerContainer bg='#00E5FF'>
            <Nav>○ ○ ○</Nav>
            <h1>Window!</h1>
            <Channel />
          </InnerContainer>
        </Div>
      </Container>
    </div>
  );
}

export default Home;
