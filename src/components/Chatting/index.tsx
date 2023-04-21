import {
  ChatsContainer,
  ChatsBar,
  SendChatBar,
  ChatItem,
  ChatLists,
  ChatsMenuContainer,
  ChatTitle,
} from "./styles";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useQueryClient } from "react-query";
import { UserInfo, useUserInfo } from "../../hooks/query/user";
import { useGetChats, useChannelInfo } from "../../hooks/query/chat";
import {
  usePostChat,
  useSetChannelPassword,
  useAdmin,
  useBan,
  useKick,
  useMute,
} from "../../hooks/mutation/chat";
import { ChannelsInfo } from "../Channels/interface";
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
import {
  ChannelInfo,
  Chat,
  ChatData,
  ChatProps,
  Member,
  MemberType,
} from "./interface";

const ChatMenu = ({
  userId,
  channelInfo,
  channelId,
  socket,
  setPopMenu,
}: {
  userId: string;
  channelInfo: ChannelInfo;
  channelId: string;
  socket: Socket | undefined;
  setPopMenu: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const admin = useAdmin();
  const kick = useKick();
  const ban = useBan();
  const mute = useMute();
  const isMember = channelInfo.channelMembers
    ?.map((member) => String(member.userId) === userId)
    .includes(true);

  const onAdminOther = () => {
    admin.mutate({ id: channelId, user: userId, socket: socket });
    setPopMenu(false);
  };
  const onKickOther = () => {
    kick.mutate({ id: channelId, user: userId, socket: socket });
    setPopMenu(false);
  };
  const onBanOther = () => {
    ban.mutate({ id: channelId, user: userId, socket: socket });
    setPopMenu(false);
  };
  const onMuteOther = () => {
    mute.mutate({ id: channelId, user: userId, socket: socket });
    setPopMenu(false);
  };

  useEffect(() => {
    console.log(channelInfo.myType);
  });

  const OwnerRoll = (): JSX.Element => {
    return (
      <>
        <div onClick={onAdminOther}>Grant Admin</div>
        <div onClick={onKickOther}>Kick</div>
        <div onClick={onBanOther}>Ban</div>
        <div onClick={onMuteOther}>Mute</div>
      </>
    );
  };

  const AdminRoll = (): JSX.Element => {
    return (
      <>
        {channelInfo.channelMembers?.map((member) => {
          if (
            String(member.userId) === userId &&
            member.type === MemberType.OWNER
          )
            return <div>Channel Owner</div>;
          else if (String(member.userId) === userId)
            return (
              <>
                <div onClick={onKickOther}>Kick</div>
                <div onClick={onBanOther}>Ban</div>
                <div onClick={onMuteOther}>Mute</div>
              </>
            );
          return null;
        })}
      </>
    );
  };

  const MemberRoll = (): JSX.Element => {
    return (
      <>
        {channelInfo.channelMembers?.map((member) => {
          return String(member.userId) === userId
            ? {
                [MemberType.OWNER]: <div>Channel Owner</div>,
                [MemberType.ADMIN]: <div>Channel Administrator</div>,
                [MemberType.MEMBER]: <div>Channel Member</div>,
              }[member.type]
            : null;
        })}
      </>
    );
  };

  return (
    <ChatsMenuContainer>
      {isMember ? (
        {
          [MemberType.OWNER]: <OwnerRoll />,
          [MemberType.ADMIN]: <AdminRoll />,
          [MemberType.MEMBER]: <MemberRoll />,
        }[channelInfo.myType]
      ) : (
        <div>Out Member</div>
      )}
    </ChatsMenuContainer>
  );
};

const ChatBubble = ({
  channelInfo,
  chat,
  isMe,
  idAvatarMap,
  socket,
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
          channelInfo={channelInfo}
          channelId={String(chat.channelId)}
          socket={socket}
          setPopMenu={setPopMenu}
        />
      )}

      <div className="ChatMain">
        {!isMe && <span>{eachChat.user}</span>}
        <div className="ChatBubble">{eachChat.content}</div>
        <span>{dayjs(eachChat.createdAt).locale("ko").format("hh:mm a")}</span>
      </div>
      {/* <ChatMain isMe={isMe} >
        {!isMe && eachChat.user}
        <ChatBubbled isMe={isMe} style={{ whiteSpace: 'pre-wrap' }} >
          {eachChat.content}
        </ChatBubbled>
        <span>{dayjs(eachChat.createdAt).locale('ko').format('hh:mm a')}</span>
      </ChatMain> */}
    </ChatItem>
  );
};

const ChatBox = ({
  channelInfo,
  chats,
  userId,
  idAvatarMap,
  socket,
}: {
  channelInfo: ChannelInfo;
  chats: ChatData[];
  userId: number;
  idAvatarMap: Map<number, Blob>;
  socket: Socket | undefined;
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
}: {
  socket: Socket | undefined;
  channelId: string;
  setPopChatting: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const userInfo: UserInfo = useUserInfo().data;
  const chats: ChatData[] = useGetChats(channelId).data;
  const channelInfo: ChannelInfo = useChannelInfo(channelId).data;
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
    // socket?.emit('closeChannel', { 'channelId': String(channelId) });
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
      if (Number(channelId) === data.channelId) {
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
        queryClient.invalidateQueries({ queryKey: ["myChannel"] });
        queryClient.invalidateQueries({ queryKey: ["channelInfo"] });
      }
    },
    [channelId]
  );

  const onInMember = useCallback(
    async (data: Member) => {
      queryClient.invalidateQueries({ queryKey: ["myChannel"] });
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
        <p className="Title">Chat Title (n/m)</p>
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
