import { useCallback } from "react";
import { io, Socket } from "socket.io-client";

const chat_backurl = "http://127.0.0.1:3095";

const sockets: { [key: string]: Socket } = {};
const useSocket = (key?: string): [Socket | undefined, () => void] => {
  const disconnect = useCallback(() => {
    if (key) {
      sockets[key].disconnect();
      delete sockets[key];
    }
  }, [key]);
  if (!key) return [undefined, disconnect];
  if (!sockets[key]) {
    sockets[key] = io(`${chat_backurl}/${key}`, {
      transports: ["websocket"],
    });
  }

  return [sockets[key], disconnect];
};

export default useSocket;
