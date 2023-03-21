import styled from "styled-components";

export const UserStatus = styled.span<{ status: string }>`
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  margin-right: 0.5rem;
  margin-left: 1rem;
  background-color: ${({ status }) =>
    status === "online"
      ? "green"
      : status === "chat"
      ? "yellow"
      : status === "game"
      ? "purple"
      : "gray"};
  position: relative;
  &:hover {
    &::after {
      content: ${({ status }) =>
        status === "online"
          ? "'Online'"
          : status === "chat"
          ? "'chat'"
          : status === "game"
          ? "'game'"
          : "'Offline'"};
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
