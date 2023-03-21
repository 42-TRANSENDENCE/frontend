import React from 'react';
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

type ProfileProps = {
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


// import React from 'react';
// import { ProfileContainer, Avatar } from './styles';
// import friendAddButton from '../../assets/middleButton/friendAddButton.svg';
// import friendBlockButton from '../../assets/middleButton/friendBlockButton.svg';
// import friendDeleteButton from '../../assets/middleButton/friendDeleteButton.svg';
// import friendUnblockButton from '../../assets/middleButton/friendUnblockButton.svg';
// import closeButton from '../../assets/smallButton/modalCloseButton.svg';

// export enum ProfileEnum {
//   ME = 0,
//   FRIEND,
//   BANNED,
//   OTHERS
// };

// type ProfileProps = {
//   imageSrc: string;
//   nickname: string | undefined;
//   win: number;
//   lose: number;
//   who: ProfileEnum;
//   // me, friend, ban, unknown
// };

// function Profile({ imageSrc, nickname, win, lose, who }: ProfileProps) {
//   let color = "black";
//   if (who === ProfileEnum.FRIEND) {
//     color = "var(--color-green)";
//   } else if (who === ProfileEnum.BANNED) {
//     color = "var(--color-red)";
//   } else if (who === ProfileEnum.OTHERS) {
//     color = "var(--color-gray)"
//   }

//   let closeButtonImg = <img src={closeButton} alt="Close" style={{ position: 'absolute', top: '0', right: '0', margin: '0.5rem' }} />;
//   let leftButtonImg = <img src={friendBlockButton} alt="Block" style={{ position: 'absolute', bottom: '0', left: '0', margin: '0.5rem' }} />;
//   let rightButtonImg = null;

//   if (who === ProfileEnum.FRIEND) {
//     rightButtonImg = <img src={friendDeleteButton} alt="Delete" style={{ position: 'absolute', bottom: '0', right: '0', margin: '0.5rem' }} />;
//   } else if (who === ProfileEnum.BANNED) {
//     rightButtonImg = <img src={friendUnblockButton} alt="Unblock" style={{ position: 'absolute', bottom: '50%', left: '50%', transform: 'translate(-50%, 50%)', margin: '0.5rem' }} />;
//   } else if (who === ProfileEnum.OTHERS) {
//     rightButtonImg = <img src={friendAddButton} alt="Add" style={{ position: 'absolute', bottom: '0', right: '0', margin: '0.5rem' }} />;
//   }
  
//   return (
//     <ProfileContainer color={color}>
//       {closeButtonImg}
//       <div className="AvatarBox">
//         <Avatar src={imageSrc} alt="Profile Image" />
//       </div>
//       <div className="InfoBox">
//         <h1 style={{ margin: '10px 0' }}>{nickname}</h1>
//         <h3>
//           Win: {win}
//         </h3>
//         <h3>
//           Lose: {lose}
//         </h3>
//       </div>
//       {leftButtonImg}
//       {rightButtonImg}
//     </ProfileContainer>
//   );
// }

// export default Profile;
