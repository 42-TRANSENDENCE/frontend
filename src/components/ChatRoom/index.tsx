import { useCallback, useEffect, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import createRoomButtonUrl from '../../assets/smallButton/newChatRoomButton.svg';
import CreateRoomModal from '../Modal';
import searchButtonUrl from '../../assets/Search.svg';
import { ChatRoomContainer, CreateRoom, RoomList, SearchRoom } from './styles';
import { useUserInfo } from '../../hooks/query/user';
import { Socket } from "socket.io-client";
import {useFetcher} from '../../hooks/fetcher';
import { useJoinChatRoom } from '../../hooks/mutation/chat';

// const chat_backurl = 'http://127.0.0.1:3095';
const server_public_ip = import.meta.env.VITE_AWS_URL;
const server_port = import.meta.env.VITE_AWS_PORT;

async function postCreateRoom(
  title: string,
  password: string,
  owner: string
): Promise<string> {
  return await fetch(`http://${server_public_ip}:${server_port}/channels`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      password,
      owner,
    }),
  }).then();
}
const ChatRoom = ({ socket }: { socket: any }) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [findRoomName, setFindRoomName] = useState('');
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);
  const [title, setTitle] = useState('');
  const [password, setPassword] = useState('');
  const joinChatRoom = useJoinChatRoom();
  // const fetcher = useFetcher();

  const queryClient = useQueryClient();

  const onChangeTitle = useCallback((e: any) => {
    e.preventDefault();
    setTitle(e.target.value);
  }, []);

  const onChangePassword = useCallback((e: any) => {
    e.preventDefault();
    setPassword(e.target.value);
  }, []);

  const token = localStorage.getItem('jwt_token');
  const options = {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  };

  const { data: roomDatas, isLoading: isLoadingRooms } = useQuery<any>(
    ['roomlist'],
    () =>
      fetch(`http://${server_public_ip}:${server_port}/channels/`, {
        method: 'GET',
        credentials: 'include',
      }).then((res) =>
        res.json()
      )
  );
  const { data: userData, isLoading: isLoadingUser } = useUserInfo();

  useEffect(() => {
    if (roomDatas && findRoomName === '') {
      setFilteredRooms(roomDatas);
    }
  }, [roomDatas]);

  const onCloseCreateRoomModal = useCallback(() => {
    setShowCreateRoomModal(
      (prevShowCreateRoomModal) => !prevShowCreateRoomModal
    );
    setPassword('');
    setTitle('');
  }, []);

  const onNewRoom = useCallback(
    async (data: any) => {
      queryClient.setQueryData(['roomlist'], () => {
        return [...roomDatas, data];
      });
      if (data.owner === userData?.id) {
        enterByOwnerAtInitial(data);
      }
    },
    [queryClient, roomDatas]
  );

  const onRemoveRoom = useCallback(
    async (data: any) => {
      const new_rooms = roomDatas.filter(
        (room: any) => Number(room.id) !== Number(data)
      );
      queryClient.setQueryData(['roomlist'], () => {
        return new_rooms;
      });
    },
    [queryClient, roomDatas]
  );

  useEffect(() => {
    console.log('v2_rooms에 진입하셨습니다.');
    socket.on('newRoom', onNewRoom);
    socket.on('removeRoom', onRemoveRoom);
    return () => {
      console.log('v2_rooms에서 나가셨습니다.');
      socket.off('newRoom', onNewRoom);
      socket.off('removeRoom', onRemoveRoom);
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
    mutateRoom({ title, password, owner: userData?.id });
    onCloseCreateRoomModal();
  };

  const onSubmitRoomName = useCallback(
    (e: any) => {
      e.preventDefault();
      if (findRoomName.trim() === '') {
        setFilteredRooms(roomDatas);
        setFindRoomName('');
        return;
      }
      const newFilteredRooms = roomDatas.filter((v: any) => {
        return v.title === findRoomName.trimLeft();
      });
      setFilteredRooms(newFilteredRooms);
      setFindRoomName('');
    },
    [findRoomName, roomDatas]
  );

  const onChangeInput = useCallback(
    (e: any) => {
      e.preventDefault();
      setFindRoomName(e.target.value);
      const newFilteredRooms = roomDatas.filter((v: any) => {
        return v.title.includes(e.target.value.trimLeft());
      });
      setFilteredRooms(newFilteredRooms);
    },
    [roomDatas]
  );


  function enterByOwnerAtInitial(data: any) {
    socket.emit('join-channel', {"channelId":String(data.id)});
    // console.log("[enterByOwner] data : ", data);
    // fetch(`http://${server_public_ip}:${server_port}/channels/${data.id}`, {
    //     method: 'POST',
    //     credentials: 'include',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(
    //       data.status === "PROTECTED" ? { password: data.password } : {}
    //   ), 
    // }).then((res) => {
    //   console.log('[enterByOwner] res : ', res, res.status);
    //   if (res.status === 200) {
    //     console.log('[enterByOwner 200 !]');
    //       console.log(`socket's id is ${socket.id}!`);
    //     // socket.emit('join-channel', {"channelId":String(data.id)});
    //     res.json();
    //     setTimeout(() => {
    //       // navigate(`v3_rooms/${data.id}/chat`);
    //     }, 50);
    //     return;
    //   } else {
    //     setErrorMessage('비밀번호가 틀렸습니다.');
    //   }
    // });
  }

  /*
    입장api: {"memberId":[86924],"status":"PUBLIC"}
  */
  const onEnterEvent = useCallback(
    (e: any) => {
      
      e.preventDefault();
      const roominfoEl = e.target.closest('[data-id]');
      let dataset_roomId: string = roominfoEl.getAttribute('data-id');
      dataset_roomId = dataset_roomId.trim();
      // socket.emit('leave-channel', dataset_roomId);
      const dataset_hasPassword =
        roominfoEl.getAttribute('data-password') === 'true';
      console.log(dataset_roomId + '번 방에 입장합니다.');
      

      // const fetcher = useFetcher();

      (async() => {
        const res = await fetch(
          `http://${server_public_ip}:${server_port}/channels/${dataset_roomId}`,
          {method: 'GET',credentials: 'include'}
        )
        let data = await res.json();
        console.log('[enterRoom]: ' + JSON.stringify(data));
        // console.log(
        //   'kickedList + ' + data.kickList.map((v: any) => v.username)
        // );

        // /* 기존 참여자 */
        // const is_kicked = data.kickList.find(
        //   (kickData: any) => kickData.username === userData?.id
        // );
        // if (is_kicked) {
        //   console.log('강퇴당한 유저입니다.');
        //   navigate(`v3_rooms/${dataset_roomId}/chat`);
        //   return;
        // }

        // {"memberId":[86924],"status":"PUBLIC"}
        const is_member = data.memberId.find(
          (theId: any) => {
            return theId === userData?.id}
        );

        if (is_member) {
          console.log('기존 참여자 입장');
          // navigate(`v3_rooms/${dataset_roomId}/chat`);
          return;
        }

        /* 최초 입장 */
        // TODO : api 문서에 따라 returnFail 수정
        
        /**
         * {"channelMembers":[{ "userId":86924},],"status":"PUBLIC"}
         * 
         */
        console.log('data.status ------->', data.status );
        if (data.status === "PUBLIC") {
          // const token = localStorage.getItem('jwt_token');
          let res2:any = fetch(
            `http://${server_public_ip}:${server_port}/channels/${dataset_roomId}`,
            {
              method: 'POST',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({}),
            }
          );
          console.log('dataset_roomId: [', dataset_roomId, ']');
          console.log('res.status : ', res2.status);
          if (res2.status === 200) {
            console.log('공개방 최초입장');
            // socket.emit('join-channel', {channelId: dataset_roomId} );
            const res_json = res2.json();
            console.log("입장post : ", res_json);
            // navigate(`v3_rooms/${dataset_roomId}/chat`);
          } else {
            setErrorMessage('방에 입장할 수 없습니다.');
          }
            return; 
          }
          else {
            /* 비공개방 */
            const password = prompt('비밀번호를 입력하세요');
            // const res3: any = fetcher(
            //   `http://${server_public_ip}:${server_port}/channels/${dataset_roomId}`,
            //   {
            //     method: 'POST',
            //     credentials: 'include',
            //     headers: {
            //       'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ password }),
            //   }
            // );
            // console.log('dataset_roomId: [', dataset_roomId, ']');
            // console.log('res.status : ', res3.status);
            console.log('비공개방 최초입장');
            joinChatRoom.mutate({ dataset_roomId, password, socket });
            // if (res3.status === 200) {
            //   // socket.emit('join-channel', {channelId:dataset_roomId});
            //   socket.emit('join-channel', '12345' );
            //   const res_json = res3.json();
            //   console.log("입장post : ", res_json);
            //   // navigate(`v3_rooms/${dataset_roomId}/chat`);
            //   return;
            // } else {
            //   setErrorMessage('비밀번호가 틀렸습니다.');
            // }
            return;
          }
      })();
      
    },
    [userData]
  );

  if (isLoadingRooms || isLoadingUser) return <div>isLoading...</div>;

  return (
    <ChatRoomContainer>
      <SearchRoom onSubmit={onSubmitRoomName}>
        <input
          title="searchInput"
          onChange={onChangeInput}
          value={findRoomName}
        />
        <span>
          <img src={searchButtonUrl} onClick={onSubmitRoomName} />
        </span>
      </SearchRoom>
      <RoomList>
        <Scrollbars autoHide>
          {filteredRooms.map((roomInfo: any) => {
            return (
              <div
                className="eachRoom"
                data-id={roomInfo.id}
                data-password={roomInfo.status === "PUBLIC" ? 'true' : 'false'}
                key={roomInfo.id}
                onClick={onEnterEvent}
              >
                <div>
                  {roomInfo.status === "PUBLIC" ? (
                    <></>
                  ) : (
                    <img
                      src="../../../public/padlock_locked.png"
                      alt="padlock_locked"
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
      </RoomList>
      <CreateRoom>
        <button
          onClick={(e) => {
            e.preventDefault();
            setShowCreateRoomModal(
              (prevShowCreateRoomModal) => !prevShowCreateRoomModal
            );
          }}
          title="방 만들기"
        >
          <img src={createRoomButtonUrl} alt="createRoomButton" />
        </button>
      </CreateRoom>
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
            title="방 만들기(모달)"
          >
            <img
              src={createRoomButtonUrl}
              style={{
                width: '30px',
                height: '30px',
                maxWidth: '100%',
                maxHeight: '100%',
              }}
              alt="createRoomButton(모달)"
            />
          </button>
        </form>
      </CreateRoomModal>
    </ChatRoomContainer>
  );
};

export default ChatRoom;
