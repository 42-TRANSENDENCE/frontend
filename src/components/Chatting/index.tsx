import {
  ChatsContainer,
  ChatsBar,
  SendChatBar,
  ChatItem,
  ChatLists,
  ChatTitle,
} from "./styles";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useQueryClient } from "react-query";
import { UserInfo, useUserInfo } from "../../hooks/query/user";
import { useBlocklist } from '../../hooks/query/friend';
import { useGetChats, useChannelInfo } from "../../hooks/query/chat";
import { usePostChat, useSetChannelPassword } from "../../hooks/mutation/chat";
import { ChannelsInfo, ChannelStatus } from "../Channels/interface";
import { Socket } from "socket.io-client";
import { Scrollbars } from "react-custom-scrollbars";
import dayjs from "dayjs";
import { SmallButton, MiddleButton } from "../Button";
import closeButton from "../../assets/smallButton/modalCloseButton.svg";
import sendButton from "../../assets/smallButton/chatSendButton.svg";
import leaveButton from "../../assets/smallButton/leaveChannelButton.svg";
import lockButton from "../../assets/smallButton/channelLockButton.svg";
import outMember from "../../assets/outMember.svg";
import { toast } from "react-toastify";
import { ProfileProps } from '../Profile';
import {
  ChannelInfo,
  Chat,
  ChatData,
  ChatProps,
  Member,
  MemberType,
} from "./interface";
import ChatMenu from "./menu";

const ChatBubble = ({
  channelInfo,
  chat,
  isMe,
  idAvatarMap,
  socket,
  setPopProfile,
  setUser
}: ChatProps) => {
  const [popMenu, setPopMenu] = useState(false);
  const avatar = idAvatarMap.get(chat.senderUserId);

  const eachChat: Chat = {
    user: chat.senderUserNickname,
    imgSrc: avatar ? URL.createObjectURL(avatar) : outMember,
    content: chat.content,
    createdAt: chat.createdAt,
  };

  const onClickProfile = (): void => {
    console.log("profile clicked;");
    setPopMenu(!popMenu);
  };

  return (
    <ChatItem isMe={isMe}>
      {!isMe && (
        <div className="ChatProfile">
          <img
            src={eachChat.imgSrc}
            alt={eachChat.user}
            onClick={onClickProfile}
          />
        </div>
      )}

      {popMenu && (
        <ChatMenu
          userId={String(chat.senderUserId)}
          userNickname={chat.senderUserNickname}
          channelInfo={channelInfo}
          channelId={String(chat.channelId)}
          socket={socket}
          setPopMenu={setPopMenu}
          setPopProfile={setPopProfile}
          setUser={setUser}
        />
      )}

      <div className="ChatMain">
        {!isMe && <div>{eachChat.user}</div>}
        <div className="ChatBubble">{eachChat.content}</div>
        <span>
          {dayjs(eachChat.createdAt).locale("ko").format("MM.DD. ddd hh:mm a")}
        </span>
      </div>
    </ChatItem>
  );
};

const ChatBox = ({
  channelInfo,
  chats,
  userId,
  idAvatarMap,
  socket,
  setPopProfile,
  setUser
}: {
  channelInfo: ChannelInfo;
  chats: ChatData[];
  userId: number;
  idAvatarMap: Map<number, Blob>;
  socket: Socket | undefined;
  setPopProfile: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<ProfileProps | null>>;
}) => {
  return (
    <ChatLists>
      {chats?.map((chat, index) => {
        return (
          <div key={index}>
            <ChatBubble
              key={`chat-${index}`}
              channelInfo={channelInfo}
              chat={chat}
              isMe={chat.senderUserId === userId}
              idAvatarMap={idAvatarMap}
              socket={socket}
              setPopProfile={setPopProfile}
              setUser={setUser}
            />
          </div>
        );
      })}
    </ChatLists>
  );
};

export const Chatting = ({
  socket,
  channelId,
  setPopChatting,
  setPopProfile,
  setUser
}: {
  socket: Socket | undefined;
  channelId: string;
  setPopChatting: React.Dispatch<React.SetStateAction<boolean>>;
  setPopProfile: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<ProfileProps | null>>;
}) => {
  const userInfo: UserInfo = useUserInfo().data;
  const chats: ChatData[] = useGetChats(channelId).data;
  const channelInfo: ChannelInfo = useChannelInfo({
    id: channelId,
    setPopChatting: setPopChatting,
  }).data;
  useBlocklist().data;
  const postChat = usePostChat();
  const setChannelPassword = useSetChannelPassword();
  const [chat, setChat] = useState("");
  const queryClient = useQueryClient();
  const scrollbarRef = useRef<Scrollbars>(null);
  const idAvatarMap: Map<number, Blob> = new Map();

  if (channelInfo) {
    channelInfo.channelMembers?.map((member) => {
      const bufferObj: { type: "Buffer"; data: [] } = {
        type: member.avatar.type,
        data: member.avatar.data,
      };
      const uint8Array = new Uint8Array(bufferObj.data);
      const userAvatar = new Blob([uint8Array], {
        type: "application/octet-stream",
      });
      idAvatarMap.set(member.userId, userAvatar);
    });
  }

  const onClickClose = () => {
    setPopChatting(false);
  };

  const onClickLeave = async () => {
    socket?.emit("leaveChannel", {
      channelId: String(channelId),
      userId: String(userInfo.id),
    });
    toast.success("Successfully leaved channel");
    setPopChatting(false);
    await queryClient.invalidateQueries({ queryKey: ["allChannels"] });
    await queryClient.invalidateQueries({ queryKey: ["myChannels"] });
  };

  const onChangeChat = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      e.preventDefault();
      setChat(e.target.value);
    },
    []
  );

  function handleKeyPress(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!chat?.trim()) return;
      postChat.mutate({ id: channelId, chat: chat });
      setChat("");
    } else if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault();
      setChat((prevChat) => prevChat + "\n");
    }
  }

  const onSubmitChat = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!chat?.trim()) return;
      postChat.mutate({ id: channelId, chat: chat });
      setChat("");
    },
    [chat, postChat]
  );

  const onClickSetPassword = useCallback(() => {
    const pwd = prompt(
      "Enter password (leave it empty if you want to make this channel public)"
    );
    if (pwd !== null)
      setChannelPassword.mutate({ id: channelId, password: String(pwd) });
  }, [setChannelPassword]);

  const onMessage = useCallback(
    async (data: ChatData) => {
      const blocklist: number[] = await queryClient.fetchQuery({ queryKey: ["blocklist"] });
      if (
        Number(channelId) === data.channelId &&
        !blocklist?.includes(data.senderUserId)
      ) {
        queryClient.setQueryData(["getChats", channelId], (prevChats: any) => {
          return prevChats ? [...prevChats, data] : [data];
        });
      }
    },
    [channelId]
  );

  const onOutMember = useCallback(
    async (data: Member) => {
      if (Number(data.userId) === userInfo.id) {
        socket?.emit("leaveChannel", {
          channelId: data.channelId,
          userId: String(userInfo.id),
        });
        if (Number(channelId) === Number(data.channelId)) {
          toast.warning("You are kicked out from the channel");
          setPopChatting(false);
        }
      }
      queryClient.invalidateQueries({ queryKey: ["myChannels"] });
      queryClient.invalidateQueries({ queryKey: ["channelInfo"] });
    },
    [channelId]
  );

  const onInMember = useCallback(
    async (data: Member) => {
      queryClient.invalidateQueries({ queryKey: ["myChannels"] });
      queryClient.invalidateQueries({ queryKey: ["channelInfo"] });
    },
    [channelId]
  );

  const onMuteMember = useCallback(
    async (data: Member) => {
      if (Number(channelId) === Number(data.channelId)) {
        if (Number(data.userId) === userInfo.id)
          toast.warning("You are muted for 5 minutes");
      }
    },
    [channelId]
  );

  const onAdminMember = useCallback(
    async (data: Member) => {
      if (Number(channelId) === Number(data.channelId)) {
        if (Number(data.userId) === userInfo.id)
          toast.success("You are now administrator");
      }
    },
    [channelId]
  );

  const onRemoveChannel = useCallback(
    async (data: ChannelsInfo) => {
      if (Number(channelId) === data.id) setPopChatting(false);
    },
    [channelId]
  );

  useEffect(() => {
    scrollbarRef.current?.scrollToBottom();
  }, [chats]);

  useEffect(() => {
    socket?.emit("joinChannel", { channelId: String(channelId) });
    socket?.on("message", onMessage);
    socket?.on("outMember", onOutMember);
    socket?.on("inMember", onInMember);
    socket?.on("muteMember", onMuteMember);
    socket?.on("adminMember", onAdminMember);
    socket?.on("removeChannel", onRemoveChannel);
    return () => {
      socket?.off("message", onMessage);
      socket?.off("outMember", onOutMember);
      socket?.off("inMember", onInMember);
      socket?.off("muteMember", onMuteMember);
      socket?.off("adminMember", onAdminMember);
      socket?.off("removeChannel", onRemoveChannel);
    };
  }, [socket, channelId]);

  return (
    <ChatsContainer>
      <ChatTitle>
        <p className="Title">
          {channelInfo?.channelStatus === ChannelStatus.PRIVATE
            ? `${channelInfo?.title.replace(userInfo.nickname, "")}`
            : `${channelInfo?.title} (🧑‍💼${channelInfo?.howmany.joinMembers})`}
        </p>
        <div className="Buttons">
          {channelInfo?.myType === MemberType.OWNER && (
            <SmallButton img_url={lockButton} onClick={onClickSetPassword} />
          )}
          <SmallButton img_url={closeButton} onClick={onClickClose} />
          <SmallButton img_url={leaveButton} onClick={onClickLeave} />
        </div>
      </ChatTitle>

      <ChatsBar>
        <Scrollbars autoHide ref={scrollbarRef}>
          <ChatBox
            channelInfo={channelInfo}
            chats={chats}
            userId={userInfo?.id}
            idAvatarMap={idAvatarMap}
            socket={socket}
            setPopProfile={setPopProfile}
            setUser={setUser}
          />
        </Scrollbars>
      </ChatsBar>

      <SendChatBar onSubmit={onSubmitChat}>
        <textarea
          onChange={onChangeChat}
          onKeyPress={handleKeyPress}
          value={chat}
          autoFocus={true}
          title="chat"
          maxLength={100}
          disabled={false}
        />
        <MiddleButton img_url={sendButton} onClick={onSubmitChat} />
      </SendChatBar>
    </ChatsContainer>
  );
};
