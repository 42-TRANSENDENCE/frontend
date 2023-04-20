import styled from "styled-components";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";

export const InviteGameButton = styled.div`
  height: calc(var(--singlefriend-height) * 0.75);
  aspect-ratio: 1;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  .ModalChild {
    --width: calc(var(--modal-width) * 0.98);
    --height: calc(var(--width) * 7 / 6);
    --padding: calc(var(--height) * 0.02);
    box-sizing: border-box;

    width: var(--width);
    height: var(--height);
    background: pink;

    border: var(--border-width) solid black;
    border-radius: calc(var(--width) * 0.05);
    padding: var(--padding);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    h6 {
      padding: 0;
      margin: 0;
      line-height: calc(var(--height) * 0.1);
      font-size: calc(var(--height) * 0.075);
    }
    button {
      width: 90%;
      margin-top: var(--padding);
      margin-bottom: var(--padding);
    }
  }

  .gameSpectateWindow {
    --height: calc(var(--width) * 6 / 7);
    margin-top: 10%;
  }
`;
