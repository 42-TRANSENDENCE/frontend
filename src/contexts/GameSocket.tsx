import { createContext } from "react"
import {io, Socket} from 'socket.io-client'
const ServerPublicIp = "localhost";
const ServerPort = "3000";

const SocketAddr = "ws://"+ServerPublicIp+":"+ServerPort+"/game"

export const gameSocket = io(SocketAddr, {
                              transports: ["websocket"]
                            });

export const GameContext = createContext<Socket>(gameSocket);
