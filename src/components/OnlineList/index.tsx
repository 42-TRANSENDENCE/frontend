import { useCallback, useContext, useEffect, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import {
  FriendListContainer,
  OnOffLineList,
  Header,
  UserStatus,
  SingleUser,
} from "./styles";
import { useGetFriendList } from "../../hooks/query/friend";
import IconButton from "@mui/material/IconButton";
import ChatIcon from "@mui/icons-material/Chat";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import InviteButton from "./InviteButton";
// import { useGetFriendList } from '../../hooks/query/friend';
import { useSendDm } from "../../hooks/mutation/chat";
import { SocketContext } from "../../contexts/ClientSocket";

export enum ClientStatus {
  ONLINE = "ONLINE",
  INGAME = "INGAME",
  OFFLINE = "OFFLINE",
}

interface Status {
  userId: number;
  status: ClientStatus;
}

export interface User {
  id: number;
  nickname: string;
  status: ClientStatus;
}

// interface FriendList {
//   id: number;
//   nickname: string;
// }

const onlineList = function () {
  const clientSocket = useContext(SocketContext);
  const sendDM = useSendDm();
  // const response = useGetFriendList().data;
  // const getFriendList: FriendList[] = response;
  const [friendList, setFriendList] = useState<User[]>([]);

  // useEffect(() => {
  //   if (getFriendList) {
  //     const updatedFriendList = getFriendList.map((friend) => {
  //       return {
  //         id: friend.id,
  //         nickname: friend.nickname,
  //         status: ClientStatus.OFFLINE,
  //       };
  //     });
  //     setFriendList(updatedFriendList);
  //   }
  // }, [getFriendList]);

  useEffect(() => {
    clientSocket.on("friends_status", (data: User[]) => {
      setFriendList(data);
    });
    clientSocket.emit("friends_status");

    return () => {
      clientSocket.off("friends_status");
    };
  }, []);

  useEffect(() => {
    clientSocket.on("change_status", (data: Status) => {
      setFriendList((prevFriendList) => {
        const newFriendList = prevFriendList.map((friend) => {
          if (friend.id === data.userId) {
            return {
              ...friend,
              status: data.status,
            };
          }
          return friend;
        });
        return newFriendList;
      });
    });

    return () => {};
  }, []);

  const onClickSendDm = useCallback((userinfo: User) => {}, []);

  return (
    <FriendListContainer>
      <OnOffLineList className="Online">
        <Header>ONLINE</Header>
        <Scrollbars autoHide style={{}} onScrollFrame={() => {}}>
          {friendList?.map((userinfo: User) => {
            if (userinfo?.status === "ONLINE" || userinfo?.status === "INGAME")
              return (
                <SingleUser key={userinfo.id}>
                  <UserStatus status={userinfo.status} />
                  {userinfo.nickname}
                  <IconButton
                    color="success"
                    size="large"
                    edge="end"
                    onClick={() => onClickSendDm(userinfo)}
                  >
                    <ChatIcon />
                  </IconButton>
                  <InviteButton socket={clientSocket} userinfo={userinfo} />
                </SingleUser>
              );
          })}
        </Scrollbars>
      </OnOffLineList>
      <OnOffLineList className="Offline">
        <Header>OFFLINE</Header>
        <Scrollbars autoHide style={{}} onScrollFrame={() => {}}>
          {friendList?.map((userinfo: User) => {
            if (userinfo?.status !== "ONLINE" && userinfo?.status !== "INGAME")
              return (
                <div key={userinfo.id}>
                  <UserStatus status={userinfo.status} />
                  {userinfo.nickname}
                </div>
              );
          })}
        </Scrollbars>
      </OnOffLineList>
    </FriendListContainer>
  );
};

export default onlineList;
