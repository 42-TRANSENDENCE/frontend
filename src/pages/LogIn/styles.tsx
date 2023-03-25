import styled from 'styled-components';

export const Container = styled.div`
  width: var(--page-width);
  height: var(--page-height);
  padding: var(--html-padding-vertical) var(--html-padding-horizontal);
  display: flex;
  flex-direction: column;
  gap: var(--html-padding-vertical);
  justify-content: top;
  align-items: center;

  .Title {
    width: var(--title-width);
    height: var(--title-height);
    display: flex;
    flex-direction: column;
    justify-content: top;
  }
  .BodyOuter {
    width: var(--body-width);
    height: var(--body-height);
    display: flex;
    align-items: top;
    justify-content: top;
    overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none; // 크롬, 사파리, 오페라, 엣지
  }
  }
  .Body {
    width: var(--body-width);
    height: var(--body-height);


    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    overflow: hidden;

    .BigButtons{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        gap: var(--html-padding-vertical);
        Button {
          width: 80%;
          border: var(--border-width) solid black;
        }
      }
  }
`;
