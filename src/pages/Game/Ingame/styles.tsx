import styled from 'styled-components'

export const PlayContainer = styled.div `
  width : var(--body-width);
  height: var(--body-height);
  --profile-width: calc(var(--body-width) * 0.25);
  --canvas-width: calc(var(--body-width) * 0.5);
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content : center;
  align-items : center;
  box-sizing: border-box;
`
//위는 건들지 마!

export const CanvasContainer = styled.div `
  background: white;
  --canv-padding: calc(min(var(--html-padding-vertical), var(--html-padding-horizontal))/2);
  --h : calc(var(--body-height) - 2*var(--canv-padding));
  --w : calc(min(var(--canvas-width), calc(var(--h) * 1.5)) - 2*var(--canv-padding));
  --border-width: calc(var(--w) / 100);
  width: calc(var(--w) + 2*var(--canv-padding));
  height: calc(var(--w) / 1.5 + 2*var(--canv-padding));
  position : relative;
  border-radius: calc(var(--w) / 600 * 20);
  border: var(--border-width) solid black;
  box-sizing: content-box;
  overflow: hidden;
`

export const SingleCanvas = styled.canvas `
  width: calc(100% - 2*var(--canv-padding));
  height: fit-content;
  position: absolute;
  border: none;
  left : var(--canv-padding);
  top: var(--canv-padding);
  border-radius: calc(var(--w) / 600 * 20 - var(--canv-padding));
  overflow: hidden;
`

// 플레이어 정보 담을 컨테이너 만들어야 함.