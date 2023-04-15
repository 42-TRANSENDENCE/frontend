import { ProfileContainer, Avatar } from './styles';
import { MiddleButton, SmallButton } from '../Button';
import friendAddButton from '../../assets/middleButton/friendAddButton.svg';
import friendDeleteButton from '../../assets/middleButton/friendDeleteButton.svg';
import closeButton from '../../assets/smallButton/modalCloseButton.svg';
import { useAddFriend, useDeleteFriend } from '../../hooks/mutation/friend';
import FIRST_LOGIN from '../../assets/achievements/firstLogin.svg';
import FIRST_FRIENDSHIP from '../../assets/achievements/firstFriend.svg';
import FIRST_GAME from '../../assets/achievements/firstGame.svg';
import WIN_TEN_GAMES from '../../assets/achievements/10Wins.svg';
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
  achievements: [];
};

function Profile({ profile, setPopProfile }: { profile: ProfileProps, setPopProfile: React.Dispatch<React.SetStateAction<boolean>> }) {
  const achievementImages: { [key: string]: string } = {
    FIRST_LOGIN,
    FIRST_FRIENDSHIP,
    FIRST_GAME,
    WIN_TEN_GAMES
  };

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
      setPopProfile(false);
    }, [profile.id, addFriend]
  )

  const onClickDeleteFriend = useCallback(
    () => {
      deleteFriend.mutate(profile.id);
      setPopProfile(false);
    }, [profile.id, deleteFriend]
  )

  const onClickClose = () => {
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
          <h3 style={{ color: '#335EFF' }}>
            Win: {profile.win}
          </h3>
          <h3 style={{ color: '#FF3393' }}>
            Lose: {profile.lose}
          </h3>
        </div>

        <div className="Achievement">
          {profile.who === ProfileEnum.ME && profile.achievements?.map((achievement: string, index: number) => {
            if (achievementImages[achievement])
              return <img className='Achievements' src={achievementImages[achievement]} key={index}/>;
          })}
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
