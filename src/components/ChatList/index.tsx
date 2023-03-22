import {
  ChatBubble,
  // ChatBubbleTail,
  ChatItem,
  ChatLists,
  ChatMain,
  ChatProfile,
} from './styles';
import chatSendButtonUrl from '../../assets/smallButton/chatSendButton.svg';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export const ChatElement = styled.section`
  position: relative;
`;

const chat_backurl = 'http://127.0.0.1:3095';

async function postChat(
  roomId: string,
  data: any,
  username: string
): Promise<string> {
  const token = localStorage.getItem('jwt_token');
  let res = await fetch(`${chat_backurl}/room/${roomId}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      createdAt: new Date(),
      chat: data,
      user: username,
    }),
  }).then((res) => res.text());
  return res;
}

function ChatsMenu({
  username,
  roomDatas,
  myUser,
  roomId,
  refetch,
}: {
  username: string;
  roomDatas: any;
  myUser: any;
  roomId: string;
  refetch: any;
}) {
  console.log(roomDatas);
  const token = localStorage.getItem('jwt_token');
  const onkick = async () => {
    let res = await fetch(`${chat_backurl}/room/${roomId}/kick/${username}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        // room_id: roomId,
        // user_me: myUser.username,
        // user_you: username,
      }),
    }).then((res) => {
      // refetch();
    });
  };
  const onBan = async () => {
    let res = await fetch(`${chat_backurl}/room/${roomId}/ban/${username}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({}),
    }).then((res) => {});
  };

  const onAdmin = async () => {
    let res = await fetch(`${chat_backurl}/room/${roomId}/admin/${username}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({}),
    }).then((res) => {});
  };

  const onMute = async () => {
    let res = await fetch(`${chat_backurl}/room/${roomId}/mute/${username}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({}),
    }).then((res) => {});
  };

  return (
    <div
      style={{
        position: 'absolute',
        backgroundColor: 'gray',
        borderRadius: '10px',
        padding: '10px',
        fontSize: '16px',
        zIndex: 1,
        top: '2rem',
      }}
    >
      {myUser.username === roomDatas.owner ? (
        myUser.username === username ? (
          <div>나는 방장입니다</div>
        ) : (
          <>
            <div onClick={onAdmin}>관리자 임명하기</div>
            <div onClick={onkick}>5분간 kick</div>
            <div onClick={onBan}>영원히 ban</div>
            <div onClick={onMute}>5분간 mute</div>
          </>
        )
      ) : roomDatas.adminList.includes(myUser.username) ? (
        myUser.username === username ? (
          <div>나는 관리자입니다</div>
        ) : username === roomDatas.owner ? (
          <div>방장님 입니다</div>
        ) : (
          <>
            <div onClick={onkick}>5분간 kick</div>
            <div onClick={onBan}>영원히 ban</div>
            <div>5분간 mute</div>
          </>
        )
      ) : myUser.username === username ? (
        <div>나는 일반 유저입니다</div>
      ) : (
        <>
          <div>친구로써 차단하기</div>
        </>
      )}
    </div>
  );
}

const ChatListComponent = React.memo(
  ({
    chatList,
    username,
    roomDatas,
    myUser,
    roomId,
    refetch,
  }: {
    chatList: any;
    username: string;
    roomDatas: any;
    myUser: any;
    roomId: string;
    refetch: any;
  }) => {
    const [selectedChatIndex, setSelectedChatIndex] = useState(-1);
    const handleChatClick = (index: number) => {
      if (selectedChatIndex === index) {
        setSelectedChatIndex(-1);
        return;
      }
      setSelectedChatIndex(index);
    };

    return (
      <ChatLists>
        {chatList.map((chatData: any, index: number) => (
          <ChatItem other={chatData.user !== username} key={index}>
            <ChatProfile onClick={() => handleChatClick(index)}>
              <img src={chatData.imgSrc} alt="User profile" />
            </ChatProfile>
            {selectedChatIndex === index && (
              <ChatsMenu
                username={chatData.user}
                roomDatas={roomDatas}
                myUser={myUser}
                roomId={roomId}
                refetch={refetch}
              />
            )}
            <ChatMain>
              <span>{chatData.user}</span>
              <span>{chatData.createdAt}</span>
              <ChatBubble
                other={chatData.user !== username}
                style={{ whiteSpace: 'pre-wrap' }}
              >
                {chatData.chat}
              </ChatBubble>
            </ChatMain>
          </ChatItem>
        ))}
      </ChatLists>
    );
  }
);

const ChatList = ({ Flex, socket }: { Flex: number; socket: any }) => {
  const params = useParams<{ roomId?: string }>();
  const { roomId } = params;
  const [chat, setChat] = useState('');
  const scrollbarRef = useRef<Scrollbars>(null);
  // const [chatList, setChatList] = useState(ChatsData);

  console.log(`현재 roomId: ${roomId} 에 있는 상태입니다.`);
  const token = localStorage.getItem('jwt_token');
  const options = {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  };

  const {
    data: chatDatas,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<any>(
    ['chat', roomId],
    async () => {
      const response = await fetch(
        `${chat_backurl}/room/${roomId}/chat`,
        options
      );
      console.log(response);
      if (!response.ok) {
        throw new Error('채팅방에 참여하지 않았습니다!');
      }
      return response.json();
    }
    // {
    //   retry: 3,
    //   retryOnMount: true,
    // }
  );

  const { data: user, isLoading: isLoadingUser } = useQuery<any>(['user'], () =>
    fetch(chat_backurl + '/user', options).then((res) => res.json())
  );

  const { data: roomDatas, isLoading: isLoadingRoom } = useQuery<any>(
    ['room', roomId],
    () => fetch(chat_backurl + `/room/${roomId}`).then((res) => res.json())
  );

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: mutateChat } = useMutation<unknown, unknown, any, unknown>(
    ({ chat, user }) => postChat(roomId!, chat, user.username),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['chat', roomId]);
      },
    }
  );

  const onMessage = useCallback(
    async (data: any) => {
      // console.log("데이터: ", data);
      queryClient.setQueryData(['chat', roomId], (chatData: any) => {
        return [...chatData, data];
      });
      // if (data.SenderId === "hyoslee") {
      //   setTimeout(() => {
      //     scrollbarRef.current?.scrollToBottom();
      //   }, 10);
      //   return;
      // }
      if (
        scrollbarRef.current &&
        scrollbarRef.current.getScrollHeight() <
          scrollbarRef.current.getClientHeight() +
            scrollbarRef.current.getScrollTop() +
            150
      ) {
        setTimeout(() => {
          scrollbarRef.current?.scrollToBottom();
        }, 50);
      } else {
        toast.success('새 메시지가 도착했습니다.', {
          onClick() {
            scrollbarRef.current?.scrollToBottom();
          },
          closeOnClick: true,
        });
        toast.clearWaitingQueue();
      }
    },
    [queryClient, roomId]
  );
  const onJoin = useCallback(function (data: any) {
    console.log('JoinData: ', data);
  }, []);
  const onExit = useCallback(function (data: any) {
    console.log('LeaveData: ', data);
  }, []);
  const onKick = useCallback(function (data: any) {
    console.log('KickData: ', data);
    if (data === user.username) {
      console.log('강퇴당하셨습니다');
      refetch();
      navigate('/chat/v2_rooms');
    } else {
      console.log(`${data}님이 강퇴당햇습니다`);
    }
  }, []);
  const onRole = useCallback(function (data: any) {
    refetch();
  }, []);

  useEffect(() => {
    if (onMessage && onJoin && onExit) {
      console.log('소켓 기능이 on 되었습니다! (join, exit, message)');
      socket?.on('message', onMessage);
      socket?.on('join', onJoin);
      socket?.on('exit', onExit);
      // socket?.emit('join', roomId);
      socket?.on('kick', onKick);
      socket?.on('role', onRole);
    }
    return () => {
      console.log('소켓 기능이 off 되었습니다! (join, exit, message)');
      socket?.off('message', onMessage);
      socket?.off('join', onJoin);
      socket?.off('exit', onExit);
      socket?.off('kick', onKick);
      socket?.off('role', onRole);
      // socket?.emit('leave', roomId);
    };
  }, [roomId, onJoin, onExit, onMessage]);

  const onChangeChat = useCallback((e: any) => {
    e.preventDefault();
    setChat(e.target.value);
  }, []);

  const onSubumitChat = (e: any) => {
    e.preventDefault();
    if (!chat?.trim()) return;
    mutateChat({ chat, user });
    setChat('');
  };

  function handleKeyDown(event: any) {
    if (event.keyCode === 13 && !event.shiftKey) {
      // Submit the form
      event.preventDefault();
      if (!chat?.trim()) return;
      mutateChat({ chat, user });
      setChat('');
    } else if (event.keyCode === 13 && event.shiftKey) {
      // Add a new line
      event.preventDefault();
      setChat((prevChat) => prevChat + '\n');
    }
  }

  if (isLoading || isLoadingRoom || isLoadingUser) return <div />;
  if (isError) {
    const response = error as Response;
    return (
      <div style={{ flex: 1.85 }}>
        <div>방에 대한 권한이 없습니다</div>
        <div>{response && response.statusText}</div>
        <Link to="/chat/v3_rooms">방 목록으로</Link>
      </div>
    );
  }

  return (
    <div
      style={{
        borderRadius: '2rem',
        border: '0.3rem solid black',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        flex: Flex,
      }}
    >
      <div style={{ flex: 9 }}>
        <Scrollbars autoHide ref={scrollbarRef}>
          {/* <ChatLists>
            {chatList.map((chatData) => (
              <ChatItem other={chatData.name !== 'me'}>
                <ChatProfile>
                  <img src={chatData.imgSrc} alt="User profile" />
                </ChatProfile>
                <ChatMain>
                  <span>{chatData.name}</span>
                  <ChatBubble
                    other={chatData.name !== 'me'}
                    style={{ whiteSpace: 'pre-wrap' }}
                  >
                    {chatData.content}
                  </ChatBubble>
                </ChatMain>
              </ChatItem>
            ))}
          </ChatLists> */}
          <ChatListComponent
            chatList={chatDatas}
            username={user.username}
            roomDatas={roomDatas}
            myUser={user}
            roomId={roomId}
            refetch={refetch}
          />
          <ToastContainer limit={1} />
        </Scrollbars>
      </div>
      <form
        style={{
          flex: 1,
          width: '100%',
          display: 'flex',
          marginBottom: '1rem',
        }}
        onSubmit={onSubumitChat}
      >
        <textarea
          style={{
            flex: 8,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '2rem',
            border: '0.3rem solid black',
            padding: '1rem',
            overflow: 'hidden',
            resize: 'none',
          }}
          onChange={onChangeChat}
          onKeyDown={handleKeyDown}
          value={chat}
        ></textarea>
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
              backgroundColor: '#FCF451',
              border: '0.3rem solid black',
              width: '4rem',
              height: '4rem',
            }}
            onClick={onSubumitChat}
          >
            <img
              src={chatSendButtonUrl}
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            />
          </button>
        </div>
      </form>
      <div
        style={{ flex: 0.3, display: 'flex', justifyContent: 'space-evenly' }}
      >
        <Link to="/chat/v3_rooms" style={{ border: '0.2rem solid red' }}>
          <button>방 목록으로</button>
        </Link>
        <Link to="/chat/v3_rooms" style={{ border: '0.2rem solid red' }}>
          <button
            onClick={() => {
              socket?.emit('leave', roomId);
            }}
          >
            방 나가기
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ChatList;
