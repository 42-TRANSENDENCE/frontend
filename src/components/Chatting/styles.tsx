import styled from "styled-components";

export const ChatsContainer = styled.div`
  --section-width: calc(
    var(--body-width) * 0.33 - var(--html-padding-horizontal)
  );
  --width: calc(var(--section-width) * 0.9);
  --height: var(--body-height);

  --buttons-height: max(min(calc(var(--height) * 0.1), 5vh), 30px);
  --send-height: max(min(calc(var(--height) * 0.1), 5vh), 30px);
  --gap: calc(var(--height) * 0.01);
  --padding-vertical: calc(var(--height) * 0.02);
  --padding-horizontal: calc(var(--width) * 0.01);
  --contents-height: calc(
    var(--height) - var(--buttons-height) - var(--send-height) - 2 *
      var(--padding-vertical) - 2 * var(--gap)
  );

  display: flex;
  // position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: var(--height);
  width: var(--width);
  border-radius: calc(var(--width) * 0.1);
  border: var(--border-width) solid black;
  padding: var(--padding-vertical) var(--padding-horizontal);
  background: rgba(255, 255, 255, 0.3);

  .Button {
    width: 10%;
    aspect-ratio: 1;
    position: absolute;
    right: 1rem;
    top: 1rem;
  }
`;

export const ChatsBar = styled.div`
  --w: var(--width);
  --h: var(--contents-height);
  width: var(--w);
  height: var(--h);
  max-width: 100%;
`;

export const SendChatBar = styled.div`
  --w: var(--width);
  --h: var(--send-height);

  --send-button-height: calc(var(--h) * 0.6);
  --send-button-width: calc(var(--send-button-height) * 1.5);
  width: var(--w);
  height: var(--send-height);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: calc(var(--w) * 0.01);

  & > textarea {
    box-sizing: border-box;
    width: calc(var(--w) - var(--send-button-width) - var(--gap));
    height: calc(var(--send-height) * 0.8);
    display: flex;
    border-radius: calc(var(--h) * 0.3);
    border: calc(var(--border-width) / 2) solid black;
    overflow: hidden;
    resize: none;
  }

  Button {
    box-sizing: border-box;
    width: var(--send-button-width);
    height: var(--send-button-height);
    border: calc(var(--border-width) / 2) solid black;
  }
`;

export const GoBackBar = styled.div`
  --w: var(--width);
  --h: var(--buttons-height);
  width: var(--w);
  height: var(--h);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: min(calc(var(--h) * 0.03), calc(var(--w) * 0.1));
  & button {
    /* display: inline-block; */
    --button-width: calc(var(--w) * 0.4);
    --button-height: calc(var(--button-width) / 5);
    height: var(--button-height);
    width: var(--button-width);
    border: calc(var(--border-width) / 2) solid black;
    border-radius: calc(var(--h) * 0.3);
    margin: 0;
    padding: 0;
    background-color: white;
    color: #376277;
    font-family: inherit;
    font-size: calc(var(--button-height) * 0.5);
    font-weight: bold;
    cursor: pointer;
    outline: none;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    padding: 0;

    &.goBack:hover {
      background-color: #18f123;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
      opacity: 0.8;
    }
    &.leaveRoom:hover {
      background-color: #fe3838;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
      opacity: 0.8;
    }

    &:active {
      animation: shake 0.3s;
      transform: translateY(2px);
      box-shadow: none;
      opacity: 0.8;
    }

    @keyframes shake {
      0% {
        transform: translateX(0);
      }
      10% {
        transform: translateX(-5px);
      }
      20% {
        transform: translateX(5px);
      }
      30% {
        transform: translateX(-5px);
      }
      40% {
        transform: translateX(5px);
      }
      50% {
        transform: translateX(-5px);
      }
      60% {
        transform: translateX(5px);
      }
      70% {
        transform: translateX(-5px);
      }
      80% {
        transform: translateX(5px);
      }
      90% {
        transform: translateX(-5px);
      }
      100% {
        transform: translateX(0);
      }
    }
  }
`;

/* ChatLists */
export const ChatLists = styled.div`
  display: flex;
  flex-direction: column;

  & .YYYY_MM_DD {
    text-align: center;
    margin: calc(var(--h) * 0.01) 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    & > div {
      width: fit-content;
      --line-height: min(calc(var(--h) * 0.03), calc(var(--w) * 0.1));
      line-height: var(--line-height);
      font-size: calc(var(--line-height) * 0.9);
      border: none;
      background-color: rgb(180, 195, 211);
      color: rgb(47, 50, 54);
      border-radius: calc(var(--h) * 0.3);
      padding: calc(var(--h) * 0.003) calc(var(--w) * 0.05);
    }
  }
`;

export const ChatItem = styled.div<{ other?: boolean }>`
  /* margin: 0.5rem; */
  font-size: min(calc(var(--h) * 0.03), calc(var(--w) * 0.1));
  margin: calc(var(--w) * 0.02);
  display: flex;
  justify-content: "flex-start";
  flex-direction: ${(props) => (props.other ? "row" : "row-reverse")};
  position: relative;
  gap: calc(var(--w) * 0.02);
`;

export const ChatBubble = styled.div<{ other?: boolean }>`
  position: relative;
  padding: calc(var(--h) * 0.01) calc(var(--h) * 0.02);
  max-width: 97%;
  border-radius: ${(props) => (props.other ? "0" : "1rem")}
    ${(props) => (props.other ? "1rem" : "0")} 1rem 1rem;
  background-color: ${(props) =>
    props.other ? "#FFF" : "var(--color-yellow)"};
  color: ${(props) => (props.other ? "#000" : "#555")};
  border: calc(var(--border-width) / 2) solid black;
`;

export const ChatProfile = styled.div`
  display: flex;

  & > img {
    height: calc(var(--w) * 0.3 * 0.4);
    aspect-ratio: 1;
    border-radius: 50%;
    border: calc(var(--border-width) / 2) solid black;
  }
`;

export const ChatMain = styled.div<{ other?: boolean }>`
  display: flex;
  flex-direction: column;
  width: calc(var(--width) * 0.7);
  word-wrap: break-word;
  & > span {
    text-align: ${(props) => (props.other ? "left" : "right")};
  }
  & > span:nth-child(2) {
    font-size: min(calc(var(--h) * 0.02), calc(var(--w) * 0.07));
  }
`;

export const ChatsMenuContainer = styled.div`
  position: absolute;
  background-color: gray;
  border-radius: 10px;
  padding: 10px;
  font-size: min(calc(var(--h) * 0.03), calc(var(--w) * 0.1));
  z-index: 1;
  top: calc(var(--w) * 0.3 * 0.4);
`;
