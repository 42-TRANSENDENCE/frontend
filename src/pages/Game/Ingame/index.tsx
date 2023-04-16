import { useContext, useEffect, useState } from "react";
import useSocket from '../../../hooks/useSocket';
import { PlayContainer, CanvasContainer } from "./styles";

import Canvas__background from "./Canvas__background";
import Canvas__foreground from "./Canvas__foreground";
import { useLocation, useNavigate } from "react-router-dom";
import { SocketContext } from "../../../contexts/ClientSocket";
import { Socket } from "socket.io-client";

const CANV_WIDTH = "1800";
const CANV_HEIGHT = "1200";

type GameInfo =
{
  "color" : string,
  "p1Name" : string,
  "p2Name" : string
};

interface GameStartType{
  p1Id : string;
  p1Name : string;
  p2Name : string
}

const Ingame = () : JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();
  const clientSocket : Socket = useContext(SocketContext);
  const state = location.state as { room : string | null, isPlayer : boolean | undefined};
  const roomId : string | null = state?.room;
  const isPlayer : boolean | undefined = state?.isPlayer;
  const [game_socket, disconnect_game_socket] = useSocket('game');
  const [GameInfo, setGameInfo] = useState<Info>({"color": "wheat", "p1Name": "P1_empty", "p2Name": "P2_empty"});

  let up_pressed: boolean = false;
  let down_pressed: boolean = false;
  let timeout: ReturnType<typeof setTimeout> | undefined = undefined;

  const keyPressed = (e: KeyboardEvent) => {
    if (up_pressed === false && e.code === "ArrowUp") {
      up_pressed = true;
      game_socket?.emit("keypress", {roomId : roomId, keyCode : e.code});
    }
    if (down_pressed === false && e.code === "ArrowDown") {
      down_pressed = true;
      game_socket?.emit("keypress", {roomId : roomId, keyCode : e.code});
    }
  };

  const keyReleased = (e: KeyboardEvent) => {
    if (up_pressed === true && e.code === "ArrowUp") {
      up_pressed = false;
      game_socket?.emit("keyrelease", {roomId : roomId, keyCode : e.code});
    }
    if (down_pressed === true && e.code === "ArrowDown") {
      down_pressed = false;
      game_socket?.emit("keyrelease", {roomId : roomId, keyCode : e.code});
    }
  };

  const sendReady = () : void => {
    game_socket?.emit("ready", {userId : clientSocket.id,  roomId});
    console.log(`ready event보냄. : game_socket id : ${game_socket?.id}
    client_id : ${clientSocket.id} 
    room id : ${roomId}`);
  }

  const gameStart = (start_data : GameStartType): void => {
    const p1_id : string = start_data.p1Id;
    const p1_name : string = start_data.p1Name;
    const p2_name : string = start_data.p2Name;
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
    timeout = setTimeout(() => {
      navigate('/game');
    }, 5000);
  };

  useEffect(() => {
    console.log("게임으로 들어옴");
    window.addEventListener("keydown", default_keyoff);
    game_socket?.on("game_start", gameStart);
    game_socket?.on("game_over", gameOver);
    sendReady();
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