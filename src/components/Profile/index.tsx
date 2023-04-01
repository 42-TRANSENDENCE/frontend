import { ProfileContainer, Avatar } from './styles';
import { MiddleButton, SmallButton } from '../Button';
import friendAddButton from '../../assets/middleButton/friendAddButton.svg';
import friendDeleteButton from '../../assets/middleButton/friendDeleteButton.svg';
import closeButton from '../../assets/smallButton/modalCloseButton.svg';
import { useAddFriend, useDeleteFriend } from '../../hooks/mutation/friend';
import { useCallback } from 'react';

export enum ProfileEnum {
  ME = 0,
  FRIEND,
  OTHERS
};

export type ProfileProps = {
  id: number;
  imageSrc: string;
  nickname: string | undefined;
  win: number;
  lose: number;
  who: ProfileEnum;
  // me, friend, ban, unknown
};

function Profile({ profile, setPopProfile }: { profile: ProfileProps, setPopProfile: any }) {
  let color = "black";
  if (profile.who === ProfileEnum.FRIEND) {
    color = "var(--color-green)";
  } else if (profile.who === ProfileEnum.OTHERS) {
    color = "var(--color-gray)"
  }

  const addFriend = useAddFriend();
  const deleteFriend = useDeleteFriend();

  const onClickAddFriend = useCallback(
    () => {
      addFriend.mutate(profile.id);
    }, [profile.id, addFriend]
  )

  const onClickDeleteFriend = useCallback(
    () => {
      deleteFriend.mutate(profile.id);
    }, [profile.id, deleteFriend]
  )

  const onClickClose = () => {
    if (setPopProfile !== null)
      setPopProfile(false);
  }

return (
  <ProfileContainer color={color}>
    <div className="AvatarBox">
      {profile.who !== ProfileEnum.ME && (<SmallButton img_url={closeButton} onClick={onClickClose} />)}
      <Avatar src={profile.imageSrc} alt="Profile Image" />
    </div>
    <div className="InfoBox">

      <div className="Text">
        <h1 style={{ margin: '10px 0' }}>{profile.nickname}</h1>
        <h3>
          Win: {profile.win}
        </h3>
        <h3>
          Lose: {profile.lose}
        </h3>
      </div>

      {profile.who === ProfileEnum.FRIEND && (
        <div className='Buttons'>
          <MiddleButton img_url={friendDeleteButton} onClick={onClickDeleteFriend} />
        </div>
      )}
      {profile.who === ProfileEnum.OTHERS && (
        <div className='Buttons'>
          <MiddleButton img_url={friendAddButton} onClick={onClickAddFriend} />
        </div>
      )}
    </div>
  </ProfileContainer>
);
}

export default Profile;
