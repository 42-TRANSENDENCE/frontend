import styled from 'styled-components'
import triangle from '../assets/triangle.svg';

export const Container = styled.div`
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
    width: 100%;
    flex: 1;
    max-height: 100px;
  }
  .Body{
    width: 100%;
    flex: 9;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`
