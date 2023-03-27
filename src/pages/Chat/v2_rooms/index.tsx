import { useCallback, useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import CreateRoomModal from '../../../components/Modal';
import {
  BrowserHeader,
  Button,
  Container,
  DotThree,
  InnerWindow,
  OuterWindow,
  RoomContainer,
  V2roomContainer,
} from './style';
import { Window } from '../../../components/Window/Window';
import React from 'react';

const chat_backurl = 'http://127.0.0.1:3095';

async function postCreateRoom(
  title: string,
  max: number,
  password: string,
  owner: string
): Promise<string> {
  return await fetch(`${chat_backurl}/rooms`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      password,
      owner,
    }),
  }).then((res) => res.text());
}

function V2rooms({ socket }: { socket: any }) {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);
  const [title, setTitle] = useState('');
  const [password, setPassword] = useState('');

  const queryClient = useQueryClient();

  const onChangeTitle = (e: any) => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  const onChangePassword = (e: any) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const token = localStorage.getItem('jwt_token');
  const options = {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  };

  const {
    data: rooms,
    isLoading,
    refetch,
  } = useQuery<any>(['roomlist'], () =>
    fetch(chat_backurl + `/rooms/`).then((res) => res.json())
  );
  const { data: user, isLoading: isLoadingUser } = useQuery<any>(['user'], () =>
    fetch(chat_backurl + '/user', options).then((res) => res.json())
  );
  // if (user) console.log(user);
  console.log('rooms데이터: ', rooms);

  const onNewRoom = useCallback(
    async (data: any) => {
      console.log('newRoom 데이터: ', data);
      queryClient.setQueryData(['roomlist'], () => {
        return [...rooms, data];
      });
    },
    [queryClient, rooms]
  );

  // const onRemoveRoom = useCallback((data: any) => refetch(), [refetch]);
  const onRemoveRoom = useCallback(
    async (data: any) => {
      // console.log("removeRoom 데이터: ", data);
      // console.log("rooms.data: ", rooms.data);
      const new_rooms = rooms.filter(
        (room: any) => Number(room.id) !== Number(data)
      );
      // console.log("rooms.data후: ", rooms.data);
      queryClient.setQueryData(['roomlist'], () => {
        return new_rooms;
      });
    },
    [queryClient, rooms]
  );

  useEffect(() => {
    console.log('v2_rooms에 진입하셨습니다.');
    socket?.on('newRoom', onNewRoom);
    socket?.on('removeRoom', onRemoveRoom);
    return () => {
      console.log('v2_rooms에서 나가셨습니다.');
      socket?.off('newRoom', onNewRoom);
      socket?.off('removeRoom', onRemoveRoom);
    };
  }, [onNewRoom, onRemoveRoom]);

  const onEnterEvent = useCallback(
    (e: any) => {
      fetch(chat_backurl + `/room/${e.target.dataset.id}`)
        .then((res) => res.json())
        .then((data) => {
          /* 기존 참여자 */
          console.log('방 입장 데이터: ', data);
          console.log('error1', user);
          const is_member = data.memberList.find(
            (memberName: any) => memberName === user.username
          );
          console.log('error2');
          if (is_member) {
            navigate(`${e.target.dataset.id}/chat`);
            return;
          }
          const is_kicked = data.kickList.find(
            (memberName: any) => memberName === user.username
          );
          if (is_kicked) {
            setErrorMessage('강퇴당한 유저입니다.');
            return;
          }
          /* 최초 입장 */
          if (data.status === 0) {
            console.log('공개방 최초 입장하십니다');
            const token = localStorage.getItem('jwt_token');
            fetch(chat_backurl + `/room/${e.target.dataset.id}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({}),
            }).then((res) => {
              console.log(res);
              if (res.status === 200) {
                navigate(`${e.target.dataset.id}/chat`);
              } else {
                setErrorMessage('방에 입장할 수 없습니다.');
              }
            });
            return;
          } else {
            /* 비공개방 */
            const password = prompt('비밀번호를 입력하세요');
            fetch(chat_backurl + `/room/${e.target.dataset.id}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ password }),
            }).then((res) => {
              if (res.status === 200) {
                navigate(`${e.target.dataset.id}/chat`);
                return 'OK';
              } else {
                setErrorMessage('비밀번호가 틀렸습니다.');
              }
            });
            return;
          }
        });
    },
    [user]
  );

  const onCloseModal = useCallback(() => {
    setShowCreateRoomModal(
      (prevShowCreateRoomModal) => !prevShowCreateRoomModal
    );
    setPassword('');
    setTitle('');
  }, []);

  const { mutate: mutateRoom } = useMutation<unknown, unknown, any, unknown>(
    ({ title, max, password, owner }) =>
      postCreateRoom(title, max, password, owner),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['roomlist']);
      },
    }
  );

  const onCreateRoom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutateRoom({ title, max: 0, password, owner: user.username });
    onCloseModal();
  };

  if (isLoading || isLoadingUser)
    return (
      <Window height="10%" max_width="30%">
        isLoading...
      </Window>
    );

  return (
    <V2roomContainer>
      <Window title="V2_Rooms" sidebarToggle={true}>
        <RoomContainer onClick={() => setErrorMessage('')}>
          {rooms?.map((room: any) => {
            return (
              <div data-id={room.id} key={room.id}>
                <span>
                  {room.title.length > 10
                    ? room.title.slice(0, 10) + '...'
                    : room.title}
                </span>
                <span className="openness">
                  <div style={{ height: '1rem' }}>
                    {room.status !== 0 ? (
                      <img
                        src="../../../public/padlock_locked.png"
                        style={{ height: '100%' }}
                      />
                    ) : (
                      <img
                        src="../../../public/padlock_opened.png"
                        style={{ height: '100%' }}
                      />
                    )}
                  </div>
                </span>
                <span className="owner">{room.owner}</span>
                <span>
                  <Button
                    data-password={room.status !== 0 ? 'true' : 'false'}
                    data-id={room.id}
                    onClick={onEnterEvent}
                  >
                    입장
                  </Button>
                </span>
              </div>
            );
          })}
        </RoomContainer>
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        <Button
          // style={{ display: "block", margin: "0 auto" }}
          onClick={onCloseModal}
        >
          방 만들기
        </Button>
        <CreateRoomModal show={showCreateRoomModal} onCloseModal={onCloseModal}>
          <form onSubmit={onCreateRoom}>
            <div>
              <input
                type="text"
                name="title"
                placeholder="방 제목"
                value={title}
                onChange={onChangeTitle}
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="비밀번호(없으면 공개방)"
                value={password}
                onChange={onChangePassword}
              />
            </div>
            <button type="submit" style={{ margin: '1rem' }}>
              생성
            </button>
          </form>
        </CreateRoomModal>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Link to="/">
            <span>홈으로</span>
          </Link>
          <Link to="/chat/createUsers">유저들 만들기</Link>
          <Link to="/chat/getUsers/1">1번 유저 쿠키획득</Link>
          <Link to="/chat/getUsers/3">3번 유저 쿠키획득</Link>
          <Link to="/chat/v2_dms/rock11">rock11 유저와 dm하기</Link>
          <Link to="/chat/v2_dms/rock33">rock33 유저와 dm하기</Link>
        </div>
      </Window>
    </V2roomContainer>
  );
}

export default V2rooms;
