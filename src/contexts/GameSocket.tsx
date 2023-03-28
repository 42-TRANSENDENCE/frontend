import { createContext } from "react"
import {io, Socket} from 'socket.io-client'


const ServerPublicIp = "44.195.129.81";
const ServerPort = "80";

const SocketAddr = "ws://"+ServerPublicIp+":"+ServerPort+"/game"

export const gameSocket = io(SocketAddr, {
                              transports: ["websocket"]
                            });

export const GameContext = createContext<Socket>(gameSocket);
