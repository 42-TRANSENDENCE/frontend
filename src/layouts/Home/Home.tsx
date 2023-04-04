import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '../../hooks/user';
import { useUserInfo, useUserAvatar, useUserSearch } from '../../hooks/query/user';
import { useReceivedFriendList, usePendingFriendList } from '../../hooks/query/friend';
import { useApproveFriend, useDeleteRequestFriend, useRefuseFriend } from '../../hooks/mutation/friend';
import { UserInfo } from '../../hooks/query/user';
import Modal from '../../components/Modal';
import { Container } from './styles';
import { BigButton, MiddleButton } from '../../components/Button';
import Title from '../../components/Title';
import OnlineList from '../../components/OnlineList';
import Profile, { ProfileEnum, ProfileProps } from '../../components/Profile';
import gameButton from '../../assets/bigButton/gameButton.svg';
import chatButton from '../../assets/bigButton/chatButton.svg';
import settingButton from '../../assets/middleButton/settingButton.svg';
import logoutButton from '../../assets/middleButton/logoutButton.svg';
import SettingModal from './Modal/HomeModal';

const Home = () => {
  const [twoFactor, setTwoFactor] = useState(false);

  const navigate = useNavigate();
  const onClickLogOut = useLogout();
  const [showSettingModal, setShowSettingModal] = useState(false);
  const [userSearch, setUserSearch] = useState<string | null>(null);
  const [popProfile, setPopProfile] = useState(false);
  const [user, setUser] = useState<ProfileProps | null>(null);

  const userInfoData = useUserInfo().data;
  const userAvatar = useUserAvatar().data;
  const userFriendReceived = useReceivedFriendList().data;
  const friendReceivedList: UserInfo[] = userFriendReceived;
  const userFriendPending = usePendingFriendList().data;
  const friendPendingList: UserInfo[] = userFriendPending;
  const approveFriend = useApproveFriend();
  const refuseFriend = useRefuseFriend();
  const deleteRequestFriend = useDeleteRequestFriend();
  const userSearchTest = useUserSearch();
  
  useEffect(() => {
    if (userSearch) {
      userSearchTest.refetch({
        userSearch,
        userInfoData,
        setPopProfile,
        setUser
      });
    }
    setUserSearch(null);
  }, [userSearch]);

  const onCloseSettingModal = () => {
    setShowSettingModal(false);
  };

  const onOpenSettingModal = () => {
    setTwoFactor(userInfoData?.isTwoFactorAuthenticationEnabled ? true : false);
    setShowSettingModal(true);
  };

  const onClickGame = () => {
    navigate('/game');
  };

  const onClickChat = () => {
    navigate('/chat');
  };

  const onClickApproveFriend = useCallback(
    (id: number) => {
      approveFriend.mutate(id);
      setPopProfile(false);
    }, [friendReceivedList, approveFriend]
  );

  const onClickRefuseRequestFriend = useCallback(
    (id: number) => {
      refuseFriend.mutate(id);
      setPopProfile(false);
    }, [friendReceivedList, refuseFriend]
  );

  const onClickDeleteRequestFriend = useCallback(
    (id: number) => {
      deleteRequestFriend.mutate(id);
      setPopProfile(false);
    }, [friendPendingList, deleteRequestFriend]
  );

  return (
    <>
      <Container>
        <div className='Title'>
          <Title title='PONG HOME' home={true} search={true} setSearchUser={setUserSearch} />
        </div>

        <div className='BodyOuter'>
          <div className='Body'>
            <div className="LeftSide Section">
              <OnlineList />
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
                  profile={{
                    id: userInfoData?.id ? userInfoData.id : 0,
                    imageSrc: URL.createObjectURL(userAvatar ? userAvatar : new Blob()),
                    nickname: userInfoData?.nickname,
                    win: 15,
                    lose: 5,
                    who: ProfileEnum.ME,
                  }}
                  setPopProfile={setPopProfile}
                />
                {popProfile && user && (
                  <div className='pop-profile'>
                    <Profile
                      profile={user}
                      setPopProfile={setPopProfile}
                    />
                  </div>
                )}
              </div>
              <div className='Notification'>
                Notification
                {friendReceivedList?.map((userinfo: any) => {
                  return (
                    <div style={{ flexDirection: 'row' }}>
                      {userinfo.nickname}
                      <button onClick={() => onClickApproveFriend(userinfo.id)}>Approve</button>
                      <button onClick={() => onClickRefuseRequestFriend(userinfo.id)}>Refuse</button>
                    </div>
                  );
                })}
                {friendPendingList?.map((userinfo: any) => {
                  return (
                    <div style={{ flexDirection: 'row' }}>
                      {userinfo.nickname}
                      <button onClick={() => onClickDeleteRequestFriend(userinfo.id)}>Cancel</button>
                    </div>
                  )
                })}
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
        <SettingModal
          userAvatar={userAvatar}
          twoFactor={twoFactor}
          setTwoFactor={setTwoFactor}
          userInfoData={userInfoData}
          onClickLogOut={onClickLogOut}
        />
      </Modal>
    </>
  );
};

export default Home;
