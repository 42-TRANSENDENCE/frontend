import styled from 'styled-components'

export const LoadingText = styled.p `
  color: black;
  font-size: 100px;
`

export const CancelButton = styled.button `
  width : 30%;
  max-width: 300px;
  aspect-ratio : 2.5;
  background : black;
  display: flex;
  align-items: center;
  justify-content: center;
  h1 {
    color: white
  }
  margin-top: 5%;

  &:active {
    h1 {
      color: rgb(80,80,80);
    }
  }

  &:hover {
    background: rgb(50,50,50);
  }
`