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
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from './styles';
import GlobalStyles from '../../styles/global';
import home from '../../assets/home.svg';
import game from '../../assets/game.svg';
import chat from '../../assets/chat.svg';
import logout from '../../assets/logout.svg';
import setting from '../../assets/setting.svg';

// const Channel = loadable(() => import('@pages/Channel'));
const Channel = loadable(() => import('../../pages/Channel/Channel'));

interface Profile {
  name: string;
  photo: Blob;
}

const Home = () => {
  // const value = `cookie : ${document.cookie}`;
  const awsUrl = import.meta.env.VITE_AWS_URL;
  const navigate = useNavigate();
  const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] =
    useState(false);
  const [showTwoFactorModal, setShowTwoFactorModal] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const onClickCreateWorkspace = useCallback(() => {
    setShowCreateWorkspaceModal(true);
  }, []);

  const toggleTwoFactor = useCallback(() => {
    setTwoFactorEnabled(!twoFactorEnabled);
  }, [twoFactorEnabled]);

  const onCloseTwoFactorModal = useCallback(() => {
    setShowTwoFactorModal(false);
  }, []);

  const onOpenTwoFactorModal = useCallback(() => {
    setShowTwoFactorModal(true);
  }, []);

  const onClickHome = () => {
    window.location.reload();
  };

  const onClickLogOut = () => {
    fetch(awsUrl + '/auth/logout', {
      method: 'POST',
      credentials: 'include',
    }).then((response) => {
      if (response.status === 200) {
        window.location.href = 'http://44.195.129.81:5173/';
      } else {
        throw new Error('Unexpected response status code');
      }
    });
  };

  const onClickGame = () => {
    navigate('/game');
  };

  const onClickChat = () => {
    navigate('/chat');
  };

  const [profile, setProfile] = useState<Profile>({ name: '', photo: new Blob() });

  const fetchProfile = useCallback(async () => {
    try {
      // const nameResponse = await fetch(`${awsUrl}/users`);
      // const name = await nameResponse.text();
      const name = 'keokim';

      const photoResponse = await fetch('https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9&s=fb86e2e09fceac9b363af536b93a1275');
      const photo = await photoResponse.blob();

      setProfile({ name, photo });
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  }, [awsUrl]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return (
    <div>
      <GlobalStyles />
      <Container>
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
            <WorkspaceButton onClick={onOpenTwoFactorModal}>
              <img src={setting}></img>
            </WorkspaceButton>
            <WorkspaceButton onClick={onClickLogOut}>
              <img src={logout}></img>
            </WorkspaceButton>
            <WorkspaceButton onClick={onClickCreateWorkspace}>
              +
            </WorkspaceButton>
          </Workspaces>
          <MainContainer>
            <Nav>○ ○ ○</Nav>
            <h1>전적 /</h1>
            <h1>승률 /</h1>
            <h1>친구 목록 등</h1>
            <Channel />
          </MainContainer>
          <ProfileContainer>
            <Nav>○ ○ ○</Nav>
            <h1>Profile</h1>
            <img src={URL.createObjectURL(profile.photo)} alt="Profile" style={{ borderRadius: '60%', maxWidth: '200px', maxHeight: '200px' }} />
            <h2>{profile.name}</h2>
            <Channel />
          </ProfileContainer>
        </Div>
      </Container>
      {showCreateWorkspaceModal && (
        <Modal>
          <ModalContent>
            <ModalHeader>Create Workspace</ModalHeader>
            <ModalBody>
              <Label>Workspace Name</Label>
              <Input type='text' />
            </ModalBody>
            <ModalFooter>
              <Button>Create</Button>
              <Button onClick={() => setShowCreateWorkspaceModal(false)}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
      {showTwoFactorModal && (
        <Modal>
          <ModalContent>
            <ModalHeader>Two Factor Authentication</ModalHeader>
            <ModalBody>
              <Label>Enable two factor authentication:</Label>
              <Input
                type='checkbox'
                checked={twoFactorEnabled}
                onChange={toggleTwoFactor}
              />
            </ModalBody>
            <ModalFooter>
              <Button onClick={onCloseTwoFactorModal}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};
export default Home;
