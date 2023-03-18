import styled from 'styled-components'

export const LobbyContainer = styled.div `
  box-sizing: border-box;
  width: 90%;
  height: 90%;
  color: wheat;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;

  padding: calc(var(--game-container-padding)/2);
  
  @media screen and (max-width: 800px) {
    display: flex;
    flex-direction: column;
    gap: 1rem;  
    width: 100%;
    height: 100%;
  }
`

/* LEFT SIDE */
export const LobbyLeft = styled.div `
  width : 100%;
  height : 100%;
  padding: 1%;
  display: grid;
  gap: 3%;
  @media screen and (max-width: 800px) {
    display: flex;
    flex-direction: row;
  }
  `
export const ListContainer = styled.div `

  overflow: scroll;
  height: 100%;
  width: 100%;
  min-height: 300px;
  border: 1px solid black;
`


/* RIGHT SIDE */
export const LobbyRight = styled.div `
  width : 100%;
  height : 100%;
  padding: 1%;

  display : flex;
  flex-direction : column;
  align-items: end;
  justify-content : space-around;
  @media screen and (max-width: 800px) {
    align-items: center;
  }
`

export const RightContainer = styled.div `
  
  width : 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 800px) {
    flex-direction: row;
  }
`

export const PlayerInfo = styled.div `
  width: 100%;
  height: 45%;
  border: 1px solid black;
  
  @media screen and (max-width: 800px) {
    margin: 0;
    width: auto;
    height: auto;
  }

  p {
    color: black;
  }
`
export const PlayButton = styled.button `
  width : 90%;
  aspect-ratio : 2.5;
  background : black;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5%;
  @media screen and (max-width: 800px) {
    margin: 0;
    width: 30%;
    height: auto;
  }
  
  p {
    color: white
  }

  &:active {
    p {
      color: rgb(80,80,80);
    }
  }

  &:hover {
    background: rgb(50,50,50);
  }
`