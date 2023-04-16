import { useEffect, useState } from "react";
import { ClientStatus, User } from "../index"
import { Socket } from "socket.io-client";
import IconButton from '@mui/material/IconButton';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { InviteGameButton } from "./styles";
import  Modal  from "../../Modal";

import { BigButton } from "../../Button";
import normalButton from "../../../assets/bigButton/normalButton.svg";
import chaosButton from "../../../assets/bigButton/chaosButton.svg";
import cancelButton from "../../../assets/bigButton/cancelButton.svg";
import { GameMode, GameState } from "../../../pages/Game/enum";
import { UserInfo } from "../../../hooks/query/user";
import { Navigate, useNavigate } from "react-router-dom";

interface spectateDto
{
  roomId : string | null,
  msg : string | null
}

const InviteButton = ( props : any ) => {
  const [open, setOpen] = useState<boolean>(false);
  const clientSocket : Socket = props.socket;
  const userInfo : User= props.userinfo;

  return (
    <InviteGameButton>
      <IconButton className="icon" color="secondary" size="large" edge="end" onClick={() => setOpen(!open)}>
        <SportsEsportsIcon className="icon"/>
      </IconButton>

      <Modal onCloseModal={()=>{setOpen(false)}} show={open} showCloseButton={true}>
        {{
          [ClientStatus.ONLINE] : <GameInviteWindow socket={clientSocket} userInfo={userInfo}/>,
          [ClientStatus.INGAME] : <GameSpectateWindow socket={clientSocket} userInfo={userInfo}/>,
          [ClientStatus.OFFLINE] : null,
        }[userInfo.status] }
      </Modal>
    </InviteGameButton>
  )
}

export default InviteButton;


const GameInviteWindow = (props : any) : JSX.Element => {
  const [status, setStatus] = useState<GameState>(GameState.Lobby);

  const socket : Socket = props.socket;
  const inviteeInfo : UserInfo = props.userInfo;
  
  function Invite (mode : GameMode) : void {
    console.log(`${inviteeInfo.nickname}에게 게임 초대 보냄 (${mode})`)
    socket.emit("invite", {to : inviteeInfo.id, mode: mode});
    setStatus(GameState.Waiting);
  }

  function Cancel () : void {
    console.log(`취소`)
    socket.emit("cancleInvitation", inviteeInfo.id);
    setStatus(GameState.Lobby);
  }

  const InvitationLobby = () : JSX.Element => {
    return (
      <div className="gameInviteWindow ModalChild">
        <h6>게임 같이하기</h6>
        <BigButton className="big" img_url={normalButton} onClick={()=>{Invite(GameMode.NORMAL);}}/>
        <BigButton className="big" img_url={chaosButton} onClick={()=>{Invite(GameMode.SPECIAL);}}/>
      </div>
    );
  }

  const InvitationWaitng = () : JSX.Element => {
    const navigate = useNavigate();
    useEffect(() => {
      console.log("Waiting for invitee");
      socket.on("invitationCanceled", () => {
        console.log("invitation Canceled");
        setStatus(GameState.Lobby);
      });
      socket.on('accepted', (data : any) => {
        console.log('accepted :', data.roomId);
        navigate('/game/play', {state: {room: data.roomId, isPlayer: true}});
      });
      return () => {
        socket.off("invitationCanceled");
        socket.off('accepted');
        Cancel();
      }
    }, [])
    return (
      <div>
        <div className="gameInviteWindow ModalChild">
          <h6>기다리는 중</h6>
          <BigButton className="big" img_url={cancelButton} onClick={()=>{setStatus(GameState.Lobby);}}/>
        </div>
      </div>
    )
  }

  return (
    <>
      {{
        [GameState.Lobby] : <InvitationLobby />,
        [GameState.Waiting] : <InvitationWaitng />,
        [GameState.InGame] : null,
      }[status]}
    </>
  );
}

const GameSpectateWindow = (props : any) : JSX.Element => {
  const navigate = useNavigate();
  const socket : Socket = props.socket;
  const playerInfo : User = props.userInfo;

  function requestSpectate(userId : number) {
    console.log(`관전 try to ${userId}`);
    socket.emit("spectate", {playerId : userId});
  }

  useEffect(() => {
    socket.on("spectate", (data : spectateDto) => {
      const {roomId, msg} = data;
      if (roomId === null) {
        console.log(`[관전 실패] : ${msg}`);
      } else {
        navigate('/game/play', {state: {room: roomId, isPlayer: false}});
      }
    });
  }, []);

  return (
    <div className="gameSpectateWindow ModalChild">
      <h6>게임 관전하기</h6>
      <BigButton className="big" img_url={normalButton} onClick={() => {requestSpectate(playerInfo.id);}}/>
    </div>
  );
}
