import { createContext } from "react"
import {io, Socket} from 'socket.io-client'

const Protocol = "ws";
// const ServerPublicIp = process.env.MY_PUBLIC_IP;
const ServerPublicIp = "localhost";
const ServerPort = "8181";
const GameNamespace = "game"

const SocketAddr = Protocol+"://"+ServerPublicIp+":"+ServerPort+"/"+GameNamespace
// export const gameSocket = io("ws://44.195.129.81:8181/game", {
//                               transports: ["websocket"]
//                             });

export const gameSocket = io(SocketAddr, {
                              transports: ["websocket"]
                            });

export const GameContext = createContext<Socket>(gameSocket);
