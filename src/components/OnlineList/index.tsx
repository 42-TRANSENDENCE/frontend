import { Scrollbars } from "react-custom-scrollbars";
import styled from "styled-components";
import { UserStatus } from "./styles";

const UserInfos = [
  { name: "userinfo1", status: "online" },
  { name: "userinfo2", status: "chat" },
  { name: "userinfo3", status: "game" },
  { name: "userinfo4", status: "offline" },
  { name: "userinfo5", status: "offline" },
  { name: "userinfo6", status: "online" },
  { name: "userinfo7", status: "chat" },
  { name: "userinfo8", status: "online" },
  { name: "userinfo9", status: "chat" },
  { name: "userinfo10", status: "chat" },
  { name: "userinfo11", status: "online" },
  { name: "userinfo12", status: "offline" },
  { name: "userinfo13", status: "offline" },
  { name: "userinfo14", status: "offline" },
  { name: "userinfo15", status: "offline" },
  { name: "userinfo16", status: "offline" },
  { name: "userinfo17", status: "offline" },
  { name: "userinfo18", status: "offline" },
  { name: "userinfo19", status: "offline" },
  { name: "userinfo20", status: "chat" },
];

const onlineList = function ({ Flex }: { Flex: number }) {
  return (
    <div
      style={{
        flex: Flex,
        borderRadius: "2rem",
        border: "0.3rem solid black",
        height: "100%",
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
        <div style={{ fontSize: "3rem", paddingLeft: "1rem" }}>online</div>
        <Scrollbars autoHide style={{}} onScrollFrame={() => {}}>
          {UserInfos.map((userinfo: any) => {
            if (userinfo?.status === "offline") return;
            return (
              <div>
                <UserStatus status={userinfo.status} />
                {userinfo.name + "     " + userinfo.status}
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
        <div style={{ fontSize: "3rem", paddingLeft: "1rem" }}>offline</div>
        <Scrollbars autoHide style={{}} onScrollFrame={() => {}}>
          {UserInfos.map((userinfo: any) => {
            if (userinfo?.status !== "offline") return;
            return (
              <div>
                <UserStatus status={userinfo.status} />
                {userinfo.name + "    " + userinfo.status}
              </div>
            );
          })}
        </Scrollbars>
      </div>
    </div>
  );
};

export default onlineList;
