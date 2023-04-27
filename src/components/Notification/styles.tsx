import styled from "styled-components";

export const NotificationContainer = styled.div`
  --w: calc(var(--section-width) * 0.85);
  --h: calc(var(--w) * 0.35);

  --fontsize-big: calc(var(--h) * 0.25);
  --fontweight-big: 600;
  --fontsize-small: calc(var(--h) * 0.1);
  --fontweight-small: 500;

  width: var(--w);
  height: var(--h);

  background: white;
  border-radius: calc(var(--h) / 3);

  border: var(--border-width) solid black;
  text-align: center;
  margin-top: 1rem;

  display: flex;
  flex-direction: column;
  overflow: hidden;

  h1 {
    margin: 0;
    padding: 0;
    line-height: calc(var(--fontsize-big));
    font-size: var(--fontsize-big);
  }

  h3 {
    margin: 0;
    padding: 0;
    line-height: calc(var(--fontsize-small) * 1.7);
    font-size: var(--fontsize-small);
    text-align: center;
  }

  h5 {
    margin: 0;
    padding: 0;
    line-height: calc(var(--fontsize-small) * 0.5);
    font-size: calc(var(--fontsize-small) * 0.5);
    font-weight: bold;
  }

  .Notification {
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
    width: calc(var(--section-width) * 0.85);
    margin: 1px 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & > div {
      height: var(--fontsize-big);
      display: flex;
      justify-content: center;
      flex-direction: row;
    }
  }
`;
