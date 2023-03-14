import GlobalStyles from "../../../styles/global";
import home from "../../../assets/home.svg";
import game from "../../../assets/game.svg";
import chat from "../../../assets/chat.svg";
import logout from "../../../assets/logout.svg";
import setting from "../../../assets/setting.svg";
import { useCallback, useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import CreateRoomModal from "../../../components/CreateRoomModal";
import {
  BrowserHeader,
  Container,
  DotThree,
  InnerWindow,
  OuterWindow,
} from "./style";
import styled from "styled-components";

const chat_backurl = "http://127.0.0.1:3095";

function V2rooms({ socket }: { socket: any }) {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);

  const token = localStorage.getItem("jwt_token");
  const options = {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  };

  const {
    data: rooms,
    isLoading,
    refetch,
  } = useQuery<any>(["roomlist"], () =>
    fetch(chat_backurl + `/api/room_list/`).then((res) => res.json())
  );
  const { data: user, isLoading: isLoadingUser } = useQuery<any>(["user"], () =>
    fetch(chat_backurl + "/api/user", options).then((res) => res.json())
  );
  // if (user) console.log(user);
  console.log("rooms데이터: ", rooms);

  const queryClient = useQueryClient();

  const onNewRoom = useCallback(
    async (data: any) => {
      console.log("newRoom 데이터: ", data);
      queryClient.setQueryData(["roomlist"], () => {
        return [...rooms, data];
      });
    },
    [queryClient, rooms]
  );

  // const onRemoveRoom = useCallback((data: any) => refetch(), [refetch]);
  const onRemoveRoom = useCallback(
    async (data: any) => {
      // console.log("removeRoom 데이터: ", data);
      // console.log("rooms.data: ", rooms.data);
      const new_rooms = rooms.filter(
        (room: any) => Number(room.id) !== Number(data)
      );
      // console.log("rooms.data후: ", rooms.data);
      queryClient.setQueryData(["roomlist"], () => {
        return new_rooms;
      });
    },
    [queryClient, rooms]
  );

  useEffect(() => {
    console.log("v2_rooms에 진입하셨습니다.");
    socket?.on("newRoom", onNewRoom);
    socket?.on("removeRoom", onRemoveRoom);
    return () => {
      console.log("v2_rooms에서 나가셨습니다.");
      socket?.off("newRoom", onNewRoom);
      socket?.off("removeRoom", onRemoveRoom);
    };
  }, [onNewRoom, onRemoveRoom]);

  const onEnterEvent = useCallback(
    (e: any) => {
      fetch(chat_backurl + `/api/room_list/room/${e.target.dataset.id}`)
        .then((res) => res.json())
        .then((data) => {
          /* 기존 참여자 */
          console.log("방 입장 데이터: ", data);
          console.log("error1", user);
          const is_member = data.memberList.find(
            (memberName: any) => memberName === user.username
          );
          console.log("error2");
          if (is_member) {
            navigate(`${e.target.dataset.id}/chat`);
            return;
          }
          const is_kicked = data.kickList.find(
            (memberName: any) => memberName === user.username
          );
          if (is_kicked) {
            setErrorMessage("강퇴당한 유저입니다.");
            return;
          }
          /* 최초 입장 */
          if (data.status === 0) {
            console.log("공개방 최초 입장하십니다");
            const token = localStorage.getItem("jwt_token");
            fetch(chat_backurl + `/api/room_list/room/${e.target.dataset.id}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({}),
            }).then((res) => {
              console.log(res);
              if (res.status === 200) {
                navigate(`${e.target.dataset.id}/chat`);
              } else {
                setErrorMessage("방에 입장할 수 없습니다.");
              }
            });
            return;
          } else {
            /* 비공개방 */
            const password = prompt("비밀번호를 입력하세요");
            fetch(chat_backurl + `/api/room_list/room/${e.target.dataset.id}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ password }),
            }).then((res) => {
              if (res.status === 200) {
                navigate(`${e.target.dataset.id}/chat`);
                return "OK";
              } else {
                setErrorMessage("비밀번호가 틀렸습니다.");
              }
            });
            return;
          }
        });
    },
    [user]
  );

  const onCloseModal = useCallback(() => {
    setShowCreateRoomModal(
      (prevShowCreateRoomModal) => !prevShowCreateRoomModal
    );
  }, []);

  const onClickHome = () => {
    navigate("/home");
  };

  const onClickLogOut = () => {
    // fetch(awsUrl + "/auth/logout", {
    //   method: "POST",
    //   body: JSON.stringify(""),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // }).then((response) => {
    //   if (response.status === 200) {
    //     window.location.href = "http://localhost:5173/";
    //   } else {
    //     throw new Error("Unexpected response status code");
    //   }
    // });
  };

  const onClickGame = () => {
    navigate("/game");
  };

  const onClickChat = () => {
    window.location.reload();
  };

  if (isLoading || isLoadingUser) return <div>isLoading...</div>;
  return (
    <div>
      <Containers>
        {/* <BrowserHeader> */}
        <DotThree>
          <div className="outer">
            <div className="dot red"></div>
            <div className="dot amber"></div>
            <div className="dot green"></div>
            <div style={{ display: "inline-block" }}>채팅방</div>
            <span>{user.username}님 어서오세요</span>
          </div>
        </DotThree>
        {/* </BrowserHeader> */}
        <div style={{ display: "flex" }}>
          <Workspaces>
            <WorkspaceButton onClick={onClickHome}>
              <img src={home}></img>
            </WorkspaceButton>
            <WorkspaceButton onClick={onClickGame}>
              <img src={game}></img>
            </WorkspaceButton>
            <WorkspaceButton onClick={onClickChat}>
              <img src={chat}></img>
            </WorkspaceButton>
            <WorkspaceButton>
              <img src={setting}></img>
            </WorkspaceButton>
            <WorkspaceButton onClick={onClickLogOut}>
              <img src={logout}></img>
            </WorkspaceButton>
          </Workspaces>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "0 auto",
              marginTop: "1rem",
            }}
          >
            <fieldset
              onClick={() => setErrorMessage("")}
              style={{ border: "none" }}
            >
              <table>
                <thead>
                  <tr>
                    <th>방 제목</th>
                    <th>종류</th>
                    <th>방장</th>
                  </tr>
                </thead>
                <tbody>
                  {rooms?.map((room: any) => {
                    return (
                      <tr data-id={room.id} key={room.id}>
                        <td>
                          {room.title.length > 10
                            ? room.title.slice(0, 10) + "..."
                            : room.title}
                        </td>
                        <td>{room.status !== 0 ? "비밀방" : "공개방"}</td>
                        <td>{room.owner}</td>
                        <td>
                          <button
                            data-password={room.status !== 0 ? "true" : "false"}
                            data-id={room.id}
                            onClick={onEnterEvent}
                          >
                            입장
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {errorMessage && (
                <div style={{ color: "red" }}>{errorMessage}</div>
              )}
              <button
                style={{ display: "block", margin: "0 auto" }}
                onClick={onCloseModal}
              >
                방 만들기
              </button>
              <CreateRoomModal
                show={showCreateRoomModal}
                onCloseModal={onCloseModal}
              />
            </fieldset>
            <Link to="/">
              <span>홈으로</span>
            </Link>
            {/* </OuterWindow> */}
            <Link to="/chat/createUsers">유저들 만들기</Link>
            <Link to="/chat/getUsers/1">1번 유저 쿠키획득</Link>
            <Link to="/chat/getUsers/3">3번 유저 쿠키획득</Link>
            <Link to="/chat/v2_dms/rock11">rock11 유저와 dm하기</Link>
            <Link to="/chat/v2_dms/rock33">rock33 유저와 dm하기</Link>
          </div>
        </div>
      </Containers>
    </div>

    // <Container
    //   style={{
    //     display: "flex",
    //     flexDirection: "column",
    //     alignItems: "center",
    //   }}
    // >
    //   <h1>채팅방</h1>
    //   <span>{user.username}님 어서오세요</span>
    //   <InnerWindow>
    // <BrowserHeader>
    //   <DotThree>
    //     <div className="outer">
    //       <div className="dot red"></div>
    //       <div className="dot amber"></div>
    //       <div className="dot green"></div>
    //     </div>
    //   </DotThree>
    // </BrowserHeader>
    //     <fieldset
    //       onClick={() => setErrorMessage("")}
    //       style={{ border: "none" }}
    //     >
    //       {/* <legend>채팅방 목록</legend> */}
    //       <table>
    //         <thead>
    //           <tr>
    //             <th>방 제목</th>
    //             <th>종류</th>
    //             <th>방장</th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {rooms?.map((room: any) => {
    //             return (
    //               <tr data-id={room.id} key={room.id}>
    //                 <td>{room.title}</td>
    //                 <td>{room.status !== 0 ? "비밀방" : "공개방"}</td>
    //                 <td>{room.owner}</td>
    //                 <td>
    //                   <button
    //                     data-password={room.status !== 0 ? "true" : "false"}
    //                     data-id={room.id}
    //                     onClick={onEnterEvent}
    //                   >
    //                     입장
    //                   </button>
    //                 </td>
    //               </tr>
    //             );
    //           })}
    //         </tbody>
    //       </table>
    //       {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
    //       <button
    //         style={{ display: "block", margin: "0 auto" }}
    //         onClick={onCloseModal}
    //       >
    //         방 만들기
    //       </button>
    //       <CreateRoomModal
    //         show={showCreateRoomModal}
    //         onCloseModal={onCloseModal}
    //       />
    //     </fieldset>
    //   </InnerWindow>

    //   <Link to="/">
    //     <span>홈으로</span>
    //   </Link>
    //   {/* </OuterWindow> */}
    //   <Link to="/chat/createUsers">유저들 만들기</Link>
    //   <Link to="/chat/getUsers/1">1번 유저 쿠키획득</Link>
    //   <Link to="/chat/getUsers/3">3번 유저 쿠키획득</Link>
    //   <Link to="/chat/v2_dms/rock11">rock11 유저와 dm하기</Link>
    //   <Link to="/chat/v2_dms/rock33">rock33 유저와 dm하기</Link>
    // </Container>
  );
}

export const Containers = styled.div`
  display: flex;
  justifiy-contents: space-around;
  flex-direction: column;
  background-color: #00e5ff;
  border: 0.5rem solid black;
  margin: 8vh 10vw;
  height: 42em;
  box-shadow: 20px 20px;
  position: relative;

  // h1 {
  //   color: #FFFFFF;
  //   font-family: 'IBM Plex Mono', monospace;
  //   font-weight: 700;
  //   font-size: 8vw;
  //   line-height: 0.2;
  //   align-items: center;
  //   text-align: center;
  //   // padding: 5% 0;
  //   text-transform: uppercase;
  //   &:hover {
  //     color: black;
  //   }
`;

export const Div = styled.div`
  display: flex;
`;

export const Workspaces = styled.div`
  display: inline-flex;
  flex-grow: 1;
  flex-direction: column;
  border-right: 5px solid black;
  box-sizing: border-box;
  position: absolute;
  top: 8%;
  left: 2%;
`;

export const WorkspaceButton = styled.button`
  color: white;
  font-size: 40px;
  line-height: 70px;
  display: inline-block;
  background: transparent;
  border: none;
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    opacity: 0.8;
    transform: scale(0.85);
  }
`;

export default V2rooms;
