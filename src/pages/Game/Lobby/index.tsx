import { useEffect, useState } from "react";
import { BigButton, SmallButton } from "../../../components/Button";
import normalButton from "../../../assets/bigButton/normalButton.svg";
import chaosButton from "../../../assets/bigButton/chaosButton.svg";
import modalQuestionButton from "../../../assets/smallButton/modalQuestionButton.svg";
import Modal from "../../../components/Modal";
import { GameMode } from "../enum";

const Lobby = (props: any): JSX.Element => {
  const client_socket = props.socket;
  const [gameManual, setGameManual] = useState<boolean>(false);

  useEffect(() => {
    console.log("GameLobby 입장");
    return () => {
      console.log("GameLobby 나감");
    };
  }, []);

  function normal_game_clicked() {
    console.log("normal game button clicked");
    client_socket.emit("join_queue", { mode: GameMode.NORMAL });
  }

  function special_game_clicked() {
    console.log("chaos game button clicked");
    client_socket.emit("join_queue", { mode: GameMode.SPECIAL });
  }

  return (
    <LobbyContainer>
      <div className="box">
        <SmallButton
          img_url={modalQuestionButton}
          onClick={() => {
            setGameManual(true);
          }}
        />
        <div className="body">
          <BigButton img_url={normalButton} onClick={normal_game_clicked} />
          <BigButton img_url={chaosButton} onClick={special_game_clicked} />
        </div>
      </div>

      <Modal
        onCloseModal={() => {
          setGameManual(false);
        }}
        show={gameManual}
        showCloseButton={true}
      >
        <div className="gameManual">
          <p className="modeName normal">NormalMode</p>
          <p className="manual">공과 패들이 충돌할 때 속도가 빨라집니다.</p>
          <p className="manual">3점을 먼저 획득하면 승리합니다.</p>
          <p className="modeName special">SpecialMode</p>
          <p className="manual">NormalMode에서 다음이 추가됩니다.</p>
          <p className="manual">위아래 벽 방향으로 중력을 받습니다.</p>
        </div>
      </Modal>
    </LobbyContainer>
  );
};

export default Lobby;

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

    --w: min(var(--body-width), 400px);
    --h: calc(var(--body-height) * 0.8);
    --size: min(var(--w), var(--h));
    width: var(--size);
    aspect-ratio: 1;

    background: pink;

    border-radius: calc(var(--size) / 8);
    border: min(calc(var(--border-width) * 1.5), 5px) solid black;

    box-sizing: border-box;
    /* width: fit-content; */
    padding: var(--html-padding-horizontal);
    position: relative;
    > Button {
      position: absolute;
      top: calc(var(--size) / 24);
      left: calc(var(--size) / 24);
      width: calc(var(--size) / 16);
      height: calc(var(--size) / 16);
    }
  }
  .top {
    width: 100%;
    display: flex;
    align-items: top;
    justify-content: right;
    Button {
      width: calc(var(--size) * 0.1);
      border: var(--border-width) solid black;
      border-radius: calc(var(--size) * 0.05);
    }
  }
  .body {
    width: 100%;
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;

    Button {
      width: calc(var(--size) - 2 * var(--html-padding-horizontal));
      border: var(--border-width) solid black;
      border-radius: calc(50 / 800 * min(60vw, 800px));
    }
  }
  .gameManual {
    --modal-width: min(440px, calc(var(--body-width) * 0.3));
    --modal-height: calc(var(--modal-width) * 6 / 5);
    --width: var(--modal-width);
    --height: var(--modal-height);
    overflow: hidden;
    .modeName {
      line-height: calc(var(--height) * 0.1);
      font-size: calc(var(--height) * 0.1);
      font-weight: 500;
      background-color: black;
      border-radius: calc(var(--height) * 0.02);
      margin: 0;
      margin-top: calc(var(--height) * 0.1);
      margin-bottom: calc(var(--height) * 0.05);
      padding: 0;
    }
    .normal {
      color: var(--color-yellow);
    }
    .special {
      color: var(--color-red);
    }
    .manual {
      padding: 0;
      margin: 0;
      line-height: calc(var(--width) / 100 * 7);
      font-size: calc(var(--width) / 100 * 5);
      text-align: left;
      text-overflow: hidden;
    }
  }
`;
