import React, { useEffect } from "react";
import { Container, Button, Nav, Label, Input } from "../../styles/styles";
import GlobalStyles from "../../styles/global";
import { Navigate, Route, Routes } from "react-router";
import V2rooms from "./v2_rooms";
import V2dms from "./v2_dms";
import V2chats from "./v2_chats";
import CreateRoom from "./v2_create_room";
import useSocket from "../../hooks/useSocket";

const Chat = () => {
  const [room_socket, disconnect_room_socket] = useSocket("v2_room");
  const [chat_socket, disconnect_chat_socket] = useSocket("v2_chat");
  console.log("connecting room_socket: ", room_socket);
  console.log("connecting chat_socket: ", chat_socket);

  useEffect(() => {
    return () => {
      console.log("disconnecting room socket");
      disconnect_room_socket();
      console.log("disconnecting chat socket");
      disconnect_chat_socket();
    };
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="v2_rooms" />} />
      <Route path="v2_rooms/*">
        <Route path="create_room" element={<CreateRoom />} />
        <Route path=":roomId/chat" element={<V2chats socket={chat_socket} />} />
        <Route path="*" element={<V2rooms socket={room_socket} />} />
      </Route>
      <Route path="v2_dms/:dmId" element={<V2dms />} />
    </Routes>
  );
};

export default Chat;
