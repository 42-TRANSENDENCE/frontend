import React, { useEffect, useState } from 'react';
import GlobalStyles from '../../styles/global';
import { Navigate, Route, Routes, useParams } from 'react-router';
import V2rooms from './v2_rooms';
import V2dms from './v2_dms';
import V2chats from './v2_chats';
import useSocket from '../../hooks/useSocket';
import Create_fakeUsers from './create_fakeusers';
import Get_fakeUsers from './get_fakeusers';
import { Design } from './design';
//
import styled from 'styled-components';
import ChatList from '../../components/ChatList';
import ChatRoom from '../../components/ChatRoom';
import OnlineList from '../../components/OnlineList';
import Title from '../../components/Title';
import { Container } from '../../layouts/Home/styles';
import { Link } from 'react-router-dom';

// ChatList마다 reRendering대신 reMounting을 하기 위해 key={roomId}를 넘겨줌
const ChatContainer = ({ socket: chat_socket, Flex }: any) => {
  const params = useParams<{ roomId?: string }>();
  const { roomId } = params;

  return <ChatList socket={chat_socket} Flex={Flex} key={roomId} />;
};

const Chat = () => {
  const [chat_socket, disconnect_chat_socket] = useSocket('v2_chat');
  console.log('connecting chat_socket: ', chat_socket);

  useEffect(() => {
    return () => {
      console.log('disconnecting chat socket');
      disconnect_chat_socket();
    };
  }, []);

  return (
    <>
      <Container>
        <div className="Title">
          <Title title="PONG CHAT" home search />
        </div>
        <div className="BodyOuter">
          <div className="Body">
            <div className="LeftSide Section">
              <OnlineList Flex={1} />
            </div>

            <div className="MiddleSide Section">
              <Routes>
                <Route path="/" element={<Navigate replace to="v3_rooms" />} />
                <Route path="v3_rooms/*">
                  <Route
                    path=":roomId/chat"
                    element={<ChatContainer socket={chat_socket} Flex={1.85} />}
                  />
                  <Route
                    path="*"
                    element={
                      <div
                        style={{
                          flex: '1.85',
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        <Link to="/">
                          <span>홈으로</span>
                        </Link>
                        <Link to="/chat/createUsers">유저들 만들기</Link>
                        <Link to="/chat/getUsers/1">1번 유저 쿠키획득</Link>
                        <Link to="/chat/getUsers/3">3번 유저 쿠키획득</Link>
                        <Link to="/chat/v2_dms/rock11">
                          rock11 유저와 dm하기
                        </Link>
                        <Link to="/chat/v2_dms/rock33">
                          rock33 유저와 dm하기
                        </Link>
                      </div>
                    }
                  />
                </Route>
              </Routes>
            </div>
            <div className="RightSide Section">
              <ChatRoom socket={chat_socket} Flex={1} />
            </div>
          </div>
        </div>
      </Container>
      <Routes>
        <Route path="createUsers" element={<Create_fakeUsers />} />
        <Route
          path="getUsers/:id"
          element={<Get_fakeUsers socket={chat_socket} />}
        />
        <Route path="design/*" element={<Design />} />
      </Routes>
    </>
  );
};

export default Chat;
