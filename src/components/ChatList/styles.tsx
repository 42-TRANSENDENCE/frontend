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
  margin: 1rem 0;

  & > textarea {
    /* flex: 8; */
    width: calc(var(--w) * 0.8);
    display: flex;
    border-radius: 2rem;
    border: var(--border-width) solid black;
    padding: 1rem;
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
      border-radius: 1rem;
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
  font-size: min(calc(var(--h) * 0.8), calc(var(--w)));

  & > a {
    border: 0.2rem solid red;

    & > button {
      border: none;
      margin: 0;
      padding: 0;
      background-color: white;
      color: inherit;
      font-family: inherit;
      font-size: inherit;
      cursor: pointer;
      outline: none;
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
  padding: 1rem;
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
    border-color: ${(props) =>
      props.other
        ? '#FFF transparent transparent transparent'
        : '#F0F0F0 transparent transparent transparent'};
    top: -0.63rem;
    ${(props) => (props.other ? 'right' : 'left')}: -0.625rem;
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

export const ChatMain = styled.div`
  display: flex;
  flex-direction: column;
`;
