import { useEffect, useState } from "react";
import useSocket from "../../hooks/useSocket";
import OnlineList from "../../components/OnlineList";
import Title from "../../components/Title";
import { Channels, MyChannels } from "../../components/Channels";
import { Container } from "../../layouts/Home/styles";
import { ChatBody } from "./styles";

const Chat = () => {
  const [channelId, setChannelId] = useState("");
  const [chat_socket, disconnect_chat_socket] = useSocket("channelchat");
  const [popChatting, setPopChatting] = useState(false);
  // console.log('connecting chat_socket: ', chat_socket);

  useEffect(() => {
    return () => {
      // console.log('disconnecting chat socket');
      disconnect_chat_socket();
    };
  }, []);

  return (
    <>
      <Container>
        <div className="Title">
          <Title title="PONG CHAT" home />
        </div>

        <div className="BodyOuter">
          <ChatBody>
            <div className="OnlineList Section">
              <OnlineList />
            </div>

            <div className="ChatOrMyChannels Section">
              <MyChannels
                socket={chat_socket}
                popChatting={popChatting}
                setPopChatting={setPopChatting}
                channelId={channelId}
                setChannelId={setChannelId}
              />
            </div>

            <div className="AllChannels Section">
              <Channels
                socket={chat_socket}
                setPopChatting={setPopChatting}
                channelId={channelId}
                setChannelId={setChannelId}
              />
              {/* <ChatRoom socket={chat_socket} /> */}
            </div>
          </ChatBody>
        </div>
      </Container>
    </>
  );
};

export default Chat;
