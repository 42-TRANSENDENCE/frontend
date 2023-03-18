import React from 'react'
import { useEffect } from "react";

const Lobby = (props: any) : JSX.Element => {
    const game_socket = props.socket;

    useEffect(() => {
        console.log("GameLobby 입장");
        return () => {
        console.log("GameLobby 나감");
        };
    }, []);

    return (
        <div>
        </div>
    )
};

export default Lobby;


/* =================================================== */

const LobbyContainer = styled.div`


`