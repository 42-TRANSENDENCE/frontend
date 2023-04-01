import styled from 'styled-components'

export const PlayContainer = styled.div `
  width : var(--body-width);
  height: var(--body-height);
  --profile-width: calc(var(--body-width) * 0.25);
  --canvas-width: calc(var(--body-width) * 0.8);
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content : center;
  align-items : center;
  box-sizing: border-box;
`
//위는 건들지 마!

export const CanvasContainer = styled.div `
  background: white;
  @keyframes color {
    0%   { background: #F0E5DE; }
    20%  { background: #ABD0CE; }
    40%  { background: #7C7877; }
    60%  { background: #D9D4CF; }
    80%  { background: #7C7877; }
    100% { background: #F0E5DE; }
  }
  animation: color 30s infinite linear;
  --canv-padding: calc(min(var(--html-padding-vertical), var(--html-padding-horizontal))/2);
  --h-temp : calc((var(--body-height) - var(--canv-padding)) * 100 / 114);
  --w : calc(min(var(--canvas-width), calc(var(--h-temp) * 1.5)) - 2*var(--canv-padding));
  --border-width: calc(var(--w) / 150);
  --h : calc(calc(var(--w) / 1.5 + 2*var(--canv-padding)));
  --line-height: calc(var(--h) * 0.07);
  
  width: calc(var(--w) + 2*var(--canv-padding));

  height: calc(var(--h) * 1.07);
  position : relative;
  border-radius: calc(var(--w) / 600 * 20);
  border: var(--border-width) solid black;
  box-sizing: content-box;
  overflow: hidden;

  .PlayerName {
    position: absolute;
    box-sizing: border-box;
    width: calc(var(--w) / 2 * 0.9);
    height: var(--line-height);
    padding:0;
    margin:0;

    border-radius: calc(var(--w) / 600 * 20 - var(--canv-padding));

    font-size: calc(var(--line-height) * 0.85);
    line-height: var(--line-height);
    top: calc(var(--canv-padding) / 2);
    
    text-align: center;
    background: rgba(255,255,255,0.5);
    overflow: hidden
  }

  .Player1 {
    border : calc(var(--border-width)/2) solid red;
    left : var(--canv-padding);
  }
  
  .Player2{
    border : calc(var(--border-width)/2) solid green;
    right : var(--canv-padding);
  }
`

export const SingleCanvas = styled.canvas `
  width: calc(100% - 2*var(--canv-padding));
  height: fit-content;
  position: absolute;
  border: none;
  left : var(--canv-padding);
  top: calc(var(--canv-padding) + var(--line-height));
  border-radius: calc(var(--w) / 600 * 20 - var(--canv-padding));
  overflow: hidden;
`

// 플레이어 정보 담을 컨테이너 만들어야 함.