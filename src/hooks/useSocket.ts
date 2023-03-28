import { useCallback } from "react";
import { io, Socket } from "socket.io-client";

const server_public_ip = import.meta.env.VITE_AWS_URL ;
const server_port = import.meta.env.VITE_AWS_PORT;

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
    sockets[key] = io(`ws://${server_public_ip}:${server_port}/${key}`, {
      transports: ["websocket"],
    });
  }
  return [sockets[key], disconnect];
};

export default useSocket;
