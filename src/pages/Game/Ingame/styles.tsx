import styled from 'styled-components'

export const PlayContainer = styled.div `
  width : 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content : space-evenly;
  align-items : center;
  gap : 1rem;


`
//위는 건들지 마!

export const CanvasContainer = styled.div `
  background: white;
  --h : min(600px, 50vh);
  --w : min(min(700px, 80vw), calc(var(--h) * 1.5));
  width: calc(var(--w) + 10px);
  height: calc(var(--w) / 1.5 + 10px);
  position : relative;
  border-radius: calc(var(--w) / 600 * 20);
  border: calc(var(--w) / 600 * 6) solid black;
  box-sizing: content-box;
  overflow: hidden;
`

export const SingleCanvas = styled.canvas `
  width: calc(100% - 10px);
  height: fit-content;
  position: absolute;
  border: none;
  left : 5px;
  top: 5px;
  border-radius: calc(var(--w) / 600 * 20 - 10px);
  overflow: hidden;
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