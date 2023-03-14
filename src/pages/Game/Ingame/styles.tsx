import styled from 'styled-components'

export const PlayContainer = styled.div `
  width : 100%;
  height: 100%;
  display: flex;
  justify-content : row;
  justify-content : space-evenly;
  align-items : center;
  gap : 1rem;
`
//위는 건들지 마!

export const CanvasContainer = styled.div `
  width: 100%;
  aspect-ratio: 1.5;
  position : relative;
`

export const SingleCanvas = styled.canvas `
  width: 100%;
  position: absolute;
  border: none;
  left : 0;
`
export const QuitButton = styled.button `
  width: 30%;
  height : 30px;
  max-width : 120px;
  aspect-ratio : 3.5;
  border-radius : 5px;
  background : black;
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    color: white;
    background: none;
    border: none;
    text-align: center;
    /* font-size: 8pt; */
  }
  margin-top: 3%;

  &:active {
    p {
      color: rgb(80,80,80);
    }
  }

  &:hover {
    background: rgb(50,50,50);
  }
`

// 플레이어 정보 담을 컨테이너 만들어야 함.