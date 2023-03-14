import { number } from 'prop-types';
import { Interface } from 'readline'
import styled from 'styled-components'


const Container = styled.div<any> `
  --bgcolor : #42A5F5;;
  --border-width: min(0.15vw, 0.15vh);

  --container-padding : min(1vh, 1vw);

  --container-topbar-height: 20px;

  background: var(--bgcolor);
  padding: var(--container-padding);
  padding-top : calc( var(--container-padding) + var(--container-topbar-height));

  width : ${props => props.width || "100%"};
  height: ${props => props.height || "100%"};
  max-width: ${props => props.max_width};
  min-width: ${props => props.min_width};
  max-height: ${props => props.max_height};
  min-height: ${props => props.min_height};
  box-sizing: border-box;
   
  
  border : 5px solid black;
  border-radius: 5px;
  box-shadow: 20px 20px 12px rgb(0,0,0,0.5);

  display: ${props => props.display || "flex"};
  flex-direction: ${props => props.flex_direction || "column"};
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
  flex-direction: row;
  justify-content: center;
  align-items : center;
  p {
    /* background : red; */
    height: 100%;
  }
`

export const Window = ({
  children,
  title, 
  width,
  height,
  max_width,
  min_width,
  max_height,
  min_height,
} : any) : JSX.Element => {

  return (
    <Container 
      width={width}
      height={height}
      max_width={max_width}
      min_width={min_width}
      max_height={max_height}
      min_height={min_height}
  >
      <Container__Topbar>
        <p>{title}</p>
      </Container__Topbar>
        {children}
    </Container>
  )
}
