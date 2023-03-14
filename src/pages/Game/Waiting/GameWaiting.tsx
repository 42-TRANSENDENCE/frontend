import { LoadingText, CancelButton } from "./styles";
import { useEffect } from "react";
import { Window } from "../../../components/Window/Window";

export const GameWaiting = (props: any) => {
  const game_socket = props.socket;

  function quit_queue(): void {
    game_socket.emit("quit_queue");
  }

  useEffect(() => {
    console.log("queue에 들어옴");
    return () => {
      console.log("queue에서 나감.");
    };
  }, []);

  return (
    <>
      <Window height="400px" title="Searching game" max_width="40px">
        <LoadingText>LOADING...</LoadingText>
      </Window>

      <CancelButton onClick={quit_queue}>
        <h1>CANGLE</h1>
      </CancelButton>
    </>
  );
};
