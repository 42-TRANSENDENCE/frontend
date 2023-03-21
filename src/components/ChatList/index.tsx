import {
  ChatBubble,
  // ChatBubbleTail,
  ChatItem,
  ChatLists,
  ChatMain,
  ChatProfile,
} from './styles';
import chatSendButtonUrl from '../../assets/smallButton/chatSendButton.svg';
import { useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import React from 'react';

const ChatsData = [
  {
    imgSrc: 'https://via.placeholder.com/50',
    name: 'me',
    content:
      '  Hi there!Hi there!Hi there!Hi there!Hi there!Hi there!Hithere!Hi there! Hi there!Hi there!Hi there!Hi there!Hi there!Hithere! Hi there!Hi there!Hi there!Hi there!Hi there!Hi there!Hithere!Hi there!Hi there!Hi there!Hi there!Hi there!Hi there! Hithere!Hi there! Hi there! Hi there!',
  },
  {
    imgSrc: 'https://via.placeholder.com/50',
    name: 'other1',
    content:
      'zip your mouth up!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
  },
  {
    imgSrc: 'https://via.placeholder.com/50',
    name: 'me',
    content: 'Yes sir!',
  },
];

const ChatListComponent = React.memo(({ chatList }: { chatList: any }) => {
  return (
    <ChatLists>
      {chatList.map((chatData: any) => (
        <ChatItem other={chatData.name !== 'me'}>
          <ChatProfile>
            <img src={chatData.imgSrc} alt="User profile" />
          </ChatProfile>
          <ChatMain>
            <span>{chatData.name}</span>
            <ChatBubble
              other={chatData.name !== 'me'}
              style={{ whiteSpace: 'pre-wrap' }}
            >
              {chatData.content}
            </ChatBubble>
          </ChatMain>
        </ChatItem>
      ))}
    </ChatLists>
  );
});

const ChatList = ({ Flex }: { Flex: number }) => {
  const [chat, setChat] = useState('');
  const [chatList, setChatList] = useState(ChatsData);

  const onChangeChat = (e: any) => {
    setChat(e.target.value);
  };

  const onSubumitChat = (e: any) => {
    e.preventDefault();
    if (!chat?.trim()) return;
    // console.log(chat);
    /** nickname을 이용한 Chat 위치 */
    setChatList([
      ...chatList,
      { imgSrc: 'https://via.placeholder.com/50', name: 'me', content: chat },
    ]);
    setChat('');
  };

  function handleKeyDown(event: any) {
    if (event.keyCode === 13 && !event.shiftKey) {
      // Submit the form
      event.preventDefault();
      setChatList([
        ...chatList,
        { imgSrc: 'https://via.placeholder.com/50', name: 'me', content: chat },
      ]);
      setChat('');
    } else if (event.keyCode === 13 && event.shiftKey) {
      // Add a new line
      event.preventDefault();
      setChat((prevChat) => prevChat + '\n');
    }
  }

  return (
    <div
      style={{
        flex: Flex,
        borderRadius: '2rem',
        border: '0.3rem solid black',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <div style={{ flex: 9 }}>
        <Scrollbars>
          {/* <ChatLists>
            {chatList.map((chatData) => (
              <ChatItem other={chatData.name !== 'me'}>
                <ChatProfile>
                  <img src={chatData.imgSrc} alt="User profile" />
                </ChatProfile>
                <ChatMain>
                  <span>{chatData.name}</span>
                  <ChatBubble
                    other={chatData.name !== 'me'}
                    style={{ whiteSpace: 'pre-wrap' }}
                  >
                    {chatData.content}
                  </ChatBubble>
                </ChatMain>
              </ChatItem>
            ))}
          </ChatLists> */}
          <ChatListComponent chatList={chatList} />
        </Scrollbars>
      </div>
      <form
        style={{
          flex: 1,
          width: '100%',
          display: 'flex',
          marginBottom: '1rem',
        }}
        onSubmit={onSubumitChat}
      >
        <textarea
          style={{
            flex: 8,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '2rem',
            border: '0.3rem solid black',
            padding: '1rem',
            overflow: 'hidden',
            resize: 'none',
          }}
          onChange={onChangeChat}
          onKeyDown={handleKeyDown}
          value={chat}
        ></textarea>
        <div
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <button
            style={{
              padding: '0.5rem',
              borderRadius: '1rem',
              backgroundColor: '#FCF451',
              border: '0.3rem solid black',
              width: '4rem',
              height: '4rem',
            }}
            onClick={onSubumitChat}
          >
            <img
              src={chatSendButtonUrl}
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatList;
