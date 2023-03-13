import styled from 'styled-components'

export const LobbyContainer = styled.div `
  --home-container_width: calc(var(--game_container-width) - 2*var(--game-container-padding));
  --home-container_height: calc(var(--game_container_height) - 2*var(--game-container-padding));
  --line-width : var(--game-border-width);
  
  box-sizing: border-box;
  width: var(--home-container-width);
  height: var(--home-container-height);
  color: wheat;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: calc(var(--game-container-padding)/2);
  
  @media screen and (min-width: 800px) {
    display: flex;
    flex-direction: column;
    gap: 1rem;  
  }

`

export const LobbySeperator = styled.div `
  content: none;
  width: var(--line-width);
  height: 95%;
  background: wheat;

  @media screen and (min-width: 800px) {
    content: none;
    width: 95%;
    height: var(--line-width);
    background: wheat;
  }
`

export const LobbyLeft = styled.div `
  /*content: none;
  width: var(--line-width);
  height: 95%;
  background: wheat;*/
`

export const LobbyRight = styled.div `
  /*content: none;
  width: var(--line-width);
  height: 95%;
  background: wheat;*/
`