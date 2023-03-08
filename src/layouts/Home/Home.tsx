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
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter
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
    navigate('/chat');
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
            <WorkspaceButton onClick={onOpenTwoFactorModal}>
              <img src={setting}></img>
            </WorkspaceButton>
            <WorkspaceButton onClick={onClickLogOut}>
              <img src={logout}></img>
            </WorkspaceButton>
            <WorkspaceButton onClick={onClickCreateWorkspace}>+</WorkspaceButton>
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
      {showCreateWorkspaceModal && (
        <Modal>
          <ModalContent>
            <ModalHeader>Create Workspace</ModalHeader>
            <ModalBody>
              <Label>Workspace Name</Label>
              <Input type="text" />
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
              <Input type="checkbox" checked={twoFactorEnabled} onChange={toggleTwoFactor} />
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


// import React, { useCallback, useEffect, useState } from 'react';
// import loadable from '@loadable/component';
// import { useNavigate, Link } from 'react-router-dom';
// import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
// import { Container, MainContainer, ProfileContainer, Button, Nav, Label, Input, Workspaces,
//  WorkspaceButton, Div, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from './styles';
// import GlobalStyles from '../../styles/global';

// const Channel = loadable(() => import('../../pages/Channel/Channel'));

// const Home = () => {
//   const awsUrl = import.meta.env.VITE_AWS_URL;
//   const navigate = useNavigate();
//   const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] =
//     useState(false);
//   const [showTwoFactorModal, setShowTwoFactorModal] = useState(false);
//   const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

//   const onClickCreateWorkspace = useCallback(() => {
//     setShowCreateWorkspaceModal(true);
//   }, []);

//   const toggleTwoFactor = useCallback(() => {
//     setTwoFactorEnabled(!twoFactorEnabled);
//   }, [twoFactorEnabled]);

//   const onCloseTwoFactorModal = useCallback(() => {
//     setShowTwoFactorModal(false);
//   }, []);

//   const onOpenTwoFactorModal = useCallback(() => {
//     setShowTwoFactorModal(true);
//   }, []);

//   return (
//     <div>
//       <GlobalStyles />
//       <Container bg='#00E5FF'>
//         <Nav>○ ○ ○</Nav>
//         <Div>
//           <Workspaces>
//             <WorkspaceButton onClick={onClickCreateWorkspace}>
//               +
//             </WorkspaceButton>
//             <WorkspaceButton onClick={onOpenTwoFactorModal}>
//               Two Factor Auth
//             </WorkspaceButton>
//           </Workspaces>
//           <MainContainer bg='#00E5FF'>
//             <Nav>○ ○ ○</Nav>
//           </MainContainer>
//           <ProfileContainer bg='#00E5FF'>
//             <Nav>○ ○ ○</Nav>
//           </ProfileContainer>
//         </Div>
//       </Container>
//       {showCreateWorkspaceModal && (
//         <Modal>
//           <ModalContent>
//             <ModalHeader>Create Workspace</ModalHeader>
//             <ModalBody>
//               <Label>Workspace Name</Label>
//               <Input type="text" />
//             </ModalBody>
//             <ModalFooter>
//               <Button>Create</Button>
//               <Button onClick={() => setShowCreateWorkspaceModal(false)}>
//                 Cancel
//               </Button>
//             </ModalFooter>
//           </ModalContent>
//         </Modal>
//       )}
//       {showTwoFactorModal && (
//         <Modal>
//           <ModalContent>
//             <ModalHeader>Two Factor Authentication</ModalHeader>
//             <ModalBody>
//               <Label>Enable two factor authentication:</Label>
//               <Input type="checkbox" checked={twoFactorEnabled} onChange={toggleTwoFactor} />
//             </ModalBody>
//             <ModalFooter>
//               <Button onClick={onCloseTwoFactorModal}>Close</Button>
//             </ModalFooter>
//           </ModalContent>
//         </Modal>
//       )}
//     </div>
//   );
// };
// export default Home;
