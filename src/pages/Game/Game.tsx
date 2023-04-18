import { useState, useContext, useEffect } from "react";
import { SocketContext } from "../../contexts/ClientSocket";

import { GameState } from "./enum";
import Title from "../../components/Title";
import Lobby from "./Lobby";
import Waiting from "./Waiting";
import { GameContainer } from "./styles";
import { useNavigate } from "react-router-dom";

const Game = (): JSX.Element => {
  const [gamestate, setGamestate] = useState<GameState>(GameState.Lobby);
  const clientSocket = useContext(SocketContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(` [ RENDERING ] : game page`);
    return () => {
      clientSocket.emit("leave_queue"); //quit_queue 에서 leave_qeuue로 바뀜
      console.log(" [ STOP ] : game page");
    };
  }, []);

  useEffect(() => {
    clientSocket.on("joined_to_queue", () => {
      console.log("qeueue");
      setGamestate(GameState.Waiting);
    });
    clientSocket.on("out_of_queue", () => {
      setGamestate(GameState.Lobby);
    });
    clientSocket.on("match_maked", (data: any) => {
      console.log("room :", data.roomId);
      navigate("/game/play", { state: { room: data.roomId, isPlayer: true } });
    });
    return () => {
      clientSocket.off("joined_to_queue");
      clientSocket.off("out_of_queue");
      clientSocket.off("match_maked");
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
