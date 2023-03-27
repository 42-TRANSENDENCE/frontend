import styled from "styled-components";

export const ProfileContainer = styled.div<any>`
  --border-color: ${props => props.color || "black"};
  width: var(--w);
  aspect-ratio: 450/600;
  background: white;
  position: relative;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: calc(var(--w) / 6);
  border: var(--border-width) solid var(--border-color);
  text-align: center;
  overflow: hidden;

  div {
    width: 100%;
    height: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .AvatarBox {
    justify-content: center;
    Button {
      width: 10%;
      aspect-ratio: 1;
      position: absolute;
      right: 1rem;
      top: 1rem;
    }
  }
  .InfoBox {
    justify-content: space-evenly;
    background: #D9D9D9;

    .Text{
      width: 100%;
      height: 60%;
      display: flex;
      flex-direction: column;
      justify-content: top;
      align-items: center;
    }
    
    h1, h3 {
      width: 100%;
      padding-left: 5%;
      text-align: left;
    }

    h1 {
      line-height: 3vw;
      font-size : 3vw;
    }
    h3{
      line-height: 2vw;
      font-size : 1vw;
    }

    .Buttons {
      width: 100%;
      height: 40%;
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      Button {
        width: 30%;
      }
    }
  }
`

export const Avatar = styled.img`
  border-radius: 50%;
  border: var(--border-width) solid black;
  width: calc(var(--w) * 0.55);
  aspect-ratio: 1;
`
