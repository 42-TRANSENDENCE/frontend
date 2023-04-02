import styled from 'styled-components';

export const ChatRoomContainer = styled.div`
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
  background: white;

  @media screen and (max-width: 600px) {
    & {
      border-radius: 1rem;
    }
  }
`;

export const SearchRoom = styled.form`
  /* flex: 1; */
  --w: var(--width);
  --h: calc(var(--height) * (1 / 15));
  width: var(--w);
  height: var(--h);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 1rem;

  & > input {
    display: inline-block;
    width: calc(var(--w) * 0.4);
    height: var(--h);
    border-radius: 2rem;
    border: var(--border-width) solid black;
    padding-left: calc(var(--w) * 0.6 * 0.1);
    padding-right: calc(var(--w) * 0.6 * 0.1);
  }
  & > span > img {
    height: min(var(--h), calc(var(--w) * 0.4));
    aspect-ratio: 1;
    cursor: pointer;
  }
`;

export const RoomList = styled.div`
  /* flex: 13; */
  --w: var(--width);
  --h: calc(var(--height) * (12 / 15));
  width: var(--w);
  height: var(--h);
  font-size: calc(var(--h) * 0.03);
  line-height: calc(var(--h) * 0.05);

  & .eachRoom {
    height: calc(var(--h) * (0.1));
    border-radius: 2rem;
    border: var(--border-width) solid black;
    margin: calc(var(--h) * (0.01));
    padding: calc(var(--h) * (0.01)) calc(var(--w) * (0.1));
    position: relative;

    & > div:first-child {
      position: absolute;
      right: calc(var(--w) * (0.1));
      height: calc(var(--h) * (0.1));
      & > img {
        height: calc(var(--h) * (0.1) * (0.3));
      }
    }
    & > div:nth-child(2) {
    }
  }
`;

export const CreateRoom = styled.div`
  /* flex: 1; */
  --w: var(--width);
  --h: calc(var(--height) * (1 / 15));
  width: var(--w);
  height: var(--h);

  display: flex;
  justify-content: center;
  align-items: center;

  & > button {
    /* padding: 0.5rem; */
    border-radius: 1rem;
    background-color: #4495f7;
    border: var(--border-width) solid black;

    & > img {
      width: max(calc(var(--h) * 0.1), calc(var(--w) * 0.1));
      /* height: 30px; */
    }
  }
`;
