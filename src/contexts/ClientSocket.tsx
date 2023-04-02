import { createContext } from "react"
import {io, Socket} from 'socket.io-client'

const ServerPublicIp = import.meta.env.VITE_AWS_URL;
const ServerPort = import.meta.env.VITE_AWS_PORT;

const SocketAddr = `ws://${ServerPublicIp}:${ServerPort}`;

export const ClientSocket = io(SocketAddr, {transports: ["websocket"] });
export const SocketContext = createContext<Socket>(ClientSocket);
