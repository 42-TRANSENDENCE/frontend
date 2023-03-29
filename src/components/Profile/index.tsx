import { ProfileContainer, Avatar } from './styles';
import { MiddleButton, SmallButton } from '../Button';
import friendAddButton from '../../assets/middleButton/friendAddButton.svg';
import friendBlockButton from '../../assets/middleButton/friendBlockButton.svg';
import friendDeleteButton from '../../assets/middleButton/friendDeleteButton.svg';
import friendUnblockButton from '../../assets/middleButton/friendUnblockButton.svg';
import closeButton from '../../assets/smallButton/modalCloseButton.svg';

export enum ProfileEnum {
  ME = 0,
  FRIEND,
  BANNED,
  OTHERS
};

export type ProfileProps = {
  imageSrc: string;
  nickname: string | undefined;
  win: number;
  lose: number;
  who: ProfileEnum;
  // me, friend, ban, unknown
};

function Profile({ imageSrc, nickname, win, lose, who }: ProfileProps) {
  let color = "black";
  if (who === ProfileEnum.FRIEND) {
    color = "var(--color-green)";
  } else if (who === ProfileEnum.BANNED) {
    color = "var(--color-red)";
  } else if (who === ProfileEnum.OTHERS) {
    color = "var(--color-gray)"
  }
  
  return (
    <ProfileContainer color={color}>
      <div className="AvatarBox">
        {who !== ProfileEnum.ME && (<SmallButton img_url={closeButton} />)}
        <Avatar src={imageSrc} alt="Profile Image" />
      </div>
      <div className="InfoBox">

        <div className="Text">
          <h1 style={{ margin: '10px 0' }}>{nickname}</h1>
          <h3>
            Win: {win}
          </h3>
          <h3>
            Lose: {lose}
          </h3>
        </div>

        {who === ProfileEnum.BANNED && (
          <div className='Buttons'>
            <MiddleButton img_url={friendUnblockButton} />
          </div>
        )}
        {who === ProfileEnum.FRIEND && (
          <div className='Buttons'>
            <MiddleButton img_url={friendBlockButton} />
            <MiddleButton img_url={friendDeleteButton} />
          </div>
        )}
        {who === ProfileEnum.OTHERS && (
          <div className='Buttons'>
            <MiddleButton img_url={friendBlockButton} />
            <MiddleButton img_url={friendAddButton} />
          </div>
        )}
      </div>
    </ProfileContainer>
  );
}

export default Profile;
