import React from "react";
import { Window } from "../../../components/Window/Window";
import { SelectModeContainer, ModeContainer } from "./styles";

export const GameSelectMode = (props: any): JSX.Element => {
  const game_socket = props.socket;

  return (
    <SelectModeContainer>
      <Window title="2D Mode">
        <ModeContainer></ModeContainer>
      </Window>

      <Window title="Mode unspecified">
        <ModeContainer></ModeContainer>
      </Window>

      <Window title="3D Mode">
        <ModeContainer></ModeContainer>
      </Window>
    </SelectModeContainer>
  );
};
