import { useState, useContext, useEffect } from 'react';
import { GameContext } from '../../contexts/GameSocket';
// import useSocket from '../../hooks/useSocket';

import { GameState } from './enum';
import Title from '../../components/Title';
import Lobby from './Lobby';
import Waiting from './Waiting';
import Ingame from './Ingame';
import { GameContainer } from './styles';

const Game = (): JSX.Element => {
  // const [chat_socket, disconnect_game_socket] = useSocket('game');
  const [gamestate, setGamestate] = useState(GameState.Lobby);
  const [room, setRoom] = useState(null);
  const socket = useContext(GameContext);

  useEffect(() => {
    console.log(' [ RENDERING ] : game page : ');
    socket.emit('lobby_initialize');
    return () => {
      socket.emit('lobby_terminate');
      socket.emit('quit_queue');
      console.log(' [ STOP ] : game page');
    };
  }, []);

  useEffect(() => {
    socket.on('joined_to_queue', () => {
      console.log('qeueue');
      setGamestate(GameState.Waiting);
    });
    socket.on('out_of_queue', () => {
      setGamestate(GameState.Lobby);
    });
    socket.on('enter_to_game', (roomId) => {
      setRoom(roomId);
      console.log('room :', room, roomId);
      setGamestate(GameState.InGame);
    });
    return () => {
      socket.off('joined_to_queue');
      socket.off('out_of_queue');
      socket.off('enter_to_game');
      // disconnect_game_socket();
    };
  }, []);

  const GameByState = (): JSX.Element => {
    return  (
      <div className="Body">
        {{
          [GameState.Lobby]   : <Lobby socket={socket} />,
          [GameState.Waiting] : <Waiting socket={socket} />,
          [GameState.InGame]  : <Ingame socket={socket}
                                        roomId={room}
                                        setGamestate={setGamestate} />
        }[gamestate] }
      </div>
    ) ;
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
