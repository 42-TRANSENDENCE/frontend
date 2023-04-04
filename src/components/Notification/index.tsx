import { useCallback } from 'react';
import { Scrollbars } from "react-custom-scrollbars";
import { useReceivedFriendList, usePendingFriendList } from '../../hooks/query/friend';
import { useApproveFriend, useDeleteRequestFriend, useRefuseFriend } from '../../hooks/mutation/friend';
import { UserInfo } from '../../hooks/query/user';
import { NotificationContainer } from './styles';
import Button from '@mui/material/Button';

function Notification() {
  const userFriendReceived = useReceivedFriendList().data;
  const friendReceivedList: UserInfo[] = userFriendReceived;
  const userFriendPending = usePendingFriendList().data;
  const friendPendingList: UserInfo[] = userFriendPending;
  const approveFriend = useApproveFriend();
  const refuseFriend = useRefuseFriend();
  const deleteRequestFriend = useDeleteRequestFriend();

  const onClickApproveFriend = useCallback(
    (id: number) => {
      approveFriend.mutate(id);
    }, [friendReceivedList, approveFriend]
  );

  const onClickRefuseRequestFriend = useCallback(
    (id: number) => {
      refuseFriend.mutate(id);
    }, [friendReceivedList, refuseFriend]
  );

  const onClickDeleteRequestFriend = useCallback(
    (id: number) => {
      deleteRequestFriend.mutate(id);
    }, [friendPendingList, deleteRequestFriend]
  );
  return (
    <NotificationContainer>
      <Scrollbars autoHide style={{}} onScrollFrame={() => { }}>
        <h1>NOTIFICATION</h1>
        {friendReceivedList?.map((userinfo: any) => {
          return (
            <>
              <h3>Friend Received</h3>
              <div className='Notification'>
                <span>{userinfo.nickname}</span>
                <Button variant="contained" color="success" onClick={() => onClickApproveFriend(userinfo.id)}>
                  Approve
                </Button>
                <Button variant="contained" color="error" onClick={() => onClickRefuseRequestFriend(userinfo.id)}>
                  Refuse
                </Button>
              </div>
            </>
          );
        })}
        {friendPendingList?.map((userinfo: any) => {
          return (
            <>
              <h3>Friend Pending</h3>
              <div className='Notification'>
                <span>{userinfo.nickname}</span>
                <Button variant="contained" color="error" onClick={() => onClickDeleteRequestFriend(userinfo.id)}>
                  Cancel
                </Button>
              </div>
            </>
          )
        })}
      </Scrollbars>
    </NotificationContainer >
  )
}

export default Notification;
