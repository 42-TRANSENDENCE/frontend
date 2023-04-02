import { useState, useContext, useEffect } from 'react';
import { SocketContext } from "../../contexts/ClientSocket";

import { GameState } from './enum';
import Title from '../../components/Title';
import Lobby from './Lobby';
import Waiting from './Waiting';
import Ingame from './Ingame';
import { GameContainer } from './styles';

const Game = (): JSX.Element => {
  const [gamestate, setGamestate] = useState(GameState.Lobby);
  const [room, setRoom] = useState(null);
  const clientSocket = useContext(SocketContext);

  useEffect(() => {
    console.log(' [ RENDERING ] : game page : ');
    return () => {
      clientSocket.emit('leave_queue'); //quit_queue 에서 leave_qeuue로 바뀜
      console.log(' [ STOP ] : game page');
    };
  }, []);

  useEffect(() => {
    clientSocket.on('joined_to_queue', () => {
      console.log('qeueue');
      setGamestate(GameState.Waiting);
    });
    clientSocket.on('out_of_queue', () => {
      setGamestate(GameState.Lobby);
    });
    clientSocket.on('enter_to_game', (roomId) => {
      setRoom(roomId);
      console.log('room :', room, roomId);
      setGamestate(GameState.InGame);
    });
    return () => {
      clientSocket.off('joined_to_queue');
      clientSocket.off('out_of_queue');
      clientSocket.off('enter_to_game');
    };
  }, []);

  const GameByState = (): JSX.Element => {
    return  (
      <div className="Body">
        {{
          [GameState.Lobby]   : <Lobby socket={clientSocket} />,
          [GameState.Waiting] : <Waiting socket={clientSocket} />,
          [GameState.InGame]  : <Ingame roomId={room}
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
