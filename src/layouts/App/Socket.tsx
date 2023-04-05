import { Navigate } from "react-router-dom";
import { ClientSocket, SocketContext } from '../../contexts/ClientSocket';

const Socket = () => {
  return (
    <SocketContext.Provider value={ClientSocket} >
      <Navigate to={'/home'} />
    </SocketContext.Provider>
  );
}

export default Socket;
