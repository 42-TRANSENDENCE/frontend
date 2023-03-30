import styled from 'styled-components';

/* ChatListContainer */
export const ChatListContainer = styled.div`
  --section-width: calc(
    var(--body-width) * 0.33 - var(--html-padding-horizontal)
  );
  --width: calc(var(--section-width) * 0.8);
  --height: var(--body-height);
  display: flex;
  flex-direction: column;
  height: var(--height);
  width: var(--width);
  border-radius: 2rem;
  border: var(--border-width) solid black;
  padding: calc(var(--height) * 0.01) calc(var(--width) * 0.01);

  @media screen and (max-width: 600px) {
    & {
      border-radius: 1rem;
    }
  }
`;

export const ChatListsBar = styled.div`
  flex: 9;
`;

export const SendChatBar = styled.div`
  flex: 1;
  display: flex;
  margin-bottom: 1rem;

  & > textarea {
    flex: 8;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 2rem;
    border: 0.3rem solid black;
    padding: 1rem;
    overflow: hidden;
    resize: none;
  }
  & > div {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    & > button {
      padding: 0.5rem;
      border-radius: 1rem;
      background-color: #fcf451;
      border: 0.3rem solid black;
      width: 4rem;
      height: 4rem;
      & > img {
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
`;

export const GoBackBar = styled.div`
  flex: 0.3;
  display: flex;
  justify-content: space-evenly;

  & > a {
    border: 0.2rem solid red;
  }
`;

/* ChatLists */
export const ChatLists = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ChatItem = styled.div<{ other?: boolean }>`
  margin: 0.5rem;
  display: flex;
  justify-content: 'flex-start';
  flex-direction: ${(props) => (props.other ? 'row-reverse' : 'row')};
  position: relative;
`;

export const ChatBubble = styled.div<{ other?: boolean }>`
  position: relative;
  padding: 1.5rem;
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
  margin-bottom: 0.5rem;
  /* ${(props) => (props.other ? 'right' : 'left')}: 0; */

  & > img {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    margin-right: 0.5rem;
  }
`;

export const ChatMain = styled.div`
  display: flex;
  flex-direction: column;
`;
