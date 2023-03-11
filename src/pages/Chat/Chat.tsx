import React, { useEffect } from "react";
import { Container, Button, Nav, Label, Input } from "../../styles/styles";
import GlobalStyles from "../../styles/global";
import { Navigate, Route, Routes } from "react-router";
import V2rooms from "./v2_rooms";
import V2dms from "./v2_dms";
import V2chats from "./v2_chats";
import useSocket from "../../hooks/useSocket";
import Create_fakeUsers from "./create_fakeusers";
import Get_fakeUsers from "./get_fakeusers";

const Chat = () => {
  // const [room_socket, disconnect_room_socket] = useSocket("v2_room");
  // console.log("connecting room_socket: ", room_socket);
  const [chat_socket, disconnect_chat_socket] = useSocket("v2_chat");
  console.log("connecting chat_socket: ", chat_socket);

  useEffect(() => {
    return () => {
      // console.log("disconnecting room socket");
      // disconnect_room_socket();
      console.log("disconnecting chat socket");
      disconnect_chat_socket();
    };
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="v2_rooms" />} />
      <Route path="v2_rooms/*">
        <Route path=":roomId/chat" element={<V2chats socket={chat_socket} />} />
        <Route path="*" element={<V2rooms socket={chat_socket} />} />
      </Route>
      <Route path="v2_dms/*">
        <Route path=":dmId" element={<V2dms socket={chat_socket} />} />
      </Route>
      <Route path="createUsers" element={<Create_fakeUsers />} />
      <Route
        path="getUsers/:id"
        element={<Get_fakeUsers socket={chat_socket} />}
      />
    </Routes>
  );
};

export default Chat;
