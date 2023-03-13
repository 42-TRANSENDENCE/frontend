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
    if (onNewRoom && onRemoveRoom) {
      console.log("v2_rooms에 진입하셨습니다.");
      socket?.on("newRoom", onNewRoom);
      socket?.on("removeRoom", onRemoveRoom);
    }
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

  if (isLoading || isLoadingUser) return <div>isLoading...</div>;
  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>채팅방</h1>
      <span>{user.username}님 어서오세요</span>
      <InnerWindow>
        <BrowserHeader>
          <DotThree>
            <div className="outer">
              <div className="dot red"></div>
              <div className="dot amber"></div>
              <div className="dot green"></div>
            </div>
          </DotThree>
        </BrowserHeader>
        <fieldset
          onClick={() => setErrorMessage("")}
          style={{ border: "none" }}
        >
          {/* <legend>채팅방 목록</legend> */}
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
                    <td>{room.title}</td>
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
          {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
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
      </InnerWindow>

      <Link to="/">
        <span>홈으로</span>
      </Link>
      {/* </OuterWindow> */}
      <Link to="/chat/createUsers">유저들 만들기</Link>
      <Link to="/chat/getUsers/1">1번 유저 쿠키획득</Link>
      <Link to="/chat/getUsers/3">3번 유저 쿠키획득</Link>
      <Link to="/chat/v2_dms/rock11">rock11 유저와 dm하기</Link>
      <Link to="/chat/v2_dms/rock33">rock33 유저와 dm하기</Link>
    </Container>
  );
}

export default V2rooms;
