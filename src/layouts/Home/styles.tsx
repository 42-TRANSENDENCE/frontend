import styled from 'styled-components'

export const Div = styled.div`
  flexbox: row;
`

export const Container = styled.div`
  display: flex;
  justifiy-content: space-around;
  flex-direction: column;
  background-color: #00E5FF;
  border: 0.5rem solid black;
  margin: 8vh 10vw;
  height: 42em;
  box-shadow: 20px 20px;
  position: relative;
  h1 {
    color: #FFFFFF;
    font-weight: 700;
    font-size: 8vw;
    line-height: 0.2;
    align-items: center;
    text-align: center;
    // padding: 5% 0;
    text-transform: uppercase;
    &:hover {
      color: black;
    }
`

export const MainContainer = styled.div`
  display: inline-flex;
  flex-grow: 3;
  flex-direction: column;
  align-items: center;
  background-color: #00E5FF;
  border: 0.5rem solid black;
  width: 55%;
  height: 88%;
  box-shadow: 15px 15px;
  position: absolute;
  top: 6%;
  left: 11%;
  h1 {
    color: #FFFFFF;
    font-family: 'IBM Plex Mono', monospace;
    font-weight: 500;
    font-size: 3vw;
    // align-items: center;
    // justify-content: center;
    // text-align: center;
    padding: 2% 0;
    text-transform: uppercase;
    &:hover {
      color: black;
    }
`

export const ProfileContainer = styled.div`
  display: inline-flex;
  flex-grow: 2;
  flex-direction: column;
  align-items: center;
  background-color: #00E5FF;
  border: 0.5rem solid black;
  width: 27%;
  height: 88%;
  box-shadow: 15px 15px;
  position: absolute;
  top: 6%;
  right: 4%;
  h1 {
    color: #FFFFFF;
    font-family: 'IBM Plex Mono', monospace;
    font-weight: 700;
    font-size: 3vw;
    line-height: 24px;
    align-items: center;
    text-align: center;
    padding: 5% 0;
    text-transform: uppercase;
    &:hover {
      color: black;
    }
`

export const Nav = styled.nav`
  background-color: black;
  color: white;
  font-size: 1em;
  font-weight: 800;
  padding: 0 9em 0 1em;
  width: 100%;
  @media screen and (max-width: 768px) {
    font-size: 10px;
  }
`

export const Button = styled.button`
  border-radius: 10px;
  border: 3px solid #000000;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  font-size: 3vw;
  font-weight: 800;
  margin: 2em 8em;
  padding: 30px 30px;
  background-color: #7C4DFF};
  color: white;
  box-sizing: border-box;
  &:hover {
    opacity: 0.9;
    transform: scale(0.98);
  }
  @media screen and (max-width: 768px) {
    font-size: 20px;
  }
`

export const Workspaces = styled.div`
  display: inline-flex;
  flex-grow: 1;
  flex-direction: column;
  border-right: 5px solid black;
  box-sizing: border-box;
  position: absolute;
  top: 8%;
  left: 2%;
`;

export const WorkspaceButton = styled.button`
  color: white;
  font-size: 40px;
  line-height: 70px;
  display: inline-block;
  background: transparent;
  border: none;
  cursor: pointer;
  margin-right: 10px;
  &:hover {
    opacity: 0.8;
    transform: scale(0.85);
  }
`;


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
`;

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


export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  max-width: 600px;
  width: 100%;
  display: flex;
  justifiy-content: space-around;
  flex-direction: column;
  background-color: #00E5FF;
  border: 0.5rem solid black;
  box-shadow: 15px 15px;
  position: relative;
  font-family: 'IBM Plex Mono', monospace;
  font-weight: 500;
  font-size: 20px;
  align-items: center;
  text-align: center;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 32px;
  margin-bottom: 12px;
  font-weight: 700;
`;

export const ModalBody = styled.div`
  margin-bottom: 16px;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`;
