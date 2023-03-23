import styled from "styled-components";
import triangle from '../../assets/triangle.svg';

export const AppContainer = styled.div`
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url(${triangle});
  background-position: right bottom;
  background-repeat: no-repeat;
  background-size: min(50vw, 50vh); 
`

