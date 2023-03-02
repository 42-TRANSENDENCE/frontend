import styled from "@emotion/styled";
import { useCallback, useEffect, useRef, useState } from "react";
import Scrollbars from "react-custom-scrollbars";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ChatElement = styled.section`
  margin: 1rem;
`;

const chat_backurl = "http://127.0.0.1:3095";

async function postChat(roomId: string, data: any): Promise<string> {
  let res = await fetch(`${chat_backurl}/api/room_list/room/${roomId}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      createdAt: new Date(),
      chat: data,
    }),
  }).then((res) => res.text());
  return res;
}

export default function V2chats({ socket }: { socket: any }) {
  const params = useParams<{ roomId?: string }>();
  const { roomId } = params;
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const password = queryParams.get("password");
  const [chat, setChat] = useState("");
  const scrollbarRef = useRef<Scrollbars>(null);

  console.log(
    `현재 roomId: ${roomId}, password: ${password} 에 있는 상태입니다.`
  );

  const {
    data: chatDatas,
    isLoading,
    isError,
  } = useQuery<any>(
    ["chat", roomId],
    async () => {
      const response = await fetch(
        `${chat_backurl}/api/room_list/room/${roomId}/chat?password=${password}`
      );
      if (!response.ok) {
        throw new Error("password check Error!");
      }
      return response.json();
    },
    {
      retry: 0,
      retryOnMount: true,
    }
  );
  const { data: user, isLoading: isLoadingUser } = useQuery<any>(["user"], () =>
    fetch(chat_backurl + "/api/user", options).then((res) => res.json())
  );

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: mutatePost } = useMutation(
    (chat: string) => postChat(roomId!, chat),
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
      socket?.emit("leave", roomId);
      socket?.off("exit", onExit);
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
    mutatePost(chat);
    setChat("");
  };

  const onChangeChat = useCallback((e: any) => {
    e.preventDefault();
    setChat(e.target.value);
  }, []);

  if (isLoading) return <div />;
  if (isError)
    return (
      <>
        <div>비밀번호 틀렸어</div>
        <Link to="/chat/v2_rooms">방 목록으로</Link>
      </>
    );
  return (
    <>
      <Scrollbars
        autoHide
        style={{ width: 500, height: 700 }}
        ref={scrollbarRef}
        onScrollFrame={() => {}}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          {chatDatas.map((chat: any) => {
            return (
              <ChatElement key={chat.chat}>
                <div>
                  {chat.user}({chat.createdAt})
                </div>
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
          style={{ display: "block", width: "100px", height: "100px" }}
        >
          전송
        </button>
      </form>
      <Link to="/chat/v2_rooms">방 목록으로</Link>
    </>
  );
}
