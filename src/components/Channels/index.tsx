import { useCallback, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { useQueryClient } from "react-query";
import { Scrollbars } from "react-custom-scrollbars";
import { useAllChannels, useMyChannels } from "../../hooks/query/chat";
import { UserInfo, useUserInfo } from "../../hooks/query/user";
import { Chatting } from "../Chatting";
import {
  CreateChannelData,
  useCreateChannel,
  useJoinChannel,
} from "../../hooks/mutation/chat";
import {
  ChannelContainer,
  ChannelList,
  Input,
  SearchChannel,
  Header,
  ModalChild,
} from "./styles";
import { SmallButton } from "../../components/Button";
import Modal from "../Modal";
import searchButton from "../../assets/Search.svg";
import createChannelButton from "../../assets/smallButton/newChatRoomButton.svg";
import lockImg from "../../assets/lock.svg";
import dmImg from "../../assets/DM.svg";
import { toast } from "react-toastify";
import { ChannelStatus, ChannelsInfo } from "./interface";

export const Channels = ({
  socket,
  setPopChatting,
  setChannelId,
}: {
  socket: Socket | undefined;
  setPopChatting: React.Dispatch<React.SetStateAction<boolean>>;
  setChannelId: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const queryClient = useQueryClient();
  const userInfo: UserInfo = useUserInfo().data;
  const createChannel = useCreateChannel();
  const joinChannel = useJoinChannel();
  const allChannels: ChannelsInfo[] = useAllChannels().data;
  const myChannels: ChannelsInfo[] = useMyChannels().data;
  const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");
  const [findChannelName, setFindChannelName] = useState("");
  const [filteredChannels, setFilteredChannels] = useState(allChannels);
  const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);

  useEffect(() => {
    if (allChannels && findChannelName === "") setFilteredChannels(allChannels);
  }, [allChannels]);

  const onSubmitChannelName = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (findChannelName.trim() === "") {
        setFilteredChannels(allChannels);
        setFindChannelName("");
        return;
      }
      const newFilteredChannels = allChannels.filter(
        (channel: ChannelsInfo) => {
          return channel.title === findChannelName.trimStart();
        }
      );
      setFilteredChannels(newFilteredChannels);
      setFindChannelName("");
    },
    [allChannels, findChannelName]
  );

  const onChangeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      setFindChannelName(e.target.value);
      const newFilteredChannels = allChannels.filter(
        (channel: ChannelsInfo) => {
          return channel.title.includes(e.target.value.trimStart());
        }
      );
      setFilteredChannels(newFilteredChannels);
    },
    [allChannels]
  );

  const onClickJoinChannel = useCallback(
    async (e: any) => {
      e.preventDefault();
      const channelData = e.target.closest("[data-id]");
      const getChannelId: string = channelData.getAttribute("data-id");
      const channelStatus: ChannelStatus =
        channelData.getAttribute("data-status");
      let isJoined: boolean = false;
      myChannels.forEach((channel) => {
        if (String(channel.id) === getChannelId) {
          setPopChatting(false);
          socket?.emit("joinChannel", { channelId: String(getChannelId) });
          setChannelId(getChannelId);
          setPopChatting(true);
          isJoined = true;
          return;
        }
      });
      if (isJoined) return;
      if (channelStatus === ChannelStatus.PROTECTED) {
        const pwd = prompt("Enter password");
        if (pwd !== null)
          joinChannel.mutate({
            id: getChannelId,
            password: String(pwd),
            socket: socket,
            setChannelId: setChannelId,
            setPopChatting: setPopChatting,
          });
      } else {
        joinChannel.mutate({
          id: getChannelId,
          password: "",
          socket: socket,
          setChannelId: setChannelId,
          setPopChatting: setPopChatting,
        });
      }
    },
    [joinChannel]
  );

  const onClickCreatChennel = useCallback(() => {
    setShowCreateChannelModal(true);
  }, [showCreateChannelModal]);

  const onCloseCreateChannelModal = useCallback(() => {
    setShowCreateChannelModal(false);
    setPassword("");
    setTitle("");
  }, [showCreateChannelModal]);

  const onChangeTitle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      setTitle(e.target.value);
    },
    [title]
  );

  const onChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      setPassword(e.target.value);
    },
    [password]
  );

  const onSubmitCreateChannel = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const data: CreateChannelData = {
        title: title,
        password: password,
      };
      createChannel.mutate(data);
      onCloseCreateChannelModal();
    },
    [createChannel]
  );

  const onNewChannel = useCallback(async (data: ChannelsInfo) => {
    if (data.owner.id === userInfo.id) {
      socket?.emit("joinChannel", { channelId: String(data.id) });
      setChannelId(String(data.id));
      setPopChatting(true);
    }
    queryClient.invalidateQueries({ queryKey: ["allChannels"] });
    queryClient.invalidateQueries({ queryKey: ["myChannels"] });
  }, []);

  const onRemoveChannel = useCallback(async () => {
    queryClient.invalidateQueries({ queryKey: ["allChannels"] });
    queryClient.invalidateQueries({ queryKey: ["myChannels"] });
  }, []);

  useEffect(() => {
    socket?.on("newChannel", onNewChannel);
    socket?.on("removeChannel", onRemoveChannel);
    return () => {
      socket?.off("newChannel", onNewChannel);
      socket?.off("removeChannel", onRemoveChannel);
    };
  }, [socket]);

  return (
    <>
      <ChannelContainer>
        <Header>CHANNELS</Header>
        <SearchChannel onSubmit={onSubmitChannelName}>
          <input
            title="searchInput"
            onChange={onChangeInput}
            value={findChannelName}
          />
          <SmallButton
            className="search"
            img_url={searchButton}
            type="submit"
          />
          <SmallButton
            className="create"
            img_url={createChannelButton}
            onClick={onClickCreatChennel}
          />
        </SearchChannel>
        <ChannelList>
          <Scrollbars autoHide>
            {filteredChannels?.map((channelInfo: ChannelsInfo) => {
              return (
                <div
                  className="eachChannel"
                  data-id={channelInfo.id}
                  data-status={channelInfo.status}
                  key={channelInfo.id}
                  onClick={onClickJoinChannel}
                >
                  <div className="channelName">
                    {channelInfo.status === ChannelStatus.PROTECTED && (
                      <img src={lockImg} />
                    )}
                    <div>
                      {channelInfo.title.length > 20
                        ? channelInfo.title.slice(0, 20) + "..."
                        : channelInfo.title}
                    </div>
                  </div>
                  <div className="ownerName">{channelInfo.nickname}</div>
                </div>
              );
            })}
          </Scrollbars>
        </ChannelList>
      </ChannelContainer>
      <Modal
        show={showCreateChannelModal}
        onCloseModal={onCloseCreateChannelModal}
        showCloseButton
        showInfoButton
        tooltipText="If you do not set password, public channel will be created."
      >
        <ModalChild onSubmit={onSubmitCreateChannel}>
          <Input
            className="ChannelName"
            type="text"
            name="title"
            placeholder="Channel Name"
            value={title}
            onChange={onChangeTitle}
          />
          <Input
            className="ChannelPassword"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={onChangePassword}
          />
          <SmallButton img_url={createChannelButton} type="submt" />
        </ModalChild>
      </Modal>
    </>
  );
};

export const MyChannels = ({
  myNickname,
  socket,
  popChatting,
  setPopChatting,
  channelId,
  setChannelId,
}: {
  myNickname: string;
  socket: Socket | undefined;
  popChatting: boolean;
  setPopChatting: React.Dispatch<React.SetStateAction<boolean>>;
  channelId: string;
  setChannelId: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const queryClient = useQueryClient();
  const myChannels: ChannelsInfo[] = useMyChannels().data;
  const onClickOpenChat = useCallback(async (e: any) => {
    e.preventDefault();
    const channelData = e.target.closest("[data-id]");
    setChannelId(channelData.getAttribute("data-id"));
    setPopChatting(true);
  }, []);

  const onNewMessage = useCallback(async (data: any) => {
    queryClient.invalidateQueries({ queryKey: ["myChannels"] });
    myChannels?.map((channel) => {
      if (channel.id === Number(data.channelId)) toast.success("asdf");
    });
  }, []);

  useEffect(() => {
    socket?.on("newMessage", onNewMessage);
    return () => {
      socket?.off("newMessage", onNewMessage);
    };
  });
  return (
    <>
      {popChatting ? (
        <Chatting
          socket={socket}
          channelId={channelId}
          setPopChatting={setPopChatting}
        />
      ) : (
        <ChannelContainer>
          <Header>CHATS</Header>
          <ChannelList>
            <Scrollbars autoHide>
              {myChannels?.map((channelInfo: ChannelsInfo, index: number) => {
                return (
                  <div
                    className="eachChannel"
                    data-id={channelInfo.id}
                    onClick={onClickOpenChat}
                    key={index}
                  >
                    <div className="channelName">
                      {
                        {
                          [ChannelStatus.PROTECTED]: <img src={lockImg} />,
                          [ChannelStatus.PRIVATE]: <img src={dmImg} />,
                          [ChannelStatus.PUBLIC]: <></>,
                        }[channelInfo.status]
                      }
                      <div>
                        {channelInfo.status === ChannelStatus.PRIVATE
                          ? channelInfo.title.replace(myNickname, "")
                          : channelInfo.title.length > 20
                            ? channelInfo.title.slice(0, 20) + "..."
                            : channelInfo.title}
                      </div>
                    </div>
                    {channelInfo.status !== ChannelStatus.PRIVATE && (
                      <div className="ownerName">{channelInfo.nickname}</div>
                    )}
                  </div>
                );
              })}
            </Scrollbars>
          </ChannelList>
        </ChannelContainer>
      )}
    </>
  );
};
