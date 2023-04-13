import { ChatsContainer, ChatsBar, SendChatBar, GoBackBar } from './styles';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';
import { Scrollbars } from 'react-custom-scrollbars';
import { ChatListContainer } from '../ChatList/styles';
import { SmallButton } from '../Button';
import closeButton from '../../assets/smallButton/modalCloseButton.svg';

const Chatting = ({ socket, setPopChatting }: { socket: Socket | undefined, setPopChatting: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const onClickClose = () => {
    setPopChatting(false);
  }

  return (
    <ChatsContainer>
      <div className='Button'>
        <SmallButton img_url={closeButton} onClick={onClickClose} />
      </div>
      <ChatsBar>
        <Scrollbars autoHide>
        </Scrollbars>
      </ChatsBar>
      <SendChatBar>
        <textarea />
      </SendChatBar>
      <GoBackBar>
      </GoBackBar>
    </ChatsContainer>
  )
}

export default Chatting;
