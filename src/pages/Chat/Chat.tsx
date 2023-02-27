import React from "react";
import { Container, Button, Nav, Label, Input } from "../../styles/styles";
import GlobalStyles from "../../styles/global";
import { Navigate, Route, Routes } from "react-router";
import V2rooms from "./v2_rooms";
import V2dms from "./v2_dms";
import V2chats from "./v2_chats";
import CreateRoom from "./v2_create_room";

// export const chat_backurl = "http://127.0.0.1:3095";

const Chat = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="v2_rooms" />} />
      <Route path="v2_rooms/create_room" element={<CreateRoom />} />
      <Route path="v2_rooms/:roomId/chat" element={<V2chats />} />
      <Route path="v2_rooms/*" element={<V2rooms />} />
      <Route path="v2_dms/:dmId" element={<V2dms />} />
    </Routes>
  );
};

export default Chat;
