import { BigButton } from "../../../components/Button";
import cancelButton from "../../../assets/bigButton/cancelButton.svg";
import { useEffect } from "react";

const Waiting = (props: any) => {
  const client_socket = props.socket;

  function quit_queue(): void {
    console.log("cancel 버튼 누름");
    client_socket.emit("leave_queue");
  }

  useEffect(() => {
    console.log("queue에 들어옴");
    return () => {
      client_socket.emit("leave_queue");
      console.log("queue에서 나감.");
    };
  }, []);

  return (
    <>
      <LobbyContainer>
        <div className="box">
          <BigButton img_url={cancelButton} onClick={quit_queue} />
        </div>
      </LobbyContainer>
    </>
  );
};

export default Waiting;

/* =================================================== */
import styled from "styled-components";
const LobbyContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  .box {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;

    --w: min(var(--body-width), 600px);
    --h: calc(var(--body-height) * 0.8);
    --size: min(var(--w), var(--h));
    width: var(--size);
    aspect-ratio: 1;

    background: var(--color-blue);

    border-radius: calc(var(--size) / 8);
    border: calc(var(--border-width) * 2) solid black;

    box-sizing: border-box;
    padding: 25px;

    Button {
      width: calc(var(--size) - 4 * var(--html-padding-horizontal));
      border: var(--border-width) solid black;
      border-radius: calc(50 / 800 * min(60vw, 800px));
    }
  }
`;
