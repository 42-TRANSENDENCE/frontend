import React, { forwardRef, useEffect, useRef, useState } from 'react';
import GlobalStyles from '../../styles/global';
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams,
} from 'react-router';
import useSocket from '../../hooks/useSocket';
import Create_fakeUsers from './create_fakeusers';
import Get_fakeUsers from './get_fakeusers';
import ChatList from '../../components/ChatList';
import ChatRoom from '../../components/ChatRoom';
import OnlineList from '../../components/OnlineList';
import Title from '../../components/Title';
import { Channels, MyChannels } from '../../components/Channels';
import { Container } from '../../layouts/Home/styles';
import { Link } from 'react-router-dom';

const Chat = () => {
  const [chat_socket, disconnect_chat_socket] = useSocket('channelchat');
  console.log('connecting chat_socket: ', chat_socket);

  useEffect(() => {
    return () => {
      console.log('disconnecting chat socket');
      disconnect_chat_socket();
    }
  }, []);

  return (
    <>
      <Container>
        <div className='Title'>
          <Title title='PONG CHAT' home />
        </div>
        
        <div className='BodyOuter'>
          <div className='Body'>
            <div className='LeftSide Section'>
              <OnlineList />
            </div>
            
            <div className='MiddleSide Section'>
              <MyChannels socket={chat_socket} />
              {/* <Chatting /> */}
            </div>

            <div className='RightSide Section'>
              <Channels socket={chat_socket} />
              {/* <ChatRoom socket={chat_socket} /> */}
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

// // ChatList마다 reRendering대신 reMounting을 하기 위해 key={roomId}를 넘겨줌
// const ChatContainer = forwardRef(({ socket: chat_socket }: any, ref: any) => {
//   const params = useParams<{ roomId?: string }>();
//   const { roomId } = params;
//   const navigate = useNavigate();

//   // console.log('ref.current: ', ref.current);
//   if (ref.current === roomId) {
//     ref.current = -1;
//     // console.log('같은 roomId이므로 chat으로 갑니다');
//     navigate('/chat');
//   }
//   ref.current = roomId;

//   return <ChatList socket={chat_socket} key={roomId} />;
// });

// const Chat = () => {
//   const [chat_socket, disconnect_chat_socket] = useSocket('channelchat');
//   console.log('connecting chat_socket: ', chat_socket);
//   const roomId_ref = useRef(-1);

//   useEffect(() => {
//     return () => {
//       console.log('disconnecting chat socket');
//       disconnect_chat_socket();
//     };
//   }, []);

//   return (
//     <>
//       <Routes>
//         <Route path="createUsers" element={<Create_fakeUsers />} />
//         <Route
//           path="getUsers/:id"
//           element={<Get_fakeUsers socket={chat_socket} />}
//         />
//       </Routes>
//       <Container>
//         <div className="Title">
//           <Title title="PONG CHAT" home search />
//         </div>
//         <div className="BodyOuter">
//           <div className="Body">
//             <div className="LeftSide Section">
//               <OnlineList />
//             </div>

//             <div className="MiddleSide Section">
//               <Routes>
//                 <Route path="/" element={<Navigate replace to="v3_rooms" />} />
//                 <Route path="v3_rooms/*">
//                   <Route
//                     path=":roomId/chat"
//                     element={
//                       <ChatContainer socket={chat_socket} ref={roomId_ref} />
//                     }
//                   />
//                   <Route
//                     path="*"
//                     element={
//                       <div
//                         style={{
//                           display: 'flex',
//                           flexDirection: 'column',
//                         }}
//                       >
//                         <Link to="/">
//                           <span>홈으로</span>
//                         </Link>
//                         <Link to="/chat/createUsers">유저들 만들기</Link>
//                         <Link to="/chat/getUsers/1">1번 유저 쿠키획득</Link>
//                         <Link to="/chat/getUsers/3">3번 유저 쿠키획득</Link>
//                         <Link to="/chat/v2_dms/rock11">
//                           rock11 유저와 dm하기
//                         </Link>
//                         <Link to="/chat/v2_dms/rock33">
//                           rock33 유저와 dm하기
//                         </Link>
//                       </div>
//                     }
//                   />
//                 </Route>
//               </Routes>
//             </div>
//             <div className="RightSide Section">
//               <ChatRoom socket={chat_socket} />
//             </div>
//           </div>
//         </div>
//       </Container>
//     </>
//   );
// };

export default Chat;
