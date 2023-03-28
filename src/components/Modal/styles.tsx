import styled from '@emotion/styled';

export const CreateModal = styled.div`
  --width: 100vw;
  --height: 100vh;
  position: fixed;
  text-align: center;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  z-index: 1022;
  background-color: rgba(128, 128, 128, 0.5);
  & > div {
    margin-top: 5%;
    display: inline-block;
    /* width: 440px; */
    width: var(--width);
    background: white;
    --saf-0: rgba(var(--sk_foreground_low, 29, 28, 29), 0.13);
    box-shadow: 0 0 0 1px var(--saf-0), 0 4px 12px 0 rgba(0, 0, 0, 0.12);
    background-color: rgba(var(--sk_foreground_min_solid, 248, 248, 248), 1);
    border-radius: 6px;
    user-select: none;
    max-width: 440px;
    padding: 30px 40px 0;
    z-index: 1012;
    position: relative;
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
  right: 0.625rem;
  top: 0.4rem;
  background: transparent;
  border: none;
  font-size: 30px;
  cursor: pointer;
`;

export const InfoModalButton = styled.button<{ tooltip: string }>`
  position: absolute;
  left: 0.625rem;
  top: 0.4rem;
  background: transparent;
  border: none;
  font-size: 30px;
  cursor: pointer;

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
