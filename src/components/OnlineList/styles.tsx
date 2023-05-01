import styled from "styled-components";

export const FriendListContainer = styled.div`
  --friendlist-width: calc(var(--section-width));
  --friendlist-height: calc(var(--section-height) * 0.9);
  --friendlist-padding: calc(var(--section-padding));

  box-sizing: border-box;
  border-radius: calc(var(--friendlist-height) * 0.05);
  border: var(--border-width) solid black;
  height: var(--friendlist-height);
  width: var(--friendlist-width);
  max-width: 100%;
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
  overflow-x: hidden;
`;

export const Header = styled.div`
  height: var(--fontsize-big);
  font-size: var(--fontsize-big);
  font-weight: 600;
  padding: 0 var(--friendlist-padding);
`;

export const SingleUser = styled.div`
  --singlefriend-height: calc(var(--friendlist-height) * 0.05);
  width: calc(var(--friendlist-width) - 2 * var(--boarder-width));
  height: var(--singlefriend-height);
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  gap: calc(var(--friendlist-width) * 0.02);

  line-height: var(--singlefriend-height);
  font-size: calc(var(--singlefriend-height) * 0.75);
  font-weight: 500;
  & .userName {
    overflow-x: scroll;
    scrollbar-width: hidden;
    &::-webkit-scrollbar {
      display: none; // 크롬, 사파리, 오페라, 엣지
    }
  }

  & .icon {
    margin: 0;
    padding: 0;
    width: calc(var(--singlefriend-height) * 0.7);
    height: calc(var(--singlefriend-height) * 0.7);
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
