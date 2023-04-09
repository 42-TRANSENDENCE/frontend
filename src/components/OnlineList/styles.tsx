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
  font-size: 3rem;
  padding-left: 1rem;
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
