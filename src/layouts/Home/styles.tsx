import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 3% 3%;
  display: flex;
  flex-direction: column;
  gap: 3%;
  justify-content: center;
  align-items: center;
  
  .Title{
    width: 100%;
    display: flex;
    justify-content: center;
  }
  
  .Body{
    width: 100%;
    height: 100%;

    display:flex;
    flex-direction: row;
    gap: 1%;
    .LeftSide{
      flex: 0.8;
      width: 100%;
      height: 100%;
    }
    
    .MiddleSide{
      flex: 1.2;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 5%;

      .MidiumButtons {
        display: flex;
        width: fit-content;
        flex-direction: row;
        gap: 20%;
      }
    }

    .RightSide {
      flex: 0.8;
      height: 100%;
      display: flex;
      justify-content: center;
      gap: 5%;
      align-items: center;
      flex-direction: column;

      .Notification {
        --w: min(30vw, 450px);
        width: var(--w);
        height: 15%;
        max-height: 70px;
        background: white;
        border-radius: calc(var(--w) * 25 / 450);
        border: calc(var(--w) * 7 / 450) solid black;
        text-align: center;
        margin-top: 2rem;
      }
    }
  }
  `

export const Label = styled.label`
  display: flex;
  align-items: center;
  & > span {
    font-size: 20px;
    font-weight: 800;
    cursor: pointer;
    // line-height: 1.46666667;
  }
`;

export const Input = styled.input`
  position: relative;
  display: flex;
  align-items: center;
  margin-left: 20px;
  width: 24px;
  height: 24px;
  appearance: none;
  background-color: rgba(var(--sk_primary_background, 255, 255, 255), 1);
  border-radius: 4px;
  border: 1px solid rgba(var(--sk_foreground_high_solid, 134, 134, 134), 1);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:checked {
    background-color: rgba(var(--sk_highlight, 18, 100, 163), 1);
    border: 1px solid rgba(var(--sk_highlight, 18, 100, 163), 1);
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(var(--sk_highlight, 18, 100, 163), 0.5);
  }
  &:before {
    content: "";
    position: absolute;
    display: none;
    left: 5px;
    top: 2px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
  &:checked:before {
    display: block;
  }
`

export const InputName = styled.input`
  display: flex;
  margin: 0 auto;
  border-radius: 4px;
  --saf-0: rgba(var(--sk_foreground_high_solid, 134, 134, 134), 1);
  border: 1px solid var(--saf-0);
  transition: border 80ms ease-out, box-shadow 80ms ease-out;
  box-sizing: border-box;
  width: 30%;
  color: rgba(var(--sk_primary_foreground, 29, 28, 29), 1);
  background-color: rgba(var(--sk_primary_background, 255, 255, 255), 1);
  padding: 18px;
  height: 30px;
  padding-top: 11px;
  padding-bottom: 13px;
  font-size: 12px;
  transition: 0.4s;
  &:focus {
    --saf-0: rgba(var(--sk_highlight, 18, 100, 163), 1);
    box-shadow: 0 0 0 1px var(--saf-0), 0 0 0 5px rgba(29, 155, 209, 0.3);
    width: 40%;
  }
`

export const Avatar = styled.img`
  border-radius: 50%;
  border: 0.3rem solid black;
  width: 55%;
  aspect-ratio: 1;
`
