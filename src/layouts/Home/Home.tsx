import React, { useCallback, useState } from 'react';
import loadable from '@loadable/component';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from "react-query";
import { useUserInfo, useUserAvatar } from '../../hooks/query/user';
import { useUploadAvatar } from '../../hooks/mutation/user';
import Modal from '../../components/Modal';
import { Container, Label, Input, InputName, Avatar } from './styles';
import { BigButton, MiddleButton } from '../../components/Button';
import Title from '../../components/Title';
import OnlineList from '../../components/OnlineList';
import Profile, { ProfileEnum } from '../../components/Profile';
import gameButton from '../../assets/bigButton/gameButton.svg';
import chatButton from '../../assets/bigButton/chatButton.svg';
import settingButton from '../../assets/middleButton/settingButton.svg';
import logoutButton from '../../assets/middleButton/logoutButton.svg';
import avatarSubmitButton from '../../assets/middleButton/AvatarSubmitButton.svg';
import avatarUploadButton from '../../assets/middleButton/AvatarUploadButton.svg';
import nicknameSubmitButton from '../../assets/middleButton/nicknameSubmitButton.svg';
import {Switch} from '@mui/material';

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
    <>
      <Container>
      <div className='Title'>
        <Title title='PONG HOME' home={true} search={true}/>
      </div>

      <div className='BodyOuter'>
          <div className='Body'>
            <div className="LeftSide Section">
              <OnlineList Flex={1.8}/>
            </div>

            <div className="MiddleSide Section">
              <div className="BigButtons">
                <BigButton img_url={chatButton} onClick={onClickChat} />
                <BigButton img_url={gameButton} onClick={onClickGame} />
              </div>
              <div className="MidiumButtons">
                <MiddleButton img_url={settingButton} onClick={onOpenSettingModal} />
                <MiddleButton img_url={logoutButton} onClick={onClickLogOut} />
              </div>
            </div>

            <div className="RightSide Section">
              <div className="Profile">
                <Profile
                  imageSrc={URL.createObjectURL(userAvatar ? userAvatar : new Blob())}
                  nickname={userInfoData?.nickname}
                  win={15}
                  lose={5}
                  who={ProfileEnum.ME}
                />
              </div>
              <div className='Notification'>
                Notification
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Modal
        show={showSettingModal}
        onCloseModal={onCloseSettingModal}
        showCloseButton
      >
        <div
          style={{
            background: 'white',
            border: '0.3rem solid black',
            borderRadius: '1rem',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              background: 'pink',
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'space-evenly',
              padding: '1rem'
            }}
          >
            <Avatar src={URL.createObjectURL(file ? file : userAvatar ? userAvatar : new Blob())} />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-evenly',
              }}
            >
              <label htmlFor='file-upload' className='custom-file-upload'>
                <img src={avatarUploadButton} alt='Image' />
              </label>
              <input id='file-upload' type='file' onChange={handleFileChange} />
              <MiddleButton img_url={avatarSubmitButton} onClick={onClickChangeProfileImage} />
              {isLoading && <p>Uploading avatar...</p>}
            </div>
        </div>
        
        </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-evenly',
              padding: '1rem',
            }}
          >
            <Label id='nickname-label'>
              <InputName
                placeholder='nickname'
                // {...nickname}
                // onChange={onNicknameChange}
              />
              <MiddleButton img_url={nicknameSubmitButton} />
            </Label>
            <div
              style={{
                background: 'white',
                border: '0.3rem solid black',
                borderRadius: '1rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                overflow: 'hidden',
                margin: '1rem 0'
              }}
            >
              <Label>Enable two factor authentication
                <Switch checked={twoFactor} onChange={toggleTwoFactor} />
              </Label>
              {qrCodeImage && (
                <Modal
                  show={qrCodeImage}
                  onCloseModal={onClickLogOut}
                >
                  <img src={qrCodeImage} />
                  <div>로그아웃 후 2FA 인증 후 다시 로그인하세요.</div>
                  <MiddleButton img_url={logoutButton} onClick={onClickLogOut} />
              </Modal>
              )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Home;
