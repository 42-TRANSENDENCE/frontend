import styled from 'styled-components';

/* ChatListContainer */
export const ChatListContainer = styled.div`
  --section-width: calc(
    var(--body-width) * 0.33 - var(--html-padding-horizontal)
  );
  --width: calc(var(--section-width) * 0.9);
  --height: var(--body-height);
  display: flex;
  flex-direction: column;
  height: var(--height);
  width: var(--width);
  border-radius: 2rem;
  border: var(--border-width) solid black;
  padding: calc(var(--height) * 0.02) calc(var(--width) * 0.01);

  @media screen and (max-width: 600px) {
    & {
      border-radius: 1rem;
    }
  }
`;

export const ChatListsBar = styled.div`
  // flex: 26;
  --w: var(--width);
  --h: calc(var(--height) * (22 / 30));
  width: var(--w);
  height: var(--h);
`;

export const SendChatBar = styled.div`
  // flex: 3;
  --w: var(--width);
  --h: calc(var(--height) * (3 / 30));
  width: var(--w);
  height: var(--h);
  display: flex;
  margin: calc(var(--h) * 0.3) 0;
  align-items: center;

  & > textarea {
    /* flex: 8; */
    width: calc(var(--w) * 0.8);
    height: min(calc(var(--h) * 0.2), calc(var(--w) * 0.01));
    display: flex;
    border-radius: calc(var(--h) * 0.3);
    border: var(--border-width) solid black;
    padding: calc(var(--h) * 0.3);
    overflow: hidden;
    resize: none;
  }
  & > div {
    /* flex: 1; */
    width: calc(var(--w) * 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    & > button {
      /* padding: 1.8rem; */
      border-radius: calc(var(--h) * 0.1);
      background-color: #fcf451;
      border: var(--border-width) solid black;
      height: min(calc(var(--h) * 0.8), calc(var(--w) * 0.24));
      aspect-ratio: 1;
      & > img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
`;

export const GoBackBar = styled.div`
  // flex: 1;
  --w: var(--width);
  --h: calc(var(--height) * (1 / 30));
  width: var(--w);
  height: var(--h);
  display: flex;
  justify-content: space-evenly;
  /* font-size: min(calc(var(--h) * 0.9), calc(var(--w) * 0.1)); */
  font-size: min(calc(var(--h) * 0.03), calc(var(--w) * 0.1));
  /* font-size: 15 px; */

  & > a {
    & > button {
      /* display: inline-block; */
      border: var(--border-width) solid black;
      border-radius: calc(var(--h) * 0.3);
      margin: 0;
      padding: 0;
      background-color: white;
      color: #376277;
      font-family: inherit;
      font-size: inherit;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s ease;
      outline: none;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
      padding: calc(var(--height) * 0.02) calc(var(--width) * 0.01);

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
  }
`;

/* ChatLists */
export const ChatLists = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ChatItem = styled.div<{ other?: boolean }>`
  /* margin: 0.5rem; */
  font-size: min(calc(var(--h) * 0.03), calc(var(--w) * 0.1));
  margin: calc(var(--w) * 0.02);
  display: flex;
  justify-content: 'flex-start';
  flex-direction: ${(props) => (props.other ? 'row-reverse' : 'row')};
  position: relative;
`;

export const ChatBubble = styled.div<{ other?: boolean }>`
  position: relative;
  padding: calc(var(--h) * 0.02);
  max-width: 97%;
  border-radius: 1rem;
  background-color: ${(props) => (props.other ? '#FFF' : '#F0F0F0')};
  color: ${(props) => (props.other ? '#000' : '#555')};

  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0.625rem;
    /* border-width: calc(var(--h) * 0.025); */
    border-color: ${(props) =>
      props.other
        ? '#FFF transparent transparent transparent'
        : '#F0F0F0 transparent transparent transparent'};
    top: -0.625rem;
    /* top: calc(var(--h) * -0.0245); */
    ${(props) => (props.other ? 'right' : 'left')}: -0.625rem;
    /* ${(props) =>
      props.other ? 'right' : 'left'}: calc(var(--h) * -0.025); */
    transform: ${(props) =>
      props.other ? 'rotate(-135deg)' : 'rotate(135deg)'};
  }
`;

export const ChatProfile = styled.div<{ other?: boolean }>`
  display: flex;
  /* margin-bottom: 0.5rem; */
  /* ${(props) => (props.other ? 'right' : 'left')}: 0; */

  & > img {
    /* width: 2rem;
    height: 2rem; */
    height: calc(var(--w) * 0.3 * 0.4);
    aspect-ratio: 1;
    border-radius: 50%;
    /* margin-right: 0.5rem; */
  }
`;

export const ChatMain = styled.div<{ other?: boolean }>`
  display: flex;
  flex-direction: column;
  & > span {
    text-align: ${(props) => (props.other ? 'right' : 'left')};
    /* text-align: right; */
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
