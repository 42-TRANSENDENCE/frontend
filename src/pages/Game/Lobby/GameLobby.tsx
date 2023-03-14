import { useEffect } from "react";
import FriendList from "./FriendList";
import PlayerProfile from "./PlayerProfile";
import JoinButton from "./JoinButton";
import { Window } from "../../../components/Window/Window";
import {
  LobbyContainer,
  LobbyLeft,
  LobbyRight,
  PlayButton,
  PlayerInfo,
  RightContainer,
  ListContainer,
} from "./styles";

export const GameLobby = (props: any): JSX.Element => {
  const game_socket = props.socket;

  useEffect(() => {
    console.log("GameLobby 입장");
    return () => {
      console.log("GameLobby 나감");
    };
  }, []);

  return (
    <LobbyContainer>
      <LobbyLeft>
        <Window title="Online" height="100%" width="100%">
          <ListContainer>
            <p>접속중인 친구 목록</p>
          </ListContainer>
        </Window>
        <Window title="InGame" height="100%" width="100%">
          <ListContainer>
            <p>게임중인 친구 목록</p>
          </ListContainer>
        </Window>
      </LobbyLeft>

      <LobbyRight>
        <Window
          title="Player Info"
          width="80%"
          max_width="700px"
          height="93%"
          min_height="400px"
        >
          <RightContainer>
            <PlayerInfo>
              <p>플레이어 정보</p>
            </PlayerInfo>
            <PlayButton>
              <p>게임하기</p>
            </PlayButton>
          </RightContainer>
        </Window>
      </LobbyRight>
    </LobbyContainer>
  );
};
