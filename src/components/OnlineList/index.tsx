import { Scrollbars } from 'react-custom-scrollbars';
import { UserStatus } from './styles';
import { useGetFriendList } from '../../hooks/query/friend';

interface User {
  id: number;
  nickname: string;
  status: "ONLINE" | "OFFLINE";
  isTwoFactorAuthenticationEnabled: boolean;
}

const onlineList = function () {
  const response = useGetFriendList().data;
  const friendList: User[] = response;

  return (
    <div
      style={{
        borderRadius: '2rem',
        border: '0.3rem solid black',
        height: '100%',
        width: '90%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* onlineList */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          fontSize: '2rem',
          overflow: 'auto',
        }}
      >
        <div style={{ fontSize: '3rem', paddingLeft: '1rem' }}>online</div>
        <Scrollbars autoHide style={{}} onScrollFrame={() => { }}>
          {friendList?.map((userinfo: any) => {
            if (userinfo?.status === 'OFFLINE') return;
            return (
              <div>
                <UserStatus status={userinfo.status} />
                {userinfo.nickname + '     ' + userinfo.status}
              </div>
            );
          })}
        </Scrollbars>
      </div>
      {/* offlineList */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          fontSize: '2rem',
          overflow: 'auto',
        }}
      >
        <div style={{ fontSize: '3rem', paddingLeft: '1rem' }}>offline</div>
        <Scrollbars autoHide style={{}} onScrollFrame={() => { }}>
          {friendList?.map((userinfo: any) => {
            if (userinfo?.status !== 'OFFLINE') return;
            return (
              <div>
                <UserStatus status={userinfo.status} />
                {userinfo.nickname + '    ' + userinfo.status}
              </div>
            );
          })}
        </Scrollbars>
      </div>
    </div>
  );
};

export default onlineList;
