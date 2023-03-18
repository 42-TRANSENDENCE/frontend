import {useState, useContext, useEffect} from 'react'
import { GameContext } from '../../contexts/GameSocket';
import Title from '../../components/Title';
import { GameState } from './enum';

import Lobby from './components/Lobby';
import Waiting from './components/Waiting';
import Playing from './components/Playing';
import { GameContainer } from './styles'

import { Window } from "../../components/Window/Window";
import { GameContainer } from "./styles";

const Game = (): JSX.Element => {
  const [gamestate, setGamestate] = useState(GameState.Lobby);
  const [room, setRoom] = useState(null);
  const socket = useContext(GameContext);

  useEffect(() => {
    console.log(" [ RENDERING ] : game page : ");
    socket.emit("lobby_initialize");
    return () => {
      socket.emit("lobby_terminate");
      socket.emit("quit_queue");
      console.log(" [ STOP ] : game page");
    };
  }, []);

  useEffect(() => {
    socket.on("joined_to_queue", () => {
      console.log("qeueue");
      setGamestate(GameState.Waiting);
    });
    socket.on("out_of_queue", () => {
      setGamestate(GameState.Lobby);
    });
    socket.on("enter_to_game", (roomId) => {
      setRoom(roomId);
      console.log("room :", room, roomId);
      setGamestate(GameState.InGame);
    });
    return () => {
      socket.off("joined_to_queue");
      socket.off("out_of_queue");
      socket.off("enter_to_game");
    };
  }, []);

  const GameByState = (): JSX.Element => {
    if (gamestate === GameState.Lobby) return <GameLobby socket={socket} />;
    else if (gamestate == GameState.SelectMode)
      return <GameSelectMode socket={socket} />;
    else if (gamestate === GameState.Waiting)
      return <GameWaiting socket={socket} />;
    else if (gamestate === GameState.InGame)
      return (
        <GamePlay socket={socket} roomId={room} setGamestate={setGamestate} />
      );
    return <h1>ERROR</h1>;
  };

  const GameByState = (): JSX.Element => {
    if (gamestate === GameState.Lobby)
      return <Lobby socket={socket} />;
    else if (gamestate === GameState.Waiting)
      return <Waiting socket={socket} />;
    else if (gamestate === GameState.InGame)
      return (
        <Playing socket={socket} roomId={room} setGamestate={setGamestate} />
      );
    return <h1>ERROR</h1>;
  };

  return (
    <GameContainer>
<<<<<<< HEAD
      <div className="Title">
          <Title title="PONG GAME" home={true}/>
      </div>
      <div className="Body">
        <GameByState "Body"/>
      </div>
      <div className="Title">
          <Title title=""/>
      </div>
    </GameContainer>
  )
}
=======
      <Window title="Pong Game" sidebarToggle={true} width="95%" height="95%">
        <GameByState />
      </Window>
    </GameContainer>
  );
};
>>>>>>> develop

export default Game;
