import {useState, useContext, useEffect} from 'react'
import { GameContext } from '../../contexts/GameSocket';
import { GameState } from './components/enums';
import { GameLobby } from './components/GameLobby';
import { GameWaiting } from './components/GameWaiting';
import { GamePlay } from './components/GamePlay';
import './styles/Game.css'

const Game = () : JSX.Element => {
  const [gamestate, setGamestate] = useState(GameState.Waiting);
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

  return (
    <div className='game__container'>
      {
        (gamestate === GameState.Lobby) ? (
          <GameLobby socket={socket}/>
        ) : ( (gamestate === GameState.Waiting) ? (
          <GameWaiting socket={socket}/>
        ) : ( (gamestate === GameState.InGame) ? (
          <GamePlay socket={socket} roomId={room} setGamestate={setGamestate}/>
        ) : (
          null
        )))
      }
    </div>
  )
}

export default Game