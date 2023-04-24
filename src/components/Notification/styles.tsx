import styled from "styled-components";

export const NotificationContainer = styled.div`
  --w: calc(var(--section-width) * 0.85);
  --h: calc(var(--w) * 0.35);
  width: var(--w);
  height: var(--h);
  background: white;
  border-radius: calc(var(--h) / 3);
  border: var(--border-width) solid black;
  text-align: center;
  margin-top: 2rem;
  flex-direction: column;
  overflow: hidden;

  h1 {
    line-height: 1vw;
    font-size: 1.5vw;
  }

  h3 {
    margin: 0;
    padding: 0;
  }

  span {
    font-size: 1.5vw;
    font-weight: bold;
  }

  .Notification {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    margin-bottom: 1rem;
  }
`;
