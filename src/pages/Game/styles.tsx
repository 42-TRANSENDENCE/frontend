import styled from 'styled-components'
import Background from '../../assets/Background.svg'
import triangle from '../../assets/triangle.svg'

export const GameContainer = styled.div `
    width: 100vw;
  height: 100vh;
  padding: 3vh 3vw;
  display: flex;
  flex-direction: column;
  gap: 3vh;
  justify-content: center;
  align-items: center;

  background-image: url(${triangle});
  background-position: right bottom;
  background-repeat: no-repeat;
  background-size: min(50vw, 50vh);

  .Title{
    background: rgba(255,0,0,0.5);
    width: 100%;
    flex: 1;
    max-height: 100px;
  }
  .Body{
    width: 100%;
    flex: 8;

    display: flex;
    justify-content: center;
    align-items: center;
  }

`