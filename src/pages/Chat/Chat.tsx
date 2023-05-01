import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useSocket from "../../hooks/useSocket";
import { useSendDm } from "../../hooks/mutation/chat";
import { useUserInfo, useUserSearch } from "../../hooks/query/user";
import Profile, { ProfileProps } from "../../components/Profile";
import OnlineList, { User } from "../../components/OnlineList";
import Title from "../../components/Title";
import { Channels, MyChannels } from "../../components/Channels";
import { Container } from "../../layouts/Home/styles";
import { ChatBody } from "./styles";
import Notification from "../../components/Notification";
import { SocketContext } from "../../contexts/ClientSocket";
import { toast } from "react-toastify";

const Chat = () => {
  const [channelId, setChannelId] = useState("");
  const [chat_socket, disconnect_chat_socket] = useSocket("channelchat");
  const [popChatting, setPopChatting] = useState(false);
  const [popProfile, setPopProfile] = useState(false);
  const [user, setUser] = useState<ProfileProps | null>(null);
  const [userSearch, setUserSearch] = useState<string | null>(null);
  const clientSocket = useContext(SocketContext);
  const userSearchTest = useUserSearch();
  const userInfoData = useUserInfo().data;
  const navigate = useNavigate();
  const location = useLocation();
  const sendDM = useSendDm();
  const state = location.state as {
    user: User | null;
  };

  useEffect(() => {
    if (userSearch) {
      userSearchTest.refetch({
        userSearch,
        userInfoData,
        setPopProfile,
        setUser,
      });
    }
    setUserSearch(null);
  }, [userSearch]);

  useEffect(() => {
    clientSocket.on("socket_error", () => {
      toast.warn("이미 로그인 되어있습니다.");
      navigate("/");
    });
    clientSocket.emit("login_check");
    history.replaceState(null, "", "/chat");
    if (state) {
      sendDM.mutate({
        id: state.user?.id,
        nickname: state.user?.nickname,
        setChannelId: setChannelId,
        setPopChatting: setPopChatting,
      });
    }
    return () => {
      clientSocket.off("socket_error");
      disconnect_chat_socket();
    };
  }, []);

  return (
    <>
      <Container>
        <div className="Title">
          <Title title="PONG CHAT" home search setSearchUser={setUserSearch} />
        </div>

        <div className="BodyOuter">
          <ChatBody>
            <div className="OnlineList Section">
              <OnlineList
                isHome={false}
                setChannelId={setChannelId}
                setPopChatting={setPopChatting}
              />
            </div>

            <div className="ChatOrMyChannels Section">
              <MyChannels
                myNickname={userInfoData?.nickname}
                socket={chat_socket}
                popChatting={popChatting}
                setPopChatting={setPopChatting}
                channelId={channelId}
                setChannelId={setChannelId}
                setPopProfile={setPopProfile}
                setUser={setUser}
              />
            </div>

            <div className="AllChannels Section">
              {popProfile && user ? (
                <div
                  className="Profile"
                  onClick={() => {
                    setPopProfile(false);
                  }}
                >
                  <div
                    className="pop-profile"
                    onClick={(e: any) => {
                      e.stopPropagation();
                    }}
                  >
                    <Profile profile={user} setPopProfile={setPopProfile} />
                  </div>
                </div>
              ) : (
                <Channels
                  socket={chat_socket}
                  setPopChatting={setPopChatting}
                  setChannelId={setChannelId}
                />
              )}
              <Notification />
            </div>
          </ChatBody>
        </div>
      </Container>
    </>
  );
};

export default Chat;
