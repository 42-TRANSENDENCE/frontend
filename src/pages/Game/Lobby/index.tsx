import { useEffect } from "react";
import { BigButton } from '../../../components/Button';
import normalButton from "../../../assets/bigButton/normalButton.svg";
import chaosButton from "../../../assets/bigButton/chaosButton.svg";
import { GameMode } from "../enum"

const Lobby = (props: any) : JSX.Element => {
    const client_socket = props.socket;

    useEffect(() => {
        console.log("GameLobby 입장");
        return () => {
        console.log("GameLobby 나감");
        };
    }, []);

    function normal_game_clicked() {
      console.log("normal game button clicked");
      // data : QueueDto
      client_socket.emit("join_queue", GameMode.NORMAL);
    };

    function special_game_clicked() {
      console.log("chaos game button clicked");
      client_socket.emit("join_queue", GameMode.SPECIAL);
    }

    return (
        <LobbyContainer>
          <div className="box">
            <div className='body'>
              <BigButton className="big" img_url={normalButton} onClick={normal_game_clicked}/>
              <BigButton className="big" img_url={chaosButton} onClick={special_game_clicked}/>
            </div>
          </div>
        </LobbyContainer>
    )
};

export default Lobby;


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

    --w : min(var(--body-width), 600px);
    --h : calc(var(--body-height) * 0.8);
    --size : min(var(--w), var(--h));
    width: var(--size);
    aspect-ratio: 1;
    
    background: var(--color-blue);
    
    border-radius: calc(var(--size) / 8);
    border: calc(var(--border-width) * 2) solid black;
    
    box-sizing: border-box;
    /* width: fit-content; */
    padding: var(--html-padding-horizontal);
  }
  .top {
    width: 100%;
    /* background: yellow; */
    display: flex;
    align-items: top;
    justify-content: right;
    Button {
      width: calc(var(--size) * 0.1);
      border: var(--border-width) solid black;
      border-radius: calc(var(--size) * 0.05);
    }
  }
  .body{
    /* background-color: green; */
    width: 100%;
    height: 90%;
    display: flex;
    flex-direction: column;  
    justify-content: space-evenly;
    align-items: center;

    Button {
      width: calc(var(--size) - 2*var(--html-padding-horizontal));
      border: var(--border-width) solid black;
      border-radius: calc(50 / 800 * min(60vw, 800px));
    }

  }
`