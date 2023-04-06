import { useCallback } from 'react';
import { Scrollbars } from "react-custom-scrollbars";
import { UserStatus } from "./styles";
import { useGetFriendList } from "../../hooks/query/friend";
import IconButton from '@mui/material/IconButton';
import ChatIcon from '@mui/icons-material/Chat';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

interface User {
  id: number;
  nickname: string;
  status: 'OnLine' | 'OffLine' | 'InGame';
}

const onlineList = function () {
  const response = useGetFriendList().data;
  const friendList: User[] = response;
  if (friendList) {
    friendList.forEach((element) => {
      element.status = 'OnLine';
    });
  }

  const onClickSendDm = useCallback(() => {

    }, []
  );

  const onClickInviteGame = useCallback(() => {
    
  }, []
);

  return (
    <div
      style={{
        borderRadius: "2rem",
        border: "0.3rem solid black",
        height: "100%",
        width: "90%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* onlineList */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          fontSize: "2rem",
          overflow: "auto",
        }}
      >
        <div style={{ fontSize: "3rem", paddingLeft: "1rem" }}>ONLINE</div>
        <Scrollbars autoHide style={{}} onScrollFrame={() => { }}>
          {friendList?.map((userinfo: any) => {
            if (userinfo?.status === "OffLine") return;
            return (
              <div>
                <UserStatus status={userinfo.status} />
                {userinfo.nickname}
                <IconButton color="success" size="large" edge="end" onClick={onClickSendDm}>
                  <ChatIcon />
                </IconButton>
                <IconButton color="secondary" size="large" edge="end" onClick={onClickInviteGame}>
                  <SportsEsportsIcon />
                </IconButton>
              </div>
            );
          })}
        </Scrollbars>
      </div>
      {/* offlineList */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          fontSize: "2rem",
          overflow: "auto",
        }}
      >
        <div style={{ fontSize: "3rem", paddingLeft: "1rem" }}>OFFLINE</div>
        <Scrollbars autoHide style={{}} onScrollFrame={() => { }}>
          {friendList?.map((userinfo: any) => {
            if (userinfo?.status !== "OffLine") return;
            return (
              <div>
                <UserStatus status={userinfo.status} />
                {userinfo.nickname}
              </div>
            );
          })}
        </Scrollbars>
      </div>
    </div>
  );
};

export default onlineList;
