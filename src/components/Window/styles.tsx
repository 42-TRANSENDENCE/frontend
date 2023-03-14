import styled from "styled-components";

export const Container = styled.div<any>`
  --bgcolor: rgb(236, 236, 236);
  --border-width: min(0.15vw, 0.15vh);
  --container-padding: min(1vh, 1vw);
  --container-topbar-height: 22px;

  background: ${(props) => props.background || "var(--bgcolor)"};
  padding: var(--container-padding);
  padding-top: calc(var(--container-padding) + var(--container-topbar-height));

  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "100%"};
  max-width: ${(props) => props.max_width};
  min-width: ${(props) => props.min_width};
  max-height: ${(props) => props.max_height};
  min-height: ${(props) => props.min_height};
  box-sizing: border-box;

  border: 0.1px solid rgb(239, 239, 239);
  border-radius: 5px;
  box-shadow: 1px 1px 5px rgb(0, 0, 0, 0.5);

  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  text-align: center;
  overflow: hidden;
`;

export const Container__Topbar = styled.div`
  background: linear-gradient(rgb(228, 228, 228), rgb(206, 206, 206));
  border-bottom: 1px solid rgb(179, 179, 179);
  width: 100%;
  color: black;
  height: var(--container-topbar-height);
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  p {
    height: 100%;
  }
`;

export const DotThreeContainer = styled.div`
  .outer {
    position: absolute;
    opacity: 0.9;
    padding-left: 8px;
    top: 1.5px;
    left: 0;
    height: 100%;
  }

  .dot {
    display: inline-block;
    width: 12px;
    aspect-ratio: 1;
    background: #f9f9f9;
    border-radius: 50%;
    margin: 0 8px 0 0;

    &.red {
      background: #ff6057;
      border: 1px solid #e14640;
    }

    &.amber {
      background: #ffbd2e;
      border: 1px solid #dfa123;
    }

    &.green {
      background: #27c93f;
      border: 1px solid #1dad2b;
    }
  }

  .dot:hover {
    opacity: 0.5;
  }
`;

export const WorkspaceButton = styled.button`
  margin-bottom: max(3vh, 10px);
  background: transparent;
  display: inline-block;
  border: none;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
    transform: scale(0.85);
  }
`;

export const Container__Body = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: right;

  .children {
    width: 100%;
    height: 100%;
  }

  .sidebar {
    height: 100%;
    display: inline-flex;
    flex-grow: 1;
    flex-direction: column;
    border-left: 1px solid rgb(179, 179, 179);
    box-sizing: border-box;
    padding-top: 30px;
  }
`;
