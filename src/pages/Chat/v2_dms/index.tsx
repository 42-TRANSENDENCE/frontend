import { useCallback, useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { io } from 'socket.io-client';

const chat_backurl = 'http://127.0.0.1:3095';

async function getUser() {
  return fetch(chat_backurl + `/user/`).then((res) => res.json());
}
async function getDms(id: any) {
  const token = localStorage.getItem('jwt_token');
  const options = {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  };
  return fetch(chat_backurl + `/dms/${id}`, options).then((res) => res.json());
}
async function postDM(dmId: any, chat: any, user: any) {
  const token = localStorage.getItem('jwt_token');
  fetch(chat_backurl + `/dms/${dmId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      createdAt: new Date(),
      content: chat,
    }),
  }).then((res) => res.text());
}

export default function V2dms({ socket }: { socket: any }) {
  const params = useParams<{ dmId?: string }>();
  const { dmId } = params;
  const [chat, setChat] = useState('');

  // const { data: user, isLoading: isLoadingUser } = useQuery<any>(
  //   ["user"],
  //   getUser
  // );
  const token = localStorage.getItem('jwt_token');
  const options = {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  };
  const { data: user, isLoading: isLoadingUser } = useQuery<any>(['user'], () =>
    fetch(chat_backurl + '/user', options).then((res) => res.json())
  );
  const { data: dms, isLoading: isLoadingDms } = useQuery<any>(
    ['dms', dmId],
    () => getDms(dmId)
  );
  const queryClient = useQueryClient();

  const { mutate: mutateDM } = useMutation<unknown, unknown, any, unknown>(
    ({ dmId, chat, user }) => postDM(dmId, chat, user),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['dms', dmId]);
      },
    }
  );

  const onChangeChat = (e: any) => {
    setChat(e.target.value);
  };

  const onSubmitForm = (e: any) => {
    e.preventDefault();
    mutateDM({ dmId, chat, user });
    setChat('');
  };

  const onDM = useCallback(
    (data: any) => {
      console.log('데이터: ', data);
      queryClient.setQueryData(['dms', dmId], (dmData: any) => {
        return [...dmData, data];
      });
    },
    [queryClient, dmId]
  );

  useEffect(() => {
    console.log('DM 이벤트 등록');
    socket?.on('dm', onDM);
    return () => {
      console.log('DM 이벤트 해제');
      socket?.off('dm', onDM);
    };
  }, [dmId, onDM]);

  if (isLoadingUser || isLoadingDms) return <div>로딩중</div>;
  return (
    <>
      <div>{user.sessionID}</div>
      {dms.map((dm: any) => {
        console.log(dm);
        return (
          <div style={{ marginTop: '2rem' }}>
            <div>
              {dm.createdAt} From <span>{dm.SenderID}</span> to{' '}
              <span>{dm.ReceiverID}</span>
            </div>
            <div>{dm.content}</div>
          </div>
        );
      })}
      <form onSubmit={onSubmitForm}>
        <input placeholder="" value={chat} onChange={onChangeChat} />
        <button
          type="submit"
          style={{ display: 'block', width: '100px', height: '100px' }}
        >
          전송
        </button>
      </form>
      <Link to={'/chat'}>홈으로</Link>
    </>
  );
}
