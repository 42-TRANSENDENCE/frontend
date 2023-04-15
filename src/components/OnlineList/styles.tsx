import styled from "styled-components";

export const FriendListContainer = styled.div`
  border-radius: 2rem;
  border: 0.3rem solid black;
  height: 100%;
  width: 90%;
  display: flex;
  flex-direction: column;
`

export const OnOffLineList = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  font-size: 2rem;
  overflow: auto;
`

export const Header = styled.div`
export const SingleUser = styled.div`
  --singlefriend-height : calc(var(--friendlist-height)*0.05);
  width: var(--friendlist-width);
  height: var(--singlefriend-height);

  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  gap : calc(var(--friendlist-width) * 0.02);
  margin-left: calc(var(--friendlist-width) * 0.02);

  line-height: var(--singlefriend-height);
  font-size : calc(var(--singlefriend-height) * 0.75);
  font-weight: 500;

  & > .icon {
    height: calc(var(--singlefriend-height) * 0.75);
    aspect-ratio: 1;
  }
`

export const UserStatus = styled.span<{ status: string }>`
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  margin-right: 0.5rem;
  margin-left: 1rem;
  background-color: ${({ status }) =>
    status === "ONLINE"
      ? "green"
      : status === "INGAME"
      ? "purple"
      : "gray"};
  position: relative;
  &:hover {
    &::after {
      content: ${({ status }) =>
        status === "ONLINE"
          ? "'Online'"
          : status === "INGAME"
          ? "'InGame'"
          : "'OffLine'"};
      position: absolute;
      z-index: 1;
      top: 1.5rem;
      left: 1.5rem;

      transform: translateX(-50%);
      padding: 0.25rem 0.5rem;
      background-color: black;
      color: white;
      font-size: 0.75rem;
      border-radius: 0.25rem;
    }
  }
`;
