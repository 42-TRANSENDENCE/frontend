import styled from "styled-components";

/*=======================================*/
/*                                       */
/*                 WHOLE                 */
/*                                       */
/*=======================================*/

export const ChatsContainer = styled.div`
  --chat-width: var(--section-width);
  --chat-height: calc(var(--section-height) * 0.9);
  --chat-radius: calc(var(--chat-height) * 0.05);

  --title-height: var(--fontsize-big);
  --footer-height: calc(var(--fontsize-big) + var(--section-padding));

  --send-height: max(min(calc(var(--chat-height) * 0.1), 5vh), 30px);
  --padding-vertical: calc(var(--chat-height) * 0.02);
  --padding-horizontal: calc(var(--chat-width) * 0.01);
  --contents-height: calc(
    var(--chat-height) - var(--title-height) - var(--footer-height) -
      var(--border-width)
  );

  box-sizing: border-box;
  height: var(--chat-height);
  width: var(--chat-width);
  border-radius: var(--chat-radius);
  border: var(--border-width) solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;

  font-size: var(--fontsize-small);
`;

/*=======================================*/
/*                                       */
/*                 TITLE                 */
/*                                       */
/*=======================================*/

export const ChatTitle = styled.div`
  --title-height: var(--fontsize-big);

  background-color: rgba(255, 255, 255, 0.6);
  width: calc(var(--chat-width));
  height: var(--title-height);

  line-height: var(--title-height);

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  & > .Title {
    height: var(--title-height);
    width: fit-content;
    text-justify: left;
    font-size: calc(var(--fontsize-big) * 0.7);
    font-weight: 600;
    margin-left: calc(var(--chat-radius) * 0.5);
  }

  & > .Buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    margin-right: calc(var(--chat-radius) * 0.8);
  }

  button {
    --button-size: calc(var(--title-height) * 0.8);
    box-sizing: border-box;
    width: var(--button-size);
    height: var(--button-size);
    border: calc(var(--button-size) * 0.1) solid black;
    margin: 0 calc(var(--button-size) * 0.1);
  }
`;

/*=======================================*/
/*                                       */
/*                  BODY                 */
/*                                       */
/*=======================================*/

// 전체 채팅 담는 박스
export const ChatsBar = styled.div`
  width: var(--chat-width);
  height: var(--contents-height);
  max-width: 100%;
`;

// 채팅들
export const ChatLists = styled.div`
  width: var(--chat-width);
  height: var(--contents-height);
  max-width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: calc(var(--fontsize-small) / 2);
  padding-right: 10px;
`;

// 채팅 하나
export const ChatItem = styled.div<{ isMe?: boolean }>`
  --chat-bubble-color: ${(props) => (props.isMe ? "yellow" : "white")};

  font-size: var(--fontsize-small);
  display: flex;
  justify-content: "flex-start";
  flex-direction: ${(props) => (props.isMe ? "row-reverse" : "row")};
  position: relative;

  .ChatProfile {
    width: var(--fontsize-big);
    height: var(--fontsize-big);
    background-color: pink;
    border-radius: 50%;
    border: calc(var(--border-width) / 2) solid black;
    margin: 0 calc(var(--fontsize-big) / 4);
    img {
      cursor: pointer;
      width: var(--fontsize-big);
      height: var(--fontsize-big);
      border-radius: 50%;
    }
  }

  .ChatMain {
    display: flex;
    flex-direction: column;
    width: calc(var(--chat-width) * 0.7);
    word-wrap: break-word;
    margin: 0;
    & > span {
      text-align: ${(props) => (props.isMe ? "right" : "left")};
      height: calc(var(--fontsize-small) * 0.8);
      font-size: calc(var(--fontsize-small) * 0.8);
      font-weight: 700;
    }

    .ChatBubble {
      line-height: var(--fontsize-small);
      font-size: var(--fontsize-small);
      font-weight: 500;
      position: relative;
      padding: calc(var(--fontsize-small) * 0.5);
      border-radius: ${(props) => (props.isMe ? "var(--fontsize-small)" : "0")}
        ${(props) => (props.isMe ? "0" : "var(--fontsize-small)")}
        var(--fontsize-small) var(--fontsize-small);
      background-color: var(--chat-bubble-color);
      color: ${(props) => (props.isMe ? "#555" : "#000")};
      border: calc(var(--border-width) / 2) solid black;
    }
  }
`;

// 프로필 클릭 시 나오는 메뉴
export const ChatsMenuContainer = styled.div`
  position: absolute;
  background-color: gray;
  border-radius: 10px;
  font-size: var(--fontsize-small);
  top: calc(var(--fontsize-big) * 1.1);
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
  color: white;
  font-weight: bold;
  text-align: center;

  z-index: 1;

  width: 200px;
  height: 200px;

  div {
    &:hover {
      opacity: 0.9;
      transform: scale(0.98);
      cursor: pointer;
    }
  }
`;

/*=======================================*/
/*                                       */
/*                FOOTER                 */
/*                                       */
/*=======================================*/

export const SendChatBar = styled.form`
  --send-button-height: calc(var(--footer-height) - var(--section-padding));
  --send-button-width: calc(var(--send-button-height) * 1.5);
  --radius: calc(var(--send-button-height) * 0.5);

  width: var(--chat-width);
  height: var(--footer-height);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  & > textarea {
    padding-top: calc(var(--send-button-height) * 0.25);
    padding-left: calc(var(--send-button-height) * 0.25);
    box-sizing: border-box;
    width: calc(var(--chat-width) - var(--send-button-width));
    height: var(--send-button-height);
    display: flex;
    border-radius: var(--radius) 0 0 var(--radius);
    border: calc(var(--border-width) / 2) solid black;
    overflow: hidden;
    resize: none;
    margin-left: calc(var(--chat-radius) / 2);
  }

  & > Button {
    box-sizing: border-box;
    height: var(--send-button-height);
    width: var(--send-button-width);
    border: calc(var(--border-width) / 2) solid black;
    border-radius: 0 var(--radius) var(--radius) 0;
    margin-right: calc(var(--chat-radius) / 2);
  }
`;
