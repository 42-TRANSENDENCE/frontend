import { useEffect, useState } from "react";
import useSocket from '../../../hooks/useSocket';
import { GameState } from "../enum";
import { PlayContainer, CanvasContainer } from "./styles";


import Canvas__background from "./Canvas__background";
import Canvas__foreground from "./Canvas__foreground";

const CANV_WIDTH = "1800";
const CANV_HEIGHT = "1200";

type Info =
{
  "color" : string,
  "p1Name" : string,
  "p2Name" : string
};

const Ingame = (props: any) : JSX.Element => {
  const clientId = props.socketid;
  const [game_socket, disconnect_game_socket] = useSocket('game');
  const roomId: string = props.roomId;
  const setState = props.setGamestate;
  const [GameInfo, setGameInfo] = useState<Info>({"color": "wheat", "p1Name": "P1_empty", "p2Name": "P2_empty"});

  let up_pressed: boolean = false;
  let down_pressed: boolean = false;
  let timeout: ReturnType<typeof setTimeout> | undefined = undefined;

  const keyPressed = (e: KeyboardEvent) => {
    if (up_pressed === false && e.code === "ArrowUp") {
      up_pressed = true;
      // data : GamePlayDto
      game_socket?.emit("keypress", roomId, e.code);
    }
    if (down_pressed === false && e.code === "ArrowDown") {
      down_pressed = true;
      game_socket?.emit("keypress", roomId, e.code);
    }
  };

  const keyReleased = (e: KeyboardEvent) => {
    if (up_pressed === true && e.code === "ArrowUp") {
      up_pressed = false;
      game_socket?.emit("keyrelease", roomId, e.code);
    }
    if (down_pressed === true && e.code === "ArrowDown") {
      down_pressed = false;
      game_socket?.emit("keyrelease", roomId, e.code);
    }
  };


  const gameStart = (p1_id: string, p1_name: string, p2_name: string): void => {
    console.log("시작");
    const color = (p1_id === game_socket?.id) ? ("red") : ("green");
    setGameInfo({"color": color, "p1Name": p1_name, "p2Name": p2_name});
    document.addEventListener("keydown", keyPressed);
    document.addEventListener("keyup", keyReleased);
    game_socket?.off("game_start");
  };

  const gameOver = (winner: string): void => {
    document.removeEventListener("keydown", keyPressed);
    document.removeEventListener("keyup", keyReleased);
    // setIsGameOver(game_socket?.id === winner);
    // isWinner = game_socket?.id === winner;
    // console.log("game_over.", isgameover ? "you win" : "you lose");
    timeout = setTimeout(() => {
      setState(GameState.Lobby);
    }, 5000);
  };

  useEffect(() => {
    console.log("게임으로 들어옴");
    window.addEventListener("keydown", default_keyoff);
    game_socket?.on("game_start", gameStart);
    game_socket?.on("game_over", gameOver);
    game_socket?.emit("ready", clientId, roomId);
    return () => {
      window.removeEventListener("keydown", default_keyoff);
      document.removeEventListener("keydown", keyPressed);
      document.removeEventListener("keyup", keyReleased);
      if (timeout !== undefined) clearTimeout(timeout);
        console.log("게암 페이지 나감");
      disconnect_game_socket();
    };
  }, []);

  return (
    <PlayContainer>
      <CanvasContainer className="CanvasContainer">
        <p className="PlayerName Player1">
          {GameInfo.p1Name}
        </p>
        <Canvas__background
          socket={game_socket}
          width={CANV_WIDTH}
          height={CANV_HEIGHT}
          color={GameInfo.color}
          // isWinner={isWinner}
        />
        <Canvas__foreground
          socket={game_socket}
          width={CANV_WIDTH}
          height={CANV_HEIGHT}
        />
        <button onClick={() => {game_socket?.emit("ready", clientId, roomId);}} >READY</button>
        <p className="PlayerName Player2">
          {GameInfo.p2Name}
        </p>
      </CanvasContainer>
  </PlayContainer>
  );
};

// 키보드 입력이  스크롤 하지 않도록 기본행동 방지
function default_keyoff(e: KeyboardEvent): void {
  if (
    ["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(
      e.code
    ) > -1
  ) {
    e.preventDefault();
    e.stopPropagation();
  }
}

export default Ingame;