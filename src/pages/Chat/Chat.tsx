import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Workspaces, WorkspaceButton, Div, Container, Nav } from '../../layouts/Home/styles';
import GlobalStyles from '../../styles/global';
import home from '../../assets/home.svg';
import game from '../../assets/game.svg';
import chat from '../../assets/chat.svg';
import logout from '../../assets/logout.svg';
import setting from '../../assets/setting.svg';

const Chat = () => {
  const awsUrl = import.meta.env.VITE_AWS_URL;
  const navigate = useNavigate();

  const onClickHome = () => {
    navigate('/home');
  };

  const onClickLogOut = () => {
    fetch(awsUrl + '/auth/logout', {
      method: 'POST',
      body: JSON.stringify(''),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      if (response.status === 200) {
        window.location.href = 'http://localhost:5173/';
      } else {
        throw new Error('Unexpected response status code');
      }
    })
  };

  const onClickGame = () => {
    navigate('/game');
  };

  const onClickChat = () => {
    window.location.reload();
  };
  return (
    <div>
      <GlobalStyles />
      <Container bg='#00E5FF'>
        <Nav>○ ○ ○</Nav>
        <Div>
          <Workspaces>
            <WorkspaceButton onClick={onClickHome}>
              <img src={home}></img>
            </WorkspaceButton>
            <WorkspaceButton onClick={onClickGame}>
              <img src={game}></img>
            </WorkspaceButton>
            <WorkspaceButton onClick={onClickChat}>
              <img src={chat}></img>
            </WorkspaceButton>
            <WorkspaceButton>
              <img src={setting}></img>
            </WorkspaceButton>
            <WorkspaceButton onClick={onClickLogOut}>
              <img src={logout}></img>
            </WorkspaceButton>
          </Workspaces>
        </Div>
        <h1>Chat Page!</h1>
        <h1>...</h1>
      </Container>
    </div>
  );
}

export default Chat;
