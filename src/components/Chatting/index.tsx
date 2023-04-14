import { ChatsContainer, ChatsBar, SendChatBar, GoBackBar, ChatItem, ChatProfile, ChatBubbled, ChatMain, ChatLists } from './styles';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useUserInfo, useChatUserInfo } from '../../hooks/query/user';
import { useGetChats } from '../../hooks/query/chat';
import { usePostChat } from '../../hooks/mutation/chat';
import { Socket } from 'socket.io-client';
import { Scrollbars } from 'react-custom-scrollbars';
import dayjs from 'dayjs';
import { ChatListContainer } from '../ChatList/styles';
import { SmallButton, MiddleButton } from '../Button';
import closeButton from '../../assets/smallButton/modalCloseButton.svg';
import sendButton from '../../assets/smallButton/chatSendButton.svg';
import leaveButton from '../../assets/smallButton/leaveChannelButton.svg';

interface ChatData {
  channelId: number;
  content: string;
  createdAt: string;
  id: number;
  avatar: Uint8Array;
  senderUserId: number;
  senderUserNickname: string;
}

interface Chat {
  user: string;
  imgSrc: string;
  content: string;
  createdAt: string;
}

// const EachChat = React.memo(function EachChat({
//   index,
//   chatData,
//   roomDatas,
//   myUser,
//   roomId,
// }: EachChatProps) {
//   const [selectedChatProfile, setSelectedChatProfile] =
//     useState<boolean>(false);

//   const handleChatProfileClick = useCallback((e: any) => {
//     e.stopPropagation();
//     setSelectedChatProfile((prev) => !prev);
//   }, []);

//   const isOther = chatData.user !== myUser.username;

//   return (
//     <ChatItem other={isOther} key={index}>
//       <ChatProfile>
//         <img
//           src={chatData.imgSrc}
//           alt="User profile"
//           onClick={handleChatProfileClick}
//         />
//       </ChatProfile>
//       {selectedChatProfile && (
//         <ChatsMenu
//           username={chatData.user}
//           roomDatas={roomDatas}
//           myUser={myUser}
//           roomId={roomId}
//         />
//       )}
//       <ChatMain other={isOther}>
//         <span>{chatData.user}</span>
//         <span>{dayjs(chatData.createdAt).format('h:mm:ss a')}</span>
//         <ChatBubble other={isOther} style={{ whiteSpace: 'pre-wrap' }}>
//           {chatData.chat}
//         </ChatBubble>
//       </ChatMain>
//     </ChatItem>
//   );
// });

// export const ChatList = ({ socket, channelId }: { socket: Socket | undefined, channelId: string }) => {
//   const chatData = useGetChats(channelId);
//   const chats: ChatData[] = chatData.data;

//   const chatsByDate = useMemo(() => {
//     const obj: { [key: string]: Chat[] } = {};
//     chats.forEach((chat: ChatData) => {
//       const date = dayjs(chat.createdAt);
//       const key = date.format('YYYY-MM-DD');
//       if (!(key in obj)) {
//         obj[key] = [{ ...chat, hms: date.format('h:mm:ss a') }];
//       } else {
//         obj[key].push({ ...chat, hms: date.format('h:mm:ss a') });
//       }
//     });
//     return obj;
//   }, [chats]);

//   const sortedDates = useMemo(() => {
//     return Object.keys(chatsByDate).sort();
//   }, [chatsByDate]);

//   const weekDays: { [key: string]: string } = useMemo(
//     () => ({
//       Sunday: '일',
//       Monday: '월',
//       Tuesday: '화',
//       Wednesday: '수',
//       Thursday: '목',
//       Friday: '금',
//       Saturday: '토',
//     }),
//     []
//   );
//   return (
//     <ChatLists>
//       {obj.map((obj_key, index) => {
//         const week = weekDays[dayjs(obj_key).locale('ko').format('dddd')];

//         return (
//           <div key={index}>
//             <div className="YYYY_MM_DD">
//               <div>
//                 {obj_key} {week}
//               </div>
//             </div>
//             {obj[obj_key].map((chatData, index2) => {
//               return (
//                 <EachChat
//                   key={index2}
//                   index={index2}
//                   chatData={chatData}
//                   roomDatas={roomDatas}
//                   myUser={myUser}
//                   roomId={roomId}
//                 />
//               );
//             })}
//           </div>
//         );
//       })}
//       <></>
//     </ChatLists>
//   );
// }

interface ChatProps {
  chat: ChatData;
  isMe: boolean;
}

const ChatBubble = ({ chat, isMe }: ChatProps) => {
  // const userInfo = useChatUserInfo(chat.senderUserNickname).data;
  // const bufferObj: { type: "Buffer", data: [] } = { type: chat.avatar.type, data: userInfo?.avatar.data };
  // const uint8Array = new Uint8Array(bufferObj.data);
  const userAvatar  = new Blob([chat.avatar], { type: "application/octet-stream" });
  const eachChat: Chat = {
    user: chat.senderUserNickname,
    imgSrc: URL.createObjectURL(userAvatar),
    content: chat.content,
    createdAt: chat.createdAt
  };

  return (
    <ChatItem isMe={isMe} >
      {!isMe && (
        <ChatProfile>
          <img src={eachChat.imgSrc} alt={eachChat.user} />
        </ChatProfile>
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

const ChatBox = ({ chats }: { chats: ChatData[] }) => {
  const userInfo = useUserInfo().data;
  
  return (
    <ChatLists>
      {chats?.map((chat, index) => {
        return (
          <div key={index}>
            <ChatBubble 
              key={`chat-${index}`}
              chat={chat}
              isMe={chat.senderUserId === userInfo.id}
            />
          </div>
      )})}
    </ChatLists>
  );
};

export const Chatting = ({ socket, channelId, setPopChatting }: { socket: Socket | undefined, channelId: string, setPopChatting: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const userInfo = useUserInfo().data;
  const postChat = usePostChat();
  const [chat, setChat] = useState('');
  const chatData = useGetChats(channelId);
  const chats: ChatData[] = chatData.data;
  const queryClient = useQueryClient();

  const onClickClose = () => {
    socket?.emit('closeChannel', {'channelId': String(channelId)});
    setPopChatting(false);
  }

  const onClickLeave = () => {
    socket?.emit('leaveChannel', {'channelId': String(channelId), 'userId': String(userInfo.id)});
    queryClient.invalidateQueries({ queryKey: ['myChannels'] });
    setPopChatting(false);
  }

  const onChangeChat = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setChat(e.target.value);
  }, []);

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
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

  const onSubmitChat = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!chat?.trim()) return;
    postChat.mutate({ id: channelId, chat: chat });
    // queryClient.setQueryData(['getChats'], () => {
    //   return [...chats, chat];
    // });
    queryClient.invalidateQueries({ queryKey: ['getChats'] });
    setChat('');
  }, [chat, postChat]);

  const onMessage = useCallback(async (data: ChatData) => {
    console.log(data.content);
    // queryClient.setQueryData(['getChats'], () => {
    //   return [...chats, data];
    // });
    queryClient.invalidateQueries({ queryKey: ['getChats'] });
  }, []);

  useEffect(() => {
    socket?.on('message', onMessage);
    socket?.emit('joinChannel', {'channelId:': String(channelId)});
    return () => {
      socket?.off('message', onMessage);
      // socket?.emit('closeChannel', {'channelId:': String(channelId)});
    }
  }, []);

  return (
    <ChatsContainer>
      <div className='Button'>
        <SmallButton img_url={closeButton} onClick={onClickClose} />
        <SmallButton img_url={leaveButton} onClick={onClickLeave} />
      </div>
      <ChatsBar>
        <Scrollbars autoHide>
          <ChatBox chats={chats} />
        </Scrollbars>
      </ChatsBar>
      <SendChatBar onSubmit={onSubmitChat} >
        <textarea
          onChange={onChangeChat}
          onKeyDown={handleKeyDown}
          value={chat}
          autoFocus={true}
          title='chat'
          maxLength={100}
          disabled={false}
        />
        <MiddleButton img_url={sendButton} onClick={onSubmitChat} />
      </SendChatBar>
      {/* <GoBackBar>
      </GoBackBar> */}
    </ChatsContainer>
  )
}
