import styled from "styled-components";

export const FriendListContainer = styled.div`
  --friendlist-width: calc(var(--section-width) * 0.9);
  --friendlist-height: min(
    calc(var(--body-height) * 0.9),
    calc(var(--body-width) * 0.9)
  );
  --friendlist-padding: calc(var(--friendlist-height) * 0.02);
  border-radius: calc(var(--friendlist-height) * 0.05);
  border: var(--border-width) solid black;
  height: var(--friendlist-height);
  width: var(--friendlist-width);
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .Online {
    background: white;
    overflow-y: auto;
  }

  .Offline {
    background: var(--color-gray);
    overflow-y: auto;
  }
`;

export const OnOffLineList = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  font-size: 2rem;
  overflow: auto;
`;

export const Header = styled.div`
  font-size: calc(var(--friendlist-height) * 0.05);
  font-weight: 600;
  padding-left: var(--friendlist-padding);
`;

export const SingleUser = styled.div`
  --singlefriend-height: calc(var(--friendlist-height) * 0.05);
  width: var(--friendlist-width);
  height: var(--singlefriend-height);

  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  gap: calc(var(--friendlist-width) * 0.02);
  margin-left: calc(var(--friendlist-width) * 0.02);

  line-height: var(--singlefriend-height);
  font-size: calc(var(--singlefriend-height) * 0.75);
  font-weight: 500;

  & > .icon {
    height: calc(var(--singlefriend-height) * 0.75);
    aspect-ratio: 1;
  }
`;

export const UserStatus = styled.span<{ status: string }>`
  display: inline-block;
  width: calc(var(--singlefriend-height) * 0.5);
  aspect-ratio: 1;
  border-radius: 50%;
  margin-left: calc(var(--friendlist-width) * 0.03);
  margin-right: calc(var(--friendlist-width) * 0.03);
  background-color: ${({ status }) =>
    status === "ONLINE" ? "green" : status === "INGAME" ? "purple" : "gray"};

  &:hover {
    &::after {
      content: ${({ status }) =>
        status === "ONLINE"
          ? "Online"
          : status === "INGAME"
          ? "InGame"
          : "OffLine"};
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
