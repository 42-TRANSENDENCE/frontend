import { useCallback, useContext, useEffect, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import {
  useGetFriendList,
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
import { useNavigate } from "react-router-dom";
import { MatchDTO } from "../../pages/Game/Game";
import { GameMode } from "../../pages/Game/enum";
import { toast } from "react-toastify";

interface InvitationInfo {
  from: UserInfo;
  to: UserInfo;
  mode: GameMode;
  roomId: string;
}

function Notification() {
  const navigate = useNavigate();
  const clientSocket = useContext(SocketContext);
  const userFriendList = useGetFriendList().data;
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
    clientSocket.emit("friends_status");
  }, [userFriendList]);

  useEffect(() => {
    clientSocket.on("updateInviteList", (data: InvitationInfo[] | null) => {
      setInvitationList(data);
    });

    clientSocket.on("match_maked", (data: MatchDTO) => {
      console.log("match_maked :", data.roomId);
      navigate("/game/play", { state: { room: data.roomId, isPlayer: true } });
    });

    clientSocket.on("accept_error", (data: string) => {
      toast.warn(data);
    });

    clientSocket.emit("getinvitaionlist");

    return () => {
      clientSocket.off("invited");
      clientSocket.off("match_maked");
      clientSocket.off("accept_error");
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
                {inviteInfo.mode} game from "{inviteInfo.from.nickname}"
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
