import { Scrollbars } from 'react-custom-scrollbars';
import styled from 'styled-components';
import ChatList from '../../../components/ChatList';
import ChatRoom from '../../../components/ChatRoom';
import OnlineList from '../../../components/OnlineList';
import Title from '../../../components/Title';
import { Container } from '../../LogIn/styles';

export const Design = () => {
  return (
    <>
      {/* <Container>
        <div className="Title">
          <Title title="PONG CHAT" home search />
        </div>
        <div className="Body" style={{ gap: '1rem' }}>
          <div style={{ flex: 1 }}>
            <OnlineList />
          </div>
          <div style={{ flex: 1.85 }}>
            <ChatList />
          </div>
          <div style={{ flex: 1 }}>
            <ChatRoom />
          </div>
        </div>
      </Container> */}
    </>
  );
};
