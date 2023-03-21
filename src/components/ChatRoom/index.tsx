import { useCallback, useEffect, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import createRoomButtonUrl from '../../assets/smallButton/newChatRoomButton.svg';
import CreateRoomModal from '../Modal';

// const roomsInfo = [
//   { roomName: 'roomName1', owner: 'owner', status: 0 },
//   { roomName: 'roomName2', owner: 'owner', status: 0 },
//   { roomName: 'roomName3', owner: 'owner', status: 1 },
//   { roomName: 'roomName4', owner: 'owner', status: 0 },
//   { roomName: 'roomName5', owner: 'owner', status: 0 },
//   { roomName: 'roomName6', owner: 'owner', status: 1 },
//   { roomName: 'roomName7', owner: 'owner', status: 1 },
//   { roomName: 'roomName8', owner: 'owner', status: 0 },
//   { roomName: 'roomName9', owner: 'owner', status: 1 },
//   { roomName: 'roomName10', owner: 'owner', status: 0 },
//   { roomName: 'roomName11', owner: 'owner', status: 0 },
//   { roomName: 'roomName12', owner: 'owner', status: 0 },
//   { roomName: 'roomName13', owner: 'owner', status: 0 },
//   { roomName: 'roomName14', owner: 'owner', status: 0 },
// ];

const chat_backurl = 'http://127.0.0.1:3095';

async function postCreateRoom(
  title: string,
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

const ChatRoom = ({ socket }: { socket: any }) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [findRoomName, setFindRoomName] = useState('');
  const [filteredRooms, setFilteredRooms] = useState([]);
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

  useEffect(() => {
    if (rooms && findRoomName === '') {
      setFilteredRooms(rooms);
    }
  }, [rooms]);

  // if (user) console.log(user);
  console.log('rooms데이터: ', rooms);

  const onCloseCreateRoomModal = useCallback(() => {
    setShowCreateRoomModal(
      (prevShowCreateRoomModal) => !prevShowCreateRoomModal
    );
    setPassword('');
    setTitle('');
  }, []);

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

  const { mutate: mutateRoom } = useMutation<unknown, unknown, any, unknown>(
    ({ title, password, owner }) => postCreateRoom(title, password, owner),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['roomlist']);
      },
    }
  );

  const onCreateRoom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutateRoom({ title, password, owner: user.username });
    onCloseCreateRoomModal();
  };

  const onSubmitRoomName = useCallback(
    (e) => {
      e.preventDefault();
      if (findRoomName.trim() === '') {
        setFilteredRooms(rooms);
        setFindRoomName('');
        return;
      }
      const newFilteredRooms = rooms.filter((v) => {
        return v.title === findRoomName.trimLeft();
      });
      setFilteredRooms(newFilteredRooms);
      setFindRoomName('');
    },
    [findRoomName]
  );

  const onChangeInput = (e) => {
    e.preventDefault();
    setFindRoomName(e.target.value);
    const newFilteredRooms = rooms.filter((v) => {
      return v.title.includes(e.target.value.trimLeft());
    });
    setFilteredRooms(newFilteredRooms);
  };

  const onEnterEvent = useCallback(
    (e: any) => {
      fetch(chat_backurl + `/room/${e.target.dataset.id}`)
        .then((res) => res.json())
        .then((data) => {
          /* 기존 참여자 */
          console.log('방 입장 데이터: ', data);
          console.log('error체크1 user:', user);
          const is_member = data.memberList.find(
            (memberName: any) => memberName === user.username
          );
          console.log('error체크2');
          if (is_member) {
            console.log('기존 참여자 입장');
            navigate(`v3_rooms/${e.target.dataset.id}/chat`);
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
                navigate(`v3_rooms/${e.target.dataset.id}/chat`);
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
                console.log('비공개방 최초입장');
                navigate(`v3_rooms/${e.target.dataset.id}/chat`);
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

  if (isLoading || isLoadingUser) return <div>isLoading...</div>;

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '2rem',
        border: '0.3rem solid black',
        padding: '1rem',
        background: 'white',
      }}
    >
      <form
        style={{
          flex: 1,
          width: '100%',
          display: 'flex',
          marginBottom: '1rem',
        }}
        onSubmit={onSubmitRoomName}
      >
        <input
          style={{
            flex: 9,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '2rem',
            border: '0.3rem solid black',
            padding: '1rem',
          }}
          onChange={onChangeInput}
          value={findRoomName}
        ></input>
        <div
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img
            src="../src/assets/Search.svg"
            style={{ width: '3rem', marginRight: '1rem', cursor: 'pointer' }}
            onClick={onSubmitRoomName}
          />
        </div>
      </form>
      <div style={{ flex: 13 }}>
        <Scrollbars>
          {filteredRooms.map((roomInfo: any) => {
            return (
              <div
                style={{
                  width: '96%',
                  height: '10%',
                  borderRadius: '2rem',
                  border: '0.3rem solid black',
                  margin: '0.3rem 0',
                  padding: '0.1rem 7.9rem 3rem 1rem',
                  position: 'relative',
                }}
                data-id={roomInfo.id}
                data-password={roomInfo.status !== 0 ? 'true' : 'false'}
                key={roomInfo.id}
                onClick={onEnterEvent}
              >
                <div
                  style={{
                    position: 'absolute',
                    right: '1rem',
                    height: '100%',
                  }}
                >
                  {roomInfo.status === 0 ? (
                    <img
                      src="../../public/padlock_opened.png"
                      style={{ height: '30%' }}
                    />
                  ) : (
                    <img
                      src="../../public/padlock_locked.png"
                      style={{ height: '30%' }}
                    />
                  )}
                </div>
                <div>
                  {roomInfo.title.length > 20
                    ? roomInfo.title.slice(0, 20) + '...'
                    : roomInfo.title}
                </div>
                <div>{roomInfo.owner}</div>
              </div>
            );
          })}
        </Scrollbars>
      </div>
      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <button
          style={{
            padding: '0.5rem',
            borderRadius: '1rem',
            backgroundColor: '#4495F7',
            border: '0.3rem solid black',
          }}
          onClick={(e) => {
            e.preventDefault();
            setShowCreateRoomModal(
              (prevShowCreateRoomModal) => !prevShowCreateRoomModal
            );
          }}
        >
          <img
            src={createRoomButtonUrl}
            style={{
              width: '30px',
              height: '30px',
              maxWidth: '100%',
              maxHeight: '100%',
            }}
          />
        </button>
      </div>
      <CreateRoomModal
        show={showCreateRoomModal}
        onCloseModal={onCloseCreateRoomModal}
        showCloseButton
        showInfoButton
        tooltipText="비밀번호가 없는 방은 공개방입니다. 주의하도록 하세요"
      >
        <form onSubmit={onCreateRoom}>
          <div>
            <input
              type="text"
              name="title"
              placeholder="방 제목"
              value={title}
              onChange={onChangeTitle}
              style={{
                borderRadius: '2rem',
                border: '0.3rem solid black',
                backgroundColor: 'yellow',
                padding: '1rem',
                margin: '1rem',
              }}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="비밀번호(없으면 공개방)"
              value={password}
              onChange={onChangePassword}
              style={{
                borderRadius: '2rem',
                border: '0.3rem solid black',
                backgroundColor: 'yellow',
                padding: '1rem',
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              margin: '1rem',
              padding: '0.5rem',
              borderRadius: '1rem',
              backgroundColor: '#64E469',
              border: '0.3rem solid black',
              width: '4rem',
              height: '4rem',
            }}
          >
            <img
              src={createRoomButtonUrl}
              style={{
                width: '30px',
                height: '30px',
                maxWidth: '100%',
                maxHeight: '100%',
              }}
            />
          </button>
        </form>
      </CreateRoomModal>
    </div>
  );
};

export default ChatRoom;
