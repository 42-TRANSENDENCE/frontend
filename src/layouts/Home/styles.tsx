import styled from "styled-components";

export const Container = styled.div`
  width: var(--page-width);
  height: var(--page-height);
  padding: var(--html-padding-vertical) var(--html-padding-horizontal);
  display: flex;
  flex-direction: column;
  gap: var(--html-padding-vertical);
  align-items: center;

  .Title {
    width: var(--title-width);
    height: var(--title-height);

    display: flex;
    flex-direction: column;
  }

  .BodyOuter {
    width: var(--body-width);
    height: var(--body-height);
    display: flex;
    justify-content: flex-start;
    overflow-y: scroll;
    scrollbar-width: hidden;
    &::-webkit-scrollbar {
      display: none; // 크롬, 사파리, 오페라, 엣지
    }
    position: relative;
  }

  .Body {
    --body-height: max(
      calc(
        var(--page-height) - 1 * var(--title-height) - 3 *
          var(--html-padding-vertical)
      ),
      calc(var(--body-width) * (7 / 16))
    );
    width: var(--body-width);
    height: var(--body-height);

    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    overflow: hidden;

    .Section {
      --section-width: min(
        calc(var(--body-width) * 0.33 - var(--html-padding-horizontal)),
        330px
      );
      --section-height: min(var(--body-height), var(--body-width));
      --section-padding: calc(var(--section-height) * 0.02);
      width: var(--section-width);
      height: var(--body-height);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .LeftSide {
      --fontsize-big: calc(var(--section-height) * 0.045);
      --fontweight-big: 600;
      width: var(--section-width);
      height: var(--section-height);
      gap: var(--html-padding-vertical);
    }

    .MiddleSide {
      --section-width: min(calc(var(--body-width) * 0.34), 400px);
      --section-height: min(var(--body-height), var(--body-width));
      width: var(--section-width);
      gap: var(--html-padding-vertical);
      .BigButtons {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        gap: var(--html-padding-vertical);
        button {
          width: calc(var(--section-width) * 0.9);
          border: var(--border-width) solid black;
        }
      }

      .MidiumButtons {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: var(--html-padding-horizontal);
        button {
          width: calc(var(--section-width) * 0.35);
          border: var(--border-width) solid black;
        }
      }
    }

    .RightSide {
      gap: var(--html-padding-vertical);
      .Profile {
        --profile-width: calc(var(--section-width) * 0.8);
        width: var(--profile-width);
        position: relative;
      }

      .Profile > :first-child {
        position: relative;
      }

      .Profile > :last-child.pop-profile {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
      }

      .Notification > :first-child {
        position: relative;
      }
    }
  }
`;
