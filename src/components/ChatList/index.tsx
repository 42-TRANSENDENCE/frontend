import {
  ChatBubble,
  ChatBubbleTail,
  ChatItem,
  ChatLists,
  ChatProfile,
} from "./styles";

const ChatList = ({ Flex }) => {
  return (
    <div
      style={{
        flex: Flex,
        borderRadius: "2rem",
        border: "0.3rem solid black",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ flex: 9 }}>
        <ChatLists>
          <ChatItem>
            <ChatProfile>
              <span>John Doe</span>
              <img src="https://via.placeholder.com/50" alt="User profile" />
            </ChatProfile>
            <ChatBubble>
              Hi there!Hi there!Hi there!Hi there!Hi there!Hi there!Hi there!Hi
              there! Hi there!Hi there!Hi there!Hi there!Hi there!Hi there! Hi
              there!Hi there!Hi there!Hi there!Hi there!Hi there!Hi there!Hi
              there!Hi there!Hi there!Hi there!Hi there!Hi there! Hi there!Hi
              there! Hi there! Hi there!
              <ChatBubbleTail />
            </ChatBubble>
          </ChatItem>
          <ChatItem other>
            <ChatBubble other>
              Hey!
              <ChatBubbleTail other />
            </ChatBubble>
            <ChatProfile>
              <span>Jane Doe</span>
              <img src="https://via.placeholder.com/50" alt="User profile" />
            </ChatProfile>
          </ChatItem>
          <ChatItem>
            <ChatProfile>
              <span>John Doe</span>
              <img src="https://via.placeholder.com/50" alt="User profile" />
            </ChatProfile>
            <ChatBubble>
              Hi there!
              <ChatBubbleTail />
            </ChatBubble>
          </ChatItem>
        </ChatLists>
      </div>
      <div style={{ flex: 1 }}>b-2</div>
    </div>
  );
};

export default ChatList;
