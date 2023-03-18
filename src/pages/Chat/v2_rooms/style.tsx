import styled from "@emotion/styled";

export const Header = styled.header`
  text-align: center;
  font-weight: 700;
  font-size: 6rem;
  letter-spacing: 0.25rem;
  margin-top: 1rem;
  margin-bottom: 2.5rem;
  color: white;

  @media (max-width: 420px) {
    font-size: 2rem;
  }
`;

// export const Button = styled.button`
//   width: 10rem;
//   margin: 0 auto;
//   text-align: center;
//   display: block;
//   color: white;
//   background-color: #7c4dff;
//   cursor: pointer;
//   box-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);
//   outline: none;
//   font-size: 1.5rem;

//   transition: all 80ms linear;
//   height: 2rem;
//   padding: 1rem 0 3rem;
//   border: none;
//   border: 1px solid black;
//   border-radius: 0.25rem;
//   &:hover {
//     background-color: #865ef6;
//     /* border: none; */
//   }
//   &:focus {
//     box-shadow: 0 0 0 0.2rem rgba(242, 0, 255, 0.25);
//   }
// `;

export const InnerWindow = styled.div`
  margin: auto;
  position: absolute;
  padding: -1rem 0 2rem 0;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  width: 55%;
  height: 60%;
  background-color: #29b6f6;
  border-radius: 1rem;
`;

export const OuterWindow = styled.div`
  margin: auto;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  width: 65%;
  height: 60%;
  // padding: 1rem 0 2rem 0;

  & .browser-body {
    // padding: 1rem 0 2rem 0;
    background: #00e5ff;
    height: 100%;
  }
`;

export const BrowserHeader = styled.div`
  & .browser-header {
    display: flex;
    background: #b4b4b4;
    opacity: 0.9;
    padding: 1rem 0 2rem 0;
    padding: 10px;
    border-radius: 7px 7px 0px 0px;
  }
`;

export const DotThree = styled.div`
  .outer {
    position: relative;
    background: #b4b4b4;
    opacity: 0.9;
    // width: 960px;
    // margin: 10px auto;
    padding: 10px;
    border-radius: 7px 7px 0px 0px;
  }

  .dot {
    display: inline-block;
    width: 10px;
    height: 10px;
    background: #f9f9f9;
    border-radius: 50%;
    margin: 0 4px 0 0;

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

  span {
    position: absolute;
    right: 10px;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  // width: 100%;
  height: 100vh;
  background: #42a5f5;
`;

export const Containers = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #00e5ff;
  border: 0.5rem solid black;
  margin: 8vh 10vw;
  height: 42em;
  box-shadow: 20px 20px;
  position: relative;
`;

export const Div = styled.div`
  display: flex;
`;

export const Workspaces = styled.div`
  display: inline-flex;
  flex-grow: 1;
  flex-direction: column;
  border-right: 5px solid black;
  box-sizing: border-box;
  position: absolute;
  top: 8%;
  left: 2%;
`;

export const WorkspaceButton = styled.button`
  color: white;
  font-size: 40px;
  line-height: 70px;
  display: inline-block;
  background: transparent;
  border: none;
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    opacity: 0.8;
    transform: scale(0.85);
  }
`;

/* =========================================================== */

export const V2roomContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const Button = styled.button`
  display: inline-block;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  color: #fff;
  background-color: rgb(93, 163, 239);
  border: none;
  border-radius: 15px;
  box-shadow: 0 9px #999;

  &:hover {
    background-color: rgba(93, 163, 239, 0.8);
  }

  &:active {
    background-color: rgba(27, 130, 240, 0.8);
    box-shadow: 0 5px #666;
    transform: translateY(4px);
  }
`;

export const RoomContainer = styled.div`
  & {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
    height: 77%;
    overflow: scroll;
    padding: 1rem;
  }
  & > div {
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    position: relative;
    padding-bottom: 1rem;
    height: 5rem;
    border: 2px solid;
    box-shadow: 6px 4px 8px;
  }
  & > div > span.owner {
    display: inline-block;
    position: absolute;
    right: 1%;
    top: 1%;
  }

  & > div > span.openness {
    display: inline-block;
    position: absolute;
    left: 1%;
    top: 1%;
  }
  & > div > span > button {
    position: absolute;
    bottom: 1rem;
  }
`;
