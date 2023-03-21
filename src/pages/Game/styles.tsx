import styled from 'styled-components'
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

  .Title, .Footer{
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
  .Footer{
    transform: rotate(180deg)
  }

`
