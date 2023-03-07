import styled from "@emotion/styled";
import { useCallback, useEffect, useRef, useState } from "react";
import Scrollbars from "react-custom-scrollbars";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ChatElement = styled.section`
  /* margin: 1rem; */
  position: relative;
`;

const chat_backurl = "http://127.0.0.1:3095";

async function postChat(
  roomId: string,
  data: any,
  username: string
): Promise<string> {
  let res = await fetch(`${chat_backurl}/api/room_list/room/${roomId}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
}: {
  username: string;
  roomDatas: any;
  myUser: any;
}) {
  return (
    <div
      style={{
        position: "absolute",
        backgroundColor: "gray",
        borderRadius: "10px",
        padding: "10px",
        fontSize: "16px",
        zIndex: 1,
      }}
    >
      {myUser.username === roomDatas.owner ? (
        myUser.username === username ? (
          <div>나는 방장입니다</div>
        ) : (
          <>
            <div>관리자 임명하기</div>
            <div>5분간 kick</div>
            <div>영원히 ban</div>
            <div>5분간 mute</div>
          </>
        )
      ) : roomDatas.adminList.includes(myUser.username) ? (
        myUser.username === username ? (
          <div>나는 관리자입니다</div>
        ) : (
          <>
            <div>5분간 kick</div>
            <div>영원히 ban</div>
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

export default function V2chats({ socket }: { socket: any }) {
  const params = useParams<{ roomId?: string }>();
  const { roomId } = params;
  const location = useLocation();
  const [chat, setChat] = useState("");
  const scrollbarRef = useRef<Scrollbars>(null);

  console.log(`현재 roomId: ${roomId} 에 있는 상태입니다.`);
  const token = localStorage.getItem("jwt_token");
  const options = {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  };

  const {
    data: chatDatas,
    isLoading,
    isError,
  } = useQuery<any>(
    ["chat", roomId],
    async () => {
      const response = await fetch(
        `${chat_backurl}/api/room_list/room/${roomId}/chat`,
        options
      );
      console.log(response);
      if (!response.ok) {
        throw new Error("채팅방에 참여하지 않았습니다!");
      }
      return response.json();
    },
    {
      retry: 3,
      retryOnMount: true,
    }
  );

  const { data: user, isLoading: isLoadingUser } = useQuery<any>(["user"], () =>
    fetch(chat_backurl + "/api/user", options).then((res) => res.json())
  );
  // if (isLoadingUser) return <div>loading</div>;

  const { data: roomDatas, isLoading: isLoadingRoom } = useQuery<any>(
    ["room", roomId],
    () =>
      fetch(chat_backurl + `/api/room_list/room/${roomId}`).then((res) =>
        res.json()
      )
  );
  console.log(roomDatas);

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: mutateChat } = useMutation<unknown, unknown, any, unknown>(
    ({ chat, user }) => postChat(roomId!, chat, user.username),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["chat", roomId]);
      },
    }
  );

  const onMessage = useCallback(
    async (data: any) => {
      // console.log("데이터: ", data);
      queryClient.setQueryData(["chat", roomId], (chatData: any) => {
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
        toast.success("새 메시지가 도착했습니다.", {
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
    console.log("JoinData: ", data);
  }, []);
  const onExit = useCallback(function (data: any) {
    console.log("LeaveData: ", data);
  }, []);

  useEffect(() => {
    if (onMessage && onJoin && onExit) {
      console.log("소켓 기능이 on 되었습니다! (join, exit, message)");
      socket?.on("message", onMessage);
      socket?.on("join", onJoin);
      socket?.on("exit", onExit);
      socket?.emit("join", roomId);
    }
    return () => {
      console.log("소켓 기능이 off 되었습니다! (join, exit, message)");
      socket?.off("message", onMessage);
      socket?.off("join", onJoin);
      socket?.off("exit", onExit);
      socket?.emit("leave", roomId);
    };
  }, [roomId, onJoin, onExit, onMessage]);

  // useEffect(() => {
  //   // if (chatDatas === undefined) return;
  //   socket?.emit("join", roomId);
  // }, [roomId]);

  const onSubmitForm = (e: any) => {
    e.preventDefault();
    if (!chat?.trim()) {
      setChat("");
      return;
    }
    mutateChat({ chat, user });
    setChat("");
  };

  const onChangeChat = useCallback((e: any) => {
    e.preventDefault();
    setChat(e.target.value);
  }, []);

  // const [showMenu, setShowMenu] = useState(false);
  // const handleClick = (e: any) => {
  //   e.preventDefault();
  //   setShowMenu(!showMenu);
  // };
  const [selectedChatIndex, setSelectedChatIndex] = useState(-1);
  const handleChatClick = (index: number) => {
    if (selectedChatIndex === index) {
      setSelectedChatIndex(-1);
      return;
    }
    setSelectedChatIndex(index);
  };

  if (isLoading || isLoadingRoom || isLoadingUser) return <div />;
  if (isError)
    return (
      <>
        <div>비밀번호 틀렸어</div>
        <Link to="/chat/v2_rooms">방 목록으로</Link>
      </>
    );
  return (
    <div style={{ textAlign: "center" }}>
      <Scrollbars
        autoHide
        style={{
          width: 500,
          height: 700,
          marginLeft: "auto",
          marginRight: "auto",
        }}
        ref={scrollbarRef}
        onScrollFrame={() => {}}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {chatDatas.map((chat: any, index: any) => {
            return (
              <ChatElement key={index}>
                <div>
                  <span onClick={() => handleChatClick(index)}>
                    {chat.user}
                  </span>
                  ({chat.createdAt})
                </div>
                {selectedChatIndex === index && (
                  <ChatsMenu
                    username={chat.user}
                    roomDatas={roomDatas}
                    myUser={user}
                  />
                )}
                <div>&emsp;{chat.chat}</div>
              </ChatElement>
            );
          })}
        </div>
        <ToastContainer limit={1} />
      </Scrollbars>
      <form onSubmit={onSubmitForm}>
        <textarea placeholder="" value={chat} onChange={onChangeChat} />
        <button
          type="submit"
          style={{
            display: "block",
            margin: "auto",
            width: "100px",
            height: "100px",
          }}
        >
          전송
        </button>
      </form>
      <Link to="/chat/v2_rooms">방 목록으로</Link>
    </div>
  );
}
