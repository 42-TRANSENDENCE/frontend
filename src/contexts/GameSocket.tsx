import { createContext } from "react"
import {io, Socket} from 'socket.io-client'

export const gameSocket = io("ws://44.195.129.81:8181/game", {
                              transports: ["websocket"]
                            });

export const GameContext = createContext<Socket>(gameSocket);
