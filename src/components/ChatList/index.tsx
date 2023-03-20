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
              <img src="https://via.placeholder.com/50" alt="User profile" />
              <span>John Doe</span>
            </ChatProfile>
            <ChatBubble>
              Hi there!
              <ChatBubbleTail />
            </ChatBubble>
          </ChatItem>
          <ChatItem other>
            <ChatBubble other>
              Hey!
              <ChatBubbleTail other />
            </ChatBubble>
            <ChatProfile>
              <img src="https://via.placeholder.com/50" alt="User profile" />
              <span>Jane Doe</span>
            </ChatProfile>
          </ChatItem>
        </ChatLists>
      </div>
      <div style={{ flex: 1 }}>b-2</div>
    </div>
  );
};

export default ChatList;
