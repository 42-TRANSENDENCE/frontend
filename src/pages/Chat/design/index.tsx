import { Scrollbars } from "react-custom-scrollbars";
import styled from "styled-components";
import ChatList from "../../../components/ChatList";
import ChatRoom from "../../../components/ChatRoom";
import OnlineList from "../../../components/OnlineList";
import Title from "../../../components/Title";
import { Container } from "../../LogIn/styles";

export const Design = () => {
  return (
    <>
      <Container>
        <div className="Title">
          <Title title="PONG CHAT" home search />
        </div>
        <div className="Body" style={{ gap: "1rem" }}>
          {/* online offline */}
          <OnlineList Flex={1} />
          {/* chatList */}
          <ChatList Flex={1.85} />
          {/* chatRom */}
          <ChatRoom Flex={1} />
        </div>
      </Container>
    </>
  );
};
