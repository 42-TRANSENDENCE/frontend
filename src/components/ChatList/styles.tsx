import styled from 'styled-components';

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
