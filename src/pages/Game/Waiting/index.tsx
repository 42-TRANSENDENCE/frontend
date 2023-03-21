import {BigButton} from "../../../components/Button"
import cancelButton from "../../../assets/bigButton/cancelButton.svg"
import { useEffect } from "react";

const Waiting = (props: any) => {
  const game_socket = props.socket;

  function quit_queue(): void {
    console.log("cancel 버튼 누름");
    game_socket.emit("quit_queue");
  }

  useEffect(() => {
    console.log("queue에 들어옴");
    return () => {
      console.log("queue에서 나감.");
    };
  }, []);

  return (
    <>
      <LobbyContainer>
          <div className="box">
              <BigButton img_url={cancelButton} onClick={quit_queue}/>
          </div>
        </LobbyContainer>
    </>
  );
};

export default Waiting;

/* =================================================== */
import styled from 'styled-components';
const LobbyContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  .box {
    display: flex;
    flex-direction: column;  
    justify-content: space-evenly;
    align-items: center;

    --w : min(60vw, 500px);
    width: var(--w);
    aspect-ratio: 1;
    
    background: var(--color-blue);
    
    border-radius: 50px;
    border: calc(10 / 800 * var(--w)) solid black;
    
    box-sizing: border-box;
    padding: 25px;

    Button {
      width: 90%;
      max-width: 600px;
      border-radius: calc(50 / 800 * min(60vw, 800px));
    }
  }

`