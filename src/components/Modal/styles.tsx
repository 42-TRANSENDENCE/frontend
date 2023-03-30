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
  /* z-index: 1022; */
  & > div {
    --modal-width : min(440px, calc(var(--width) * 0.3));
    --modal-height: calc(var(--modal-width));

    user-select: none;

    width: var(--modal-width);
    height: var(--modal-height);
    padding: calc(var(--modal-width) * 0.02);
    padding-top : calc(var(--modal-width) * 0.02 + 2.4rem);
    background-color: #4495F7;
    border-radius: calc(var(--modal-width) * 0.05);
    border: var(--border-width) solid black;
    
    display: inline-block;
    flex-direction: column;
    position : relative;
  }

  #file-upload {
    display: none;
  }
  .custom-file-upload {
    --w: min(max(10vw, 100px), 150px);
    width: var(--w);
    aspect-ratio: 4/3;
    border-radius: calc(var(--w) * 45 / 200);
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
    }
    cursor: pointer;

    &:hover {
      opacity: 0.9;
      transform: scale(0.98);
    }

    &:active {
      opacity: 0.4;
    }
  }
`;

export const CloseModalButton = styled.button`
  position: absolute;
  top : 0;
  right: 0;
  background: transparent;
  border: none;
  font-size: 30px;
  cursor: pointer;
  img {
    width: 2rem;
    border-radius: 2rem;
    border: 0.3rem solid black;
  }
`;

export const InfoModalButton = styled.button<{ tooltip: string }>`
  position: absolute;
  top : 0;
  left: 0;
  background: transparent;
  border: none;
  font-size: 30px;
  cursor: pointer;
  img {
    width: 2rem;
    border-radius: 2rem;
    border: 0.3rem solid black;
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
