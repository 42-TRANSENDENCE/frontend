import styled from "styled-components";

export const ChatBody = styled.div`
  --body-height: max(
    calc(
      var(--page-height) - 1 * var(--title-height) - 3 *
        var(--html-padding-vertical)
    ),
    calc(var(--body-width) * (7 / 16))
  );

  box-sizing: border-box;
  width: var(--body-width);
  height: var(--body-height);

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  gap: none;

  > .Section {
    --section-width: min(
      calc((var(--body-width) * 0.33 - var(--html-padding-horizontal))),
      400px
    );
    --section-padding: calc(var(--section-height) * 0.02);

    --fontsize-big: calc(var(--section-height) * 0.045);
    --fontweight-big: 600;
    --fontsize-small: calc(var(--fontsize-big) * 0.5);
    --fontweight-small: 500;

    width: var(--section-width);
    height: var(--section-height);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  > .OnlineList {
    text-align: left;
    --section-height: min(var(--body-height), var(--body-width));
  }

  > .ChatOrMyChannels {
    --section-width: calc(
      (var(--body-width) * 0.34 - var(--html-padding-horizontal))
    );
    --section-height: min(var(--body-height), var(--body-width));
    text-align: center;
  }

  > .AllChannels {
    --section-height: calc(min(var(--body-height), var(--body-width)) * 0.9);
    text-align: right;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
`;
