import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useSocket from '../../hooks/useSocket';
import { useSendDm } from '../../hooks/mutation/chat';
import OnlineList, { User } from '../../components/OnlineList';
import Title from '../../components/Title';
import { Channels, MyChannels } from '../../components/Channels';
import { Container } from '../../layouts/Home/styles';

const Chat = () => {
  const [channelId, setChannelId] = useState('');
  const [chat_socket, disconnect_chat_socket] = useSocket('channelchat');
  const [popChatting, setPopChatting] = useState(false);
  const location = useLocation();
  const sendDM = useSendDm();
  const state = location.state as {
    user: User | null;
  }

  // console.log('connecting chat_socket: ', chat_socket);

  useEffect(() => {
    if (state) {
      sendDM.mutate({ id: state.user?.id, nickname: state.user?.nickname, setChannelId: setChannelId, setPopChatting: setPopChatting })
    }
    return () => {
      // console.log('disconnecting chat socket');
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
              <OnlineList isHome={false} setChannelId={setChannelId} setPopChatting={setPopChatting} />
            </div>

            <div className='MiddleSide Section'>
              <MyChannels socket={chat_socket} popChatting={popChatting} setPopChatting={setPopChatting} channelId={channelId} setChannelId={setChannelId} />
            </div>

            <div className='RightSide Section'>
              <Channels socket={chat_socket} setPopChatting={setPopChatting} channelId={channelId} setChannelId={setChannelId} />
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default Chat;
