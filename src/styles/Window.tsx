import { number } from 'prop-types';
import { Interface } from 'readline'
import styled from 'styled-components'


const Container = styled.div<any> `
  --bgcolor : wheat;
  --border-width: min(0.25vw, 0.25vh);

  --container-padding : min(2vh, 2vw);
  --container-width: ${props => props.width || "100%"};
  /*--container--max-width: ${props => props.max_width || "100%"};*/
  --container-height: ${props => props.height || "100%"};

  --container-topbar-height: 50px;

  background: var(--bgcolor);
  padding: var(--container-padding);
  padding-top : calc( var(--container-padding) + var(--container-topbar-height));

  width : var(--container-width);
  /*max-width : ${props => props.max_width};*/
  height: var(--container-height);
  /*max-height : ${props => props.max_height};*/
  box-sizing: border-box;
   
  
  border : 20px solid black;
  border-radius: 5px;
  box-shadow: 20px 20px 12px rgb(0,0,0,0.5);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  text-align: center;
  overflow: hidden;
`
const Container__Topbar = styled.div `
  background-color: black;
  width: 100%;
  color: white;
  height: var(--container-topbar-height);
  position: absolute;
  top : 0;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;

  h1 {
    width: fit-content;
    height: 100%;
  }
`

export const Window = ({children, title, width, height} : any) : JSX.Element => {

  return (
    <Container width={width} height={height}>
      <Container__Topbar>
        <h1>{title}</h1>
      </Container__Topbar>
        {children}
    </Container>
  )
}
