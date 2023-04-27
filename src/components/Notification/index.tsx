import { useCallback, useContext, useEffect, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import {
  useReceivedFriendList,
  usePendingFriendList,
} from "../../hooks/query/friend";
import {
  useApproveFriend,
  useDeleteRequestFriend,
  useRefuseFriend,
} from "../../hooks/mutation/friend";
import { UserInfo } from "../../hooks/query/user";
import { NotificationContainer } from "./styles";
import Button from "@mui/material/Button";
import { SocketContext } from "../../contexts/ClientSocket";
import { GameMode } from "../../pages/Game/enum";
import { ClientStatus } from "../OnlineList";
import { useNavigate } from "react-router-dom";

export interface ClientInfo {
  socketId: string;
  user: UserInfo;
  roomId: string | undefined;
  status: ClientStatus;
}

interface InvitationInfo {
  from: ClientInfo;
  to: ClientInfo;
  mode: GameMode;
  roomId: string;
}

function Notification() {
  const navigate = useNavigate();
  const clientSocket = useContext(SocketContext);
  const userFriendReceived = useReceivedFriendList().data;
  const friendReceivedList: UserInfo[] = userFriendReceived;
  const userFriendPending = usePendingFriendList().data;
  const friendPendingList: UserInfo[] = userFriendPending;
  const approveFriend = useApproveFriend();
  const refuseFriend = useRefuseFriend();
  const deleteRequestFriend = useDeleteRequestFriend();
  const [invitationList, setInvitationList] = useState<InvitationInfo[] | null>(
    null
  );

  const onClickApproveFriend = useCallback(
    (id: number) => {
      approveFriend.mutate(id);
    },
    [friendReceivedList, approveFriend]
  );

  const onClickRefuseRequestFriend = useCallback(
    (id: number) => {
      refuseFriend.mutate(id);
    },
    [friendReceivedList, refuseFriend]
  );

  const onClickDeleteRequestFriend = useCallback(
    (id: number) => {
      deleteRequestFriend.mutate(id);
    },
    [friendPendingList, deleteRequestFriend]
  );

  const onClickAcceptInvitation = (inviteInfo: InvitationInfo) => {
    console.log(inviteInfo);
    clientSocket.emit("accept", inviteInfo);
  };

  const onClickRefuseInvitation = (inviteInfo: InvitationInfo) => {
    console.log(inviteInfo);
    clientSocket.emit("refuse", inviteInfo);
  };

  useEffect(() => {
    clientSocket.on("updateInviteList", (data: InvitationInfo[] | null) => {
      setInvitationList(data);
    });

    clientSocket.on("match_maked", (data: any) => {
      console.log("match_maked :", data.roomId);
      navigate("/game/play", { state: { room: data.roomId, isPlayer: true } });
    });

    clientSocket.emit("getinvitaionlist");

    return () => {
      clientSocket.off("invited");
      clientSocket.off("match_maked");
    };
  }, []);

  return (
    <NotificationContainer>
      <Scrollbars autoHide style={{}} onScrollFrame={() => {}}>
        <h1>NOTIFICATION</h1>
        {friendReceivedList?.map((userinfo: any) => {
          return (
            <div className="Notification">
              <h3>Friend Received ({userinfo.nickname})</h3>
              <div>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => onClickApproveFriend(userinfo.id)}
                >
                  <h3>✔️</h3>
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => onClickRefuseRequestFriend(userinfo.id)}
                >
                  <h3>✖️</h3>
                </Button>
              </div>
            </div>
          );
        })}
        {friendPendingList?.map((userinfo: any) => {
          return (
            <div className="Notification">
              <h3>Friend Pending ({userinfo.nickname})</h3>
              <div>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => onClickDeleteRequestFriend(userinfo.id)}
                >
                  <h3>✖️</h3>
                </Button>
              </div>
            </div>
          );
        })}
        {invitationList?.map((inviteInfo: InvitationInfo, index: number) => {
          return (
            <div className="Notification" key={index}>
              <h3>
                {inviteInfo.mode} game from "{inviteInfo.from.user.nickname}"
              </h3>
              <div>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => onClickAcceptInvitation(inviteInfo)}
                >
                  <h3>✔️</h3>
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => onClickRefuseInvitation(inviteInfo)}
                >
                  <h3>✖️</h3>
                </Button>
              </div>
            </div>
          );
        })}
      </Scrollbars>
    </NotificationContainer>
  );
}

export default Notification;
