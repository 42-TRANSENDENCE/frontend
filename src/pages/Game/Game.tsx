import { useState, useContext, useEffect } from 'react';
import { GameContext } from '../../contexts/GameSocket';
import Title from '../../components/Title';
import { GameState } from './enum';

import Lobby from './Lobby';
import Waiting from './Waiting';
import Ingame from './Ingame';
import { GameContainer } from './styles';

// import { Window } from '../../components/Window/Window';

const Game = (): JSX.Element => {
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
    };
  }, []);

  const GameByState = (): JSX.Element => {
    if (gamestate === GameState.Lobby) return <Lobby socket={socket} />;
    else if (gamestate === GameState.Waiting)
      return <Waiting socket={socket} />;
    else if (gamestate === GameState.InGame)
      return (
        <Ingame socket={socket} roomId={room} setGamestate={setGamestate} />
      );
    return <h1>ERROR</h1>;
  };

  return (
    <GameContainer>
      <div className="Title">
        <Title title="PONG GAME" home={true} search={false} />
      </div>
      <div className="Body">
        <GameByState />
      </div>
      <div className="Footer">
        <Title title="PONG GAME" home={false} search={false} />
      </div>
    </GameContainer>
  );
};

export default Game;
