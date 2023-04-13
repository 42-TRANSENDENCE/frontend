import { ChatsContainer, ChatsBar, SendChatBar, GoBackBar, ChatItem, ChatBubble, ChatProfile, ChatMain, ChatLists } from './styles';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useGetChats } from '../../hooks/query/chat';
import { usePostChat } from '../../hooks/mutation/chat';
import { Socket } from 'socket.io-client';
import { Scrollbars } from 'react-custom-scrollbars';
import dayjs from 'dayjs';
import { ChatListContainer } from '../ChatList/styles';
import { SmallButton, MiddleButton } from '../Button';
import closeButton from '../../assets/smallButton/modalCloseButton.svg';
import sendButton from '../../assets/smallButton/chatSendButton.svg';

interface ChatData {
  channelId: number;
  content: string;
  createdAt: string;
  id: number;
  senderUserId: number;
}

interface Chat {
  user: string;
  imgSrc: string;
  chat: string;
  createdAt: string;
}

const EachChat = React.memo(function EachChat({
  index,
  chatData,
  roomDatas,
  myUser,
  roomId,
}: EachChatProps) {
  const [selectedChatProfile, setSelectedChatProfile] =
    useState<boolean>(false);

  const handleChatProfileClick = useCallback((e: any) => {
    e.stopPropagation();
    setSelectedChatProfile((prev) => !prev);
  }, []);

  const isOther = chatData.user !== myUser.username;

  return (
    <ChatItem other={isOther} key={index}>
      <ChatProfile>
        <img
          src={chatData.imgSrc}
          alt="User profile"
          onClick={handleChatProfileClick}
        />
      </ChatProfile>
      {selectedChatProfile && (
        <ChatsMenu
          username={chatData.user}
          roomDatas={roomDatas}
          myUser={myUser}
          roomId={roomId}
        />
      )}
      <ChatMain other={isOther}>
        <span>{chatData.user}</span>
        <span>{dayjs(chatData.createdAt).format('h:mm:ss a')}</span>
        <ChatBubble other={isOther} style={{ whiteSpace: 'pre-wrap' }}>
          {chatData.chat}
        </ChatBubble>
      </ChatMain>
    </ChatItem>
  );
});

export const ChatList = ({ socket, channelId }: { socket: Socket | undefined, channelId: string }) => {
  const chatData = useGetChats(channelId);
  const chats: ChatData[] = chatData.data;

  const chatsByDate = useMemo(() => {
    const obj: { [key: string]: Chat[] } = {};
    chats.forEach((chat: ChatData) => {
      const date = dayjs(chat.createdAt);
      const key = date.format('YYYY-MM-DD');
      if (!(key in obj)) {
        obj[key] = [{ ...chat, hms: date.format('h:mm:ss a') }];
      } else {
        obj[key].push({ ...chat, hms: date.format('h:mm:ss a') });
      }
    });
    return obj;
  }, [chats]);

  const sortedDates = useMemo(() => {
    return Object.keys(chatsByDate).sort();
  }, [chatsByDate]);

  const weekDays: { [key: string]: string } = useMemo(
    () => ({
      Sunday: '일',
      Monday: '월',
      Tuesday: '화',
      Wednesday: '수',
      Thursday: '목',
      Friday: '금',
      Saturday: '토',
    }),
    []
  );
  return (
    <ChatLists>
      {obj.map((obj_key, index) => {
        const week = weekDays[dayjs(obj_key).locale('ko').format('dddd')];

        return (
          <div key={index}>
            <div className="YYYY_MM_DD">
              <div>
                {obj_key} {week}
              </div>
            </div>
            {obj[obj_key].map((chatData, index2) => {
              return (
                <EachChat
                  key={index2}
                  index={index2}
                  chatData={chatData}
                  roomDatas={roomDatas}
                  myUser={myUser}
                  roomId={roomId}
                />
              );
            })}
          </div>
        );
      })}
      <></>
    </ChatLists>
  );
}

export const Chatting = ({ socket, channelId, setPopChatting }: { socket: Socket | undefined, channelId: string, setPopChatting: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const postChat = usePostChat();
  const [chat, setChat] = useState('');

  const onClickClose = () => {
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
    setChat('');
  }, [chat, postChat]);

  return (
    <ChatsContainer>
      <div className='Button'>
        <SmallButton img_url={closeButton} onClick={onClickClose} />
      </div>
      <ChatsBar>
        <Scrollbars autoHide>
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
