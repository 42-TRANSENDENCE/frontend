import { ChatsContainer, ChatsBar, SendChatBar, ChatItem, ChatProfile, ChatBubbled, ChatMain, ChatLists, ChatsMenuContainer } from './styles';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useQueryClient } from 'react-query';
import { UserInfo, useUserInfo } from '../../hooks/query/user';
import { useGetChats, useChannelInfo } from '../../hooks/query/chat';
import { usePostChat, useSetChannelPassword, useAdmin, useBan, useKick, useMute } from '../../hooks/mutation/chat';
import { ChannelStatus } from '../Channels';
import { Socket } from 'socket.io-client';
import { Scrollbars } from 'react-custom-scrollbars';
import dayjs from 'dayjs';
import { SmallButton, MiddleButton } from '../Button';
import closeButton from '../../assets/smallButton/modalCloseButton.svg';
import sendButton from '../../assets/smallButton/chatSendButton.svg';
import leaveButton from '../../assets/smallButton/leaveChannelButton.svg';
import lockButton from '../../assets/smallButton/channelLockButton.svg';
import outMember from '../../assets/outMember.svg';
import { toast } from 'react-toastify';

enum MemberType {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER'
}

interface ChannelMembers {
  userId: number;
  channelId: number;
  nickname: string;
  type: MemberType;
  avatar: any;
}

interface ChannelInfo {
  channelStatus: ChannelStatus;
  channelMembers: ChannelMembers[];
  myType: MemberType;
}

interface ChatData {
  channelId: number;
  content: string;
  createdAt: string;
  id: number;
  senderUserId: number;
  senderUserNickname: string;
}

interface Chat {
  user: string;
  imgSrc: string;
  content: string;
  createdAt: string;
}

interface ChatProps {
  channelInfo: ChannelInfo;
  chat: ChatData;
  isMe: boolean;
  idAvatarMap: Map<number, Blob>;
  socket: Socket | undefined;
}

interface Member {
  id: number;
}

const ChatMenu = ({ userId, channelInfo, channelId, socket, setPopMenu }: { userId: string, channelInfo: ChannelInfo, channelId: string, socket: Socket | undefined, setPopMenu: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const admin = useAdmin();
  const kick = useKick();
  const ban = useBan();
  const mute = useMute();
  const isMember = channelInfo.channelMembers?.map((member) => String(member.userId) === userId).includes(true);

  const onAdminOther = () => {
    admin.mutate({ id: channelId, user: userId, socket: socket });
    setPopMenu(false);
  }
  const onKickOther = () => {
    kick.mutate({ id: channelId, user: userId, socket: socket });
    setPopMenu(false);
  }
  const onBanOther = () => {
    ban.mutate({ id: channelId, user: userId, socket: socket });
    setPopMenu(false);
  }
  const onMuteOther = () => {
    mute.mutate({ id: channelId, user: userId, socket: socket });
    setPopMenu(false);
  }

  return (
    <ChatsMenuContainer>
      {!isMember ? <div>Out Member</div> :
        channelInfo.myType === MemberType.OWNER ? (
          <>
            <div onClick={onAdminOther}>Grant Admin</div>
            <div onClick={onKickOther}>Kick</div>
            <div onClick={onBanOther}>Ban</div>
            <div onClick={onMuteOther}>Mute</div>
          </>
        ) : (
          channelInfo.myType === MemberType.ADMIN ? (
            <>
              {channelInfo.channelMembers?.map((member) => {
                if (String(member.userId) === userId && member.type === MemberType.OWNER)
                  return (<div>Channel Owner</div>);
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
          ) : (
            <>
              {channelInfo.channelMembers?.map((member) => {
                if (String(member.userId) === userId && member.type === MemberType.OWNER)
                  return (<div>Channel Owner</div>);
                else if (String(member.userId) === userId && member.type === MemberType.ADMIN)
                  return (<div>Channel Administrator</div>);
                else if (String(member.userId) === userId && member.type === MemberType.MEMBER)
                  return (<div>Channel Member</div>);
                return null;
              })}
            </>
          )
        )}
    </ChatsMenuContainer>
  );
}

const ChatBubble = ({ channelInfo, chat, isMe, idAvatarMap, socket }: ChatProps) => {
  const [popMenu, setPopMenu] = useState(false);
  const avatar = idAvatarMap.get(chat.senderUserId);


  const eachChat: Chat = {
    user: chat.senderUserNickname,
    imgSrc: avatar ? URL.createObjectURL(avatar) : outMember,
    content: chat.content,
    createdAt: chat.createdAt
  };

  const onClickProfile = () => {
    setPopMenu((prev) => !prev);
  };

  return (
    <ChatItem isMe={isMe} >
      {!isMe && (
        <ChatProfile>
          <img src={eachChat.imgSrc} alt={eachChat.user} onClick={onClickProfile} />
        </ChatProfile>
      )}
      {popMenu && (
        <ChatMenu userId={String(chat.senderUserId)} channelInfo={channelInfo} channelId={String(chat.channelId)} socket={socket} setPopMenu={setPopMenu} />
      )}
      <ChatMain isMe={isMe} >
        {!isMe && (<span>{eachChat.user}</span>)}
        <ChatBubbled isMe={isMe} style={{ whiteSpace: 'pre-wrap' }} >
          {eachChat.content}
        </ChatBubbled>
        <span>{dayjs(eachChat.createdAt).locale('ko').format('hh:mm a')}</span>
      </ChatMain>
    </ChatItem>
  )
};

const ChatBox = ({ channelInfo, chats, userId, idAvatarMap, socket }: { channelInfo: ChannelInfo, chats: ChatData[], userId: number, idAvatarMap: Map<number, Blob>, socket: Socket | undefined }) => {

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
        )
      })}
    </ChatLists>
  );
};

export const Chatting = ({ socket, channelId, setPopChatting }: { socket: Socket | undefined, channelId: string, setPopChatting: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const userInfo: UserInfo = useUserInfo().data;
  const chats: ChatData[] = useGetChats(channelId).data;
  const channelInfo: ChannelInfo = useChannelInfo(channelId).data;
  const postChat = usePostChat();
  const setChannelPassword = useSetChannelPassword();
  const [chat, setChat] = useState('');
  const queryClient = useQueryClient();
  const scrollbarRef = useRef<Scrollbars>(null);
  const idAvatarMap: Map<number, Blob> = new Map();


  if (channelInfo) {
    channelInfo.channelMembers?.map((member) => {
      const bufferObj: { type: 'Buffer', data: [] } = { type: member.avatar.type, data: member.avatar.data };
      const uint8Array = new Uint8Array(bufferObj.data);
      const userAvatar = new Blob([uint8Array], { type: 'application/octet-stream' });
      idAvatarMap.set(member.userId, userAvatar);
    })
  }

  const onClickClose = () => {
    socket?.emit('closeChannel', { 'channelId': String(channelId) });
    setPopChatting(false);
  }

  const onClickLeave = async () => {
    socket?.emit('leaveChannel', { 'channelId': String(channelId), 'userId': String(userInfo.id) });
    await queryClient.invalidateQueries({ queryKey: ['myChannels'] });
    await queryClient.invalidateQueries({ queryKey: ['allChannels'] });
    toast.success('Successfully leaved channel');
    setPopChatting(false);
  }

  const onChangeChat = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setChat(e.target.value);
  }, []);

  function handleKeyPress(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!chat?.trim()) return;
      postChat.mutate({ id: channelId, chat: chat });
      setChat('');
    } else if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault();
      setChat((prevChat) => prevChat + '\n');
    }
  }

  const onSubmitChat = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!chat?.trim()) return;
    postChat.mutate({ id: channelId, chat: chat });
    setChat('');
  }, [chat, postChat]);

  const onClickSetPassword = useCallback(() => {
    const pwd = prompt('Enter password (leave it empty if you want to make this channel public)');
    if (pwd !== null)
      setChannelPassword.mutate({ id: channelId, password: String(pwd) });
  }, [setChannelPassword]);

  useEffect(() => {
    scrollbarRef.current?.scrollToBottom();
  }, [chats]);

  const onMessage = useCallback(async (data: ChatData) => {
    queryClient.setQueryData(['getChats', channelId], (prevChats: any) => {
      return prevChats ? [...prevChats, data] : [data];
    })
  }, [channelId]);

  const onOutMember = useCallback(async (data: any) => {
    if (Number(data.id) === userInfo.id) {
      toast.warning('You are kicked out from the channel');
      socket?.emit('leaveChannel', { 'channelId': channelId, 'userId': String(userInfo.id) });
      setPopChatting(false);
      queryClient.invalidateQueries({ queryKey: ['myChannel'] });
    }
    queryClient.invalidateQueries({ queryKey: ['channelInfo'] });
  }, [channelId]);

  const onMuteMember = useCallback(async (data: any) => {
    if (Number(data.id) === userInfo.id)
      toast.warning('You are muted for 5 minutes');
  }, [channelId]);

  const onAdminMember = useCallback(async (data: any) => {
    if (Number(data.id) === userInfo.id)
      toast.success('You are now administrator');
  }, [channelId]);

  const onRemoveChannel = useCallback(async (data: Member) => {
    if (Number(channelId) === data.id)
      setPopChatting(false);
  }, [channelId]);

  useEffect(() => {
    socket?.emit('joinChannel', { 'channelId': String(channelId) });
    socket?.on('message', onMessage);
    socket?.on('outMember', onOutMember);
    socket?.on('muteMember', onMuteMember);
    socket?.on('adminMember', onAdminMember);
    socket?.on('removeChannel', onRemoveChannel);
    return () => {
      socket?.off('message', onMessage);
      socket?.off('outMember', onOutMember);
      socket?.off('muteMember', onMuteMember);
      socket?.off('adminMember', onAdminMember);
      socket?.off('removeChannel', onRemoveChannel);
    }
  }, [socket, channelId]);

  return (
    <ChatsContainer>
      <div className='Button'>
        <SmallButton img_url={closeButton} onClick={onClickClose} />
        <SmallButton img_url={leaveButton} onClick={onClickLeave} />
        {channelInfo?.myType === MemberType.OWNER && (
          <SmallButton img_url={lockButton} onClick={onClickSetPassword} />
        )}
      </div>
      <ChatsBar>
        <Scrollbars autoHide ref={scrollbarRef}>
          <ChatBox channelInfo={channelInfo} chats={chats} userId={userInfo.id} idAvatarMap={idAvatarMap} socket={socket} />
        </Scrollbars>
      </ChatsBar>
      <SendChatBar onSubmit={onSubmitChat} >
        <textarea
          onChange={onChangeChat}
          onKeyPress={handleKeyPress}
          value={chat}
          autoFocus={true}
          title='chat'
          maxLength={100}
          disabled={false}
        />
        <MiddleButton img_url={sendButton} onClick={onSubmitChat} />
      </SendChatBar>
    </ChatsContainer>
  )
}
