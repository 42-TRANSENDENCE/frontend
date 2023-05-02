import { useState, useContext, useEffect } from "react";
import { SocketContext } from "../../contexts/ClientSocket";

import { GameMode, GameState } from "./enum";
import Title from "../../components/Title";
import Lobby from "./Lobby";
import Waiting from "./Waiting";
import { GameContainer } from "./styles";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export interface MatchDTO {
  roomId: string;
  mode: GameMode;
}

const Game = (): JSX.Element => {
  const [gamestate, setGamestate] = useState<GameState>(GameState.Lobby);
  const clientSocket = useContext(SocketContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (clientSocket.connected === false) {
      console.log("[Game] socket not connected");
      clientSocket.connect();
      if (clientSocket.connected == false) {
        console.log("[Game] socket connection failed");
      }
    } else {
      console.log("[Game] socket connected");
    }
    clientSocket.on("socket_error", () => {
      toast.warn("이미 로그인 되어있습니다.");
      navigate("/");
    });
    clientSocket.on("join_error", (data: string) => {
      toast.warn(data);
    });
    clientSocket.on("joined_to_queue", () => {
      console.log("qeueue");
      setGamestate(GameState.Waiting);
    });
    clientSocket.on("out_of_queue", () => {
      console.log("out queue");
      setGamestate(GameState.Lobby);
    });
    clientSocket.on("match_maked", (data: MatchDTO) => {
      console.log("room :", data.roomId);
      navigate("/game/play", {
        state: { room: data.roomId, isPlayer: true },
      });
    });
    clientSocket.emit("login_check");
    return () => {
      clientSocket.emit("leave_queue"); //quit_queue 에서 leave_qeuue로 바뀜
      clientSocket.off("socket_error");
      clientSocket.off("join_error");
      clientSocket.off("joined_to_queue");
      clientSocket.off("out_of_queue");
      clientSocket.off("match_maked");
      console.log(" [ STOP ] : game page");
    };
  }, []);

  const GameByState = (): JSX.Element => {
    return (
      <div className="Body">
        {
          {
            [GameState.Lobby]: <Lobby socket={clientSocket} />,
            [GameState.Waiting]: <Waiting socket={clientSocket} />,
          }[gamestate]
        }
      </div>
    );
  };

  return (
    <GameContainer>
      <Title title="PONG GAME" home={true} search={false} />
      <GameByState />
      <div className="Footer">
        <Title title="PONG GAME" home={false} search={false} />
      </div>
    </GameContainer>
  );
};

export default Game;
