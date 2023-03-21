import styled from 'styled-components';

export const Box = styled.button`
  --w: min(max(30vw, 200px), 400px);
  width: var(--w);
  border-radius : calc(var(--w) * 50 / 600);
  border: calc(var(--w) * 10 / 600) solid black;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
  overflow: hidden;
  img {
    width: 100%;
    margin: 0;
  };
  cursor: pointer;

  &:hover {
    opacity: 0.9;
    transform: scale(0.98);
  };

  &:active {
    opacity: 0.4;
  };
`

export const MiddleBox = styled.button`
  --w : min(max(10vw, 100px), 150px);
  width: var(--w);
  aspect-ratio: 4/3;
  border-radius : calc(var(--w) * 45 / 200);
  border: calc(var(--w) * 6 / 200) solid black;
  
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
  overflow: hidden;
  img {
    width: 100%;
    margin: 0;
  };
  cursor: pointer;

  &:hover {
    opacity: 0.9;
    transform: scale(0.98);
  };

  &:active {
    opacity: 0.4;
  };
`

export const SmallBox = styled.button`
  --w : max(40px);
  width: var(--w);
  aspect-ratio: 1;
  border-radius : calc(var(--w) * 40 / 80);
  border: calc(var(--w) * 6 / 80) solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
  overflow: hidden;
  img {
    width: 100%;
    margin: 0;
  };
  cursor: pointer;

  &:hover {
    opacity: 0.9;
    transform: scale(0.98);
  };

  &:active {
    opacity: 0.4;
  };
`
