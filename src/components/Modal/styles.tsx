import styled from '@emotion/styled';

export const CreateModal = styled.div`
  --width: 100vw;
  --height: 100vh;
  background-color: rgba(200,200,200, 0.5);
  display : flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: var(--width);
  height: var(--height);
  
  position: fixed;
  left: 0;
  top: 0;
  & > div {
    --modal-width : min(440px, calc(var(--width) * 0.3));
    --modal-height: calc(var(--modal-width) * 6/5);

    user-select: none;

    width: var(--modal-width);
    height: var(--modal-height);
    padding: calc(var(--modal-width) * 0.01);
    padding-top : calc(var(--modal-width) * 0.12);
    padding-bottom : 0;
    background-color: #4495F7;
    border-radius: calc(var(--modal-width) * 0.05);
    border: var(--border-width) solid black;
    
    display: flex;
    position : relative;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    text-align: center;
  }

`;

export const CloseModalButton = styled.button`
  width: calc(var(--modal-width) * 0.1);
  height: calc(var(--modal-width) * 0.1);
  position: absolute;
  top : calc(var(--modal-width) * 0.01);
  right: calc(var(--modal-width) * 0.01);
  border: none;
  background: transparent;
  margin: 0;
  padding: 0;
  cursor: pointer;
  img {
    box-sizing: border-box;
    width: 100%;
    aspect-ratio: 1;
    border-radius: 50%;
    border: calc(var(--border-width) / 2) solid black;
  }
`;

export const InfoModalButton = styled.button<{ tooltip: string }>`
  width: calc(var(--modal-width) * 0.1);
  height: calc(var(--modal-width) * 0.1);
  position: absolute;
  top : calc(var(--modal-width) * 0.01);
  left: calc(var(--modal-width) * 0.01);
  border: none;
  background: transparent;
  margin: 0;
  padding: 0;
  cursor: pointer;
  img {
    box-sizing: border-box;
    width: 100%;
    aspect-ratio: 1;
    border-radius: 50%;
    border: calc(var(--border-width) / 2) solid black;
  }
  
  ${({ tooltip }) =>
    tooltip &&
    `
    &:hover {
      &::after {
        content: "${tooltip}";
        position: absolute;
        z-index: 1;
        top: 2rem;
        left: 5.5rem;
        width: 11rem;

        transform: translateX(-50%);
        padding: 0.25rem 0.5rem;
        background-color: black;
        color: white;
        font-size: 0.75rem;
        border-radius: 0.25rem;
      }
    }
  `}
`;
