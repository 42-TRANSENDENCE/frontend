import React, { useCallback, useEffect, useState } from 'react';
import loadable from '@loadable/component';
import { useNavigate, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import {
  Container,
  MainContainer,
  ProfileContainer,
  Button,
  Nav,
  Label,
  Input,
  Workspaces,
  WorkspaceButton,
  Div,
} from './styles';
import GlobalStyles from '../../styles/global';
import home from '../../assets/home.svg';
import game from '../../assets/game.svg';
import chat from '../../assets/chat.svg';
import logout from '../../assets/logout.svg';
import setting from '../../assets/setting.svg';

// const Channel = loadable(() => import('@pages/Channel'));
const Channel = loadable(() => import('../../pages/Channel/Channel'));

const Home = () => {
  // const clientId = import.meta.env.VITE_CLIENT_ID;
  // const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
  // const redirectUri = import.meta.env.VITE_REDIRECT_URI;

  // useEffect(() => {
  //   const url = new URL(window.location.href);
  //   const authorizationCode = url.searchParams.get('code');

  //   if (authorizationCode) {
  //     const data = {
  //       grant_type: 'authorization_code',
  //       client_id: clientId,
  //       client_secret: clientSecret,
  //       code: authorizationCode,
  //       redirect_uri: redirectUri,
  //     };

  //     fetch('https://api.intra.42.fr/oauth/token', {
  //       method: 'POST',
  //       body: JSON.stringify(data),
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     })
  //       .then((response) => {
  //         console.log(response);
  //         if (!response.ok) {
  //           throw new Error('Failed to retrieve access token');
  //         }
  //         return response.json();
  //       })
  //       .then((data) => {
  //         const refreshToken = data.refresh_token;
  //         const accessToken = data.access_token;
  //         console.log(data);
  //         const headers = {
  //           Authorization: `Bearer ${accessToken}`,
  //         };
  //         fetch('https://api.intra.42.fr/v2/me', {
  //           headers,
  //         })
  //           .then((response) => {
  //             if (!response.ok) {
  //               throw new Error('Failed to retrieve user data');
  //             }
  //             return response.json();
  //           })
  //           .then((data) => console.log(data))
  //           .catch((error) => console.error(error));
  //       })
  //       .catch((error) => console.error(error))
  //       .finally(() => {
  //         // Remove the 'code' parameter from the URL
  //         window.history.replaceState(
  //           {},
  //           document.title,
  //           window.location.pathname
  //         );
  //       });
  //   }
  // }, [clientId, clientSecret, redirectUri]);

  const navigate = useNavigate();
  const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] =
    useState(false);

  const onClickLogOut = () => {
    navigate('/');
  };

  const onClickGame = () => {
    navigate('/game');
  };

  const onClickChat = () => {
    navigate('/chat');
  };

  const onClickCreateWorkspace = useCallback(() => {
    setShowCreateWorkspaceModal(true);
  }, []);

  const data = () => {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  return (
    <div>
      <GlobalStyles />
      <Container bg='#00E5FF'>
        <Nav>○ ○ ○</Nav>
        {/* <h1>Main Page!</h1> */}
        <Div>
          <Workspaces>
            <WorkspaceButton>
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
            <WorkspaceButton onClick={onClickCreateWorkspace}>
              +
            </WorkspaceButton>
          </Workspaces>
          <MainContainer bg='#00E5FF'>
            <Nav>○ ○ ○</Nav>
            <h1>전적 /</h1>
            <h1>승률 /</h1>
            <h1>친구 목록 등</h1>
            <Channel />
          </MainContainer>
          <ProfileContainer bg='#00E5FF'>
            <Nav>○ ○ ○</Nav>
            <h1>Profile!</h1>
            <Channel />
          </ProfileContainer>
        </Div>
      </Container>
    </div>
  );
};
export default Home;
