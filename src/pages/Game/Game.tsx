import {useState, useContext, useEffect} from 'react'
import { GameContext } from '../../contexts/GameSocket';
import { GameState } from './components/enums';
import { GameLobby } from './Lobby/GameLobby';
import { GameWaiting } from './Waiting/GameWaiting';
import { GamePlay } from './Ingame/GamePlay';

import GlobalStyles from '../../styles/global';
import {Window} from '../../styles/Window'; 
import {GameContainer} from './styles';

const Game = () : JSX.Element => {
  const [gamestate, setGamestate] = useState(GameState.InGame);
  const [room, setRoom] = useState(null);
  const socket = useContext(GameContext);

  useEffect(() => {
    console.log(" [ RENDERING ] : game page : ")
    socket.emit("lobby_initialize");
    return () => {
      socket.emit("lobby_terminate")
      socket.emit("quit_queue");
      console.log(" [ STOP ] : game page")
    }
  }, [])

  useEffect(() => {
    socket.on("joined_to_queue", () => {
      console.log("qeueue");
      setGamestate(GameState.Waiting);
    });
    socket.on("out_of_queue", () => {
      setGamestate(GameState.Lobby);
    })
    socket.on("enter_to_game", (roomId) => {
      setRoom(roomId)
      console.log("room :",room, roomId);
      setGamestate(GameState.InGame);
    })
    return () => {
      socket.off("joined_to_queue");
      socket.off("out_of_queue");
      socket.off("enter_to_game");
    }
  }, [])

  const GameByState = () : JSX.Element => {
    if (gamestate === GameState.Lobby)
      return <GameLobby socket={socket}/>
    else if (gamestate === GameState.Waiting)
      return <GameWaiting socket={socket}/>
    else if (gamestate === GameState.InGame)
      return <GamePlay socket={socket} roomId={room} setGamestate={setGamestate}/>
    return <h1>ERROR</h1>
  }

  return (
    <GameContainer>
      <GlobalStyles />
      <Window title="Pong Game" width="95%" height="95%">
        <GameByState />
      </Window>
    </GameContainer>
  );

}

export default Game