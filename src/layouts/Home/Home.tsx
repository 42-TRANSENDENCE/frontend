import React, { useCallback, useState } from 'react';
import loadable from '@loadable/component';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from "react-query";
import { useUploadAvatar } from '../../hooks/useUploadAvatar';
// import {
//   Label,
//   Input,
//   InputName,
//   Workspaces,
//   WorkspaceButton,
//   Div,
//   Modal,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
// } from './styles';
import Modal from '../../components/Modal';
import { Container } from './styles';
import { BigButton, MiddleButton, SmallButton } from '../../components/Button';
import Title from '../../components/Title';
import OnlineList from '../../components/OnlineList';
import Profile, { ProfileEnum } from '../../components/Profile';
import gameButton from '../../assets/bigButton/gameButton.svg';
import chatButton from '../../assets/bigButton/chatButton.svg';
import settingButton from '../../assets/middleButton/settingButton.svg';
import logoutButton from '../../assets/middleButton/logoutButton.svg';

import home from '../../assets/home.svg';
import game from '../../assets/game.svg';
import chat from '../../assets/chat.svg';
import logout from '../../assets/logout.svg';
import setting from '../../assets/setting.svg';
import friends from '../../assets/friends.svg';

import { useUserInfo, useUserAvatar } from '../../Queries/user';

// const Channel = loadable(() => import('@pages/Channel'));
const Channel = loadable(() => import('../../pages/Channel/Channel'));

const Home = () => {
  const queryClient = useQueryClient();
  const [twoFactor, setTwoFactor] = useState(false);

  const awsUrl = import.meta.env.VITE_AWS_URL;
  const navigate = useNavigate();
  const [showSettingModal, setShowSettingModal] = useState(false);
  const [qrCodeImage, setQrCodeImage] = useState<string | null>(null);

  const userInfoData = useUserInfo().data;
  const userAvatar = useUserAvatar().data;

  type ImageFile = File | null;
  const [file, setFile] = React.useState<ImageFile>(null);
  const { mutate, isLoading } = useUploadAvatar();

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files && files[0]) {
        setFile(files[0]);
      }
    },
    []
  );

  const onClickChangeProfileImage = useCallback(() => {
    mutate(file);
  }, [file, mutate]);
  

  const toggleTwoFactor = () => {
    const api = userInfoData?.isTwoFactorAuthenticationEnabled ? '/2fa/turn-off' : '/2fa/turn-on';
    setTwoFactor(userInfoData?.isTwoFactorAuthenticationEnabled ? false : true);
    setQrCodeImage(null);
    fetch(awsUrl + api, {
      method: 'POST',
      credentials: 'include',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      if (response.status === 200 && api === '/2fa/turn-on') {
        return fetch(awsUrl + '/2fa/generate', {
          method: 'GET',
          credentials: 'include',
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          if (response.status === 200 && response.headers.get('Content-Type') === 'image/png') {
            return response.blob();
          } else {
            throw new Error('Invalid QR code image response');
          }
        })
        .then(blob => {
          const qrCodeImageUrl = URL.createObjectURL(blob);
          setQrCodeImage(qrCodeImageUrl);
        })
      }
    })
    .catch(error => {
      console.error('Failed to fetch QR code image:', error);
    })
    .finally(() => {
      queryClient.invalidateQueries({queryKey: ['userInfo']});
    });
  };

  const onCloseSettingModal = () => {
    setShowSettingModal(false);
  };

  const onOpenSettingModal = () => {
    setTwoFactor(userInfoData?.isTwoFactorAuthenticationEnabled ? true : false);
    setShowSettingModal(true);
  };

  const onClickHome = () => {
    // window.location.reload();
    navigate('/home');
  };

  const onClickLogOut = () => {
    fetch(awsUrl + '/auth/logout', {
      method: 'POST',
      credentials: 'include',
    }).then((response) => {
      if (response.status === 200) {
        window.location.href = `${awsUrl}:5173/`;
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

  return (
    <Container>
      <div className='Title'>
        <Title title='PONG HOME' home={true} search={true}/>
      </div>

      <div className='Body'>
        <div className="LeftSide">
          <OnlineList Flex={1.8}/>
        </div>

        <div className="MiddleSide">
          <BigButton img_url={chatButton} onClick={onClickChat} />
          <BigButton img_url={gameButton} onClick={onClickGame} />
          <div className="MidiumButtons">
            <MiddleButton img_url={settingButton} onClick={onOpenSettingModal} />
            <MiddleButton img_url={logoutButton} onClick={onClickLogOut} />
          </div>
        </div>

        <div className="RightSide">
          <Profile
            imageSrc={friends}
            nickname='keokim'
            win={15}
            lose={5}
            who={ProfileEnum.FRIEND}
          />
          <div className='Notification'>
            Notification
          </div>
        </div>
      </div>

    </Container>

    // <div>
    //   <GlobalStyles />
    //   <Container>
    //     <Nav>○ ○ ○</Nav>
    //     <Div>
    //       <Workspaces>
    //         <WorkspaceButton onClick={onClickHome}>
    //           <img src={home}></img>
    //         </WorkspaceButton>
    //         <WorkspaceButton onClick={onClickGame}>
    //           <img src={game}></img>
    //         </WorkspaceButton>
    //         <WorkspaceButton onClick={onClickChat}>
    //           <img src={chat}></img>
    //         </WorkspaceButton>
    //         <WorkspaceButton onClick={onOpenSettingModal}>
    //           <img src={setting}></img>
    //         </WorkspaceButton>
    //         <WorkspaceButton onClick={onClickFriends}>
    //           <img src={friends}></img>
    //         </WorkspaceButton>
    //         <WorkspaceButton onClick={onClickLogOut}>
    //           <img src={logout}></img>
    //         </WorkspaceButton>
    //       </Workspaces>
    //       <MainContainer>
    //         <Nav>○ ○ ○</Nav>
    //         <h1>{userInfoData ? `id : ${userInfoData.id}` : 'Not logged in'}</h1>
    //         <h1>{userInfoData ? userInfoData.nickname : 'Not logged in'}</h1>
    //         <h1>{userInfoData ? userInfoData.status : 'Not logged in'}</h1>
    //         <h1>{userInfoData ? (userInfoData.isTwoFactorAuthenticationEnabled ? '2FA true' : '2FA false') : 'Not logged in'}</h1>
    //         <Channel />
    //       </MainContainer>
    //       <ProfileContainer>
    //         <Nav>○ ○ ○</Nav>
    //         <h1>Profile</h1>
    //         <img src={URL.createObjectURL(userAvatar ? userAvatar : new Blob())} alt="Profile" style={{ borderRadius: '50%', maxWidth: '150px', maxHeight: '150px' }} />
    //         <h2>{userInfoData?.nickname}</h2>
    //       </ProfileContainer>
    //     </Div>
    //   </Container>
    //   {showSettingModal && (
    //     <Modal>
    //       <ModalContent>
    //         <Nav>○ ○ ○</Nav>
    //         <ModalHeader>Two Factor Authentication</ModalHeader>
    //         <ModalBody>
    //           <Label>Enable two factor authentication
    //           <Input
    //             type='checkbox'
    //             checked={twoFactor}
    //             onChange={toggleTwoFactor}
    //           />
    //           </Label>
    //           {qrCodeImage && (
    //             <Modal>
    //               <ModalContent>
    //                 <img src={qrCodeImage} />
    //                 <div>로그아웃 후 2FA 인증 후 다시 로그인하세요.</div>
    //                 <Button onClick={onClickLogOut}>LogOut</Button>
    //               </ModalContent>
    //             </Modal>
    //           )}
    //           <ModalHeader>Change Nickname</ModalHeader>
    //           <ModalBody>
    //             <Label id='nickname-label'>
    //               <InputName
    //                 placeholder='nickname'
    //                 // {...nickname}
    //                 // onChange={onNicknameChange}
    //               />
    //               <button>submit</button>
    //             </Label>
    //           </ModalBody>
    //           <ModalHeader>Change Profile Image</ModalHeader>
    //           <ModalBody>
    //             <input type="file" onChange={handleFileChange} />
    //             <button onClick={onClickChangeProfileImage}>Upload</button>
    //             {isLoading && <p>Uploading avatar...</p>}
    //           </ModalBody>
    //         </ModalBody>
    //         <ModalFooter>
    //           <Button onClick={onCloseSettingModal}>Close</Button>
    //         </ModalFooter>
    //       </ModalContent>
    //     </Modal>
    //   )}
    // </div>
  );
};
export default Home;
