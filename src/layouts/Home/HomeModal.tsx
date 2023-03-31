import React, {useState, useCallback} from 'react'
import Modal from '../../components/Modal';
import { MiddleButton } from '../../components/Button';
import { Avatar, InputName, Label } from './styles'
import { Switch as MuiTogleSwitch } from '@mui/material';
import logoutButton from '../../assets/middleButton/logoutButton.svg';

import { isValidNickname } from '../../hooks/user';
import { useInput } from '../../hooks/useInput';
import { useChangeNickname } from '../../hooks/mutation/user';
import { useUploadAvatar } from '../../hooks/mutation/user';
import { useUserDelete} from '../../hooks/user';
import { useFetcher } from '../../hooks/fetcher';
import { useQueryClient } from 'react-query';


import avatarSubmitButton from '../../assets/middleButton/AvatarSubmitButton.svg';
import avatarUploadButton from '../../assets/middleButton/AvatarUploadButton.svg';
import nicknameSubmitButton from '../../assets/middleButton/nicknameSubmitButton.svg';
import userDeleteButton from '../../assets/middleButton/userDeleteButton.svg';

type ImageFileType = File | null;

const SettingModal = (props : any) : JSX.Element=> {
  const {userAvatar,twoFactor,setTwoFactor,userInfoData,onClickLogOut} = props;

  const [qrCodeImage, setQrCodeImage] = useState<string | null>(null);
  const [file, setFile] = useState<ImageFileType>(null);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const newNickname = useInput('', isValidNickname);
  const changeNickname = useChangeNickname();
  const { mutate, isLoading } = useUploadAvatar();
  const onClickUserDelete = useUserDelete();
  const fetcher = useFetcher();
  const queryClient = useQueryClient();
   
  const onNicknameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      newNickname.onChange(e);
      setIsSubmitDisabled(e.target.value.length < 3);
    },[newNickname]
  );

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      changeNickname.mutate(newNickname.value);
    }, [newNickname, changeNickname]
  );

  const onClickChangeProfileImage = useCallback(
    () => {
      mutate(file);
    }, [file, mutate]
  );

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files && files[0]) {
        setFile(files[0]);
      }
    }, []
  );


  const toggleTwoFactor = () => {
    const api = userInfoData?.isTwoFactorAuthenticationEnabled ? '/2fa/turn-off' : '/2fa/turn-on';
    setTwoFactor(userInfoData?.isTwoFactorAuthenticationEnabled ? false : true);
    setQrCodeImage(null);

    fetcher(api, {
      method: 'POST',
      credentials: 'include',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        if (response.status === 200 && api === '/2fa/turn-on') {
          return fetcher('/2fa/generate', {
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
        queryClient.invalidateQueries({ queryKey: ['userInfo'] });
      });
  };

  return (
    <>
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
          <form onSubmit={onSubmit}>
            <Label id='nickname-label'>
              <InputName
                placeholder='new nickname'
                {...newNickname}
                onChange={onNicknameChange}
              />
            </Label>
            <MiddleButton img_url={nicknameSubmitButton} type='submit' disabled={isSubmitDisabled} />
          </form>
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
              <MuiTogleSwitch checked={twoFactor} onChange={toggleTwoFactor} />
            </Label>
            {qrCodeImage && (
              <TwoFactorModal qrCodeImage={qrCodeImage} onClickLogOut={onClickLogOut}/>
            )}
          </div>
        </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              overflow: 'hidden',
              margin: '1rem 0',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MiddleButton img_url={userDeleteButton} onClick={onClickUserDelete} />
          </div>
    </>
  )
}

const TwoFactorModal = ( props : any ) : JSX.Element => {
  const {qrCodeImage, onClickLogOut} = props;
  
  return (
    <Modal show={qrCodeImage} onCloseModal={onClickLogOut}>
      <img src={qrCodeImage} />
      <div>로그아웃 후 2FA 인증 후 다시 로그인하세요.</div>
      <MiddleButton img_url={logoutButton} onClick={onClickLogOut} />
    </Modal>
  )
}

export default SettingModal