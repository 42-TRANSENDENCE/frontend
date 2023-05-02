import styled from "styled-components";

export const ModalContainer = styled.div`
  --width: calc(var(--modal-width) * 0.98);
  --padding: calc(var(--width) * 0.01);
  --buttun-height: calc(var(--width) / 6);
  box-sizing: border-box;

  width: var(--width);
  height: var(--width);
  background: pink;

  border: var(--border-width) solid black;
  border-radius: calc(var(--width) * 0.05);
  padding: var(--padding);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow-x: hidden;
  overflow-y: hidden;

  Button,
  .custom-file-upload {
    height: var(--buttun-height);
    width: calc(var(--buttun-height) * 1.5);
    border: calc(var(--border-width) / 1.5) solid black;
    border-radius: calc(var(--buttun-height) / 2);
  }

  > div {
    background-color: rgba(255, 255, 255, 0.5);
  }
`;
/*==================================*/
/*                                  */
/*          MODAL AVATAR          */
/*                                  */
/*==================================*/
export const ModalAvatar = styled.div`
  --width: calc(var(--modal-width) * 0.96 - var(--border-width) * 2);
  --height: calc(var(--width) * 7 / 12);
  --button-height: var(--buttun-height);
  overflow: hidden;
  box-sizing: border-box;

  width: var(--width);
  height: var(--height);
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  padding: var(--padding);

  border-radius: calc(var(--width) * 0.03);
  border: calc(var(--border-width) / 1.5) solid black;

  div {
    width: calc(var(--button-height) * 1.5);
    height: calc(var(--height) - 2 * (var(--padding) + var(--border-width)));
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }

  #file-upload {
    display: none;
  }
  .custom-file-upload {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    cursor: pointer;

    img {
      width: 100%;
    }

    &:hover {
      opacity: 0.9;
      transform: scale(0.98);
    }

    &:active {
      opacity: 0.4;
    }
  }
`;

export const Avatar = styled.img`
  border-radius: 50%;
  border: calc(var(--border-width) / 1.5) solid black;
  background: gray;
  width: calc(var(--height) * 0.9 - 2 * var(--padding));
  aspect-ratio: 1;
`;

/*==================================*/
/*                                  */
/*          MODAL NICKNAME          */
/*                                  */
/*==================================*/
export const ModalNickName = styled.div`
  --width: calc(var(--modal-width) * 0.96 - var(--border-width) * 2);
  --height: calc(var(--width) * 3 / 12);
  overflow: hidden;

  width: var(--width);
  height: var(--height);
  box-sizing: border-box;
  border-radius: calc(var(--width) * 0.03);
  border: calc(var(--border-width) / 1.5) solid black;
  padding: var(--padding);
  form {
    width: calc(var(--width) - 2 * var(--padding) - var(--border-width));
    height: calc(var(--height) - 2 * var(--padding) - var(--border-width));
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
  }
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  & > span {
    font-size: 20px;
    font-weight: 800;
    cursor: pointer;
  }
`;

export const InputName = styled.input`
  --saf-0: rgba(var(--sk_foreground_high_solid, 134, 134, 134), 1);
  display: flex;
  border-radius: 4px;
  border: 1px solid var(--saf-0);

  transition: border 80ms ease-out, box-shadow 80ms ease-out;
  box-sizing: border-box;

  width: calc(var(--width) * 0.5);
  margin-left: calc(var(--width) * 0.01);

  height: 30px;
  font-size: 12px;
  transition: 0.4s;

  &:focus {
    --saf-0: rgba(var(--sk_highlight, 18, 100, 163), 1);
    box-shadow: 0 0 0 1px var(--saf-0), 0 0 0 5px rgba(29, 155, 209, 0.3);
    width: calc(var(--width) * 0.55);
  }
`;

/*==================================*/
/*                                  */
/*             TWO FACTOR           */
/*                                  */
/*==================================*/
export const TwoFactorPart = styled.div`
  --width: calc(var(--modal-width) * 0.96 - var(--border-width) * 2);
  --height: calc(var(--width) * 2 / 12 - calc(var(--width) * 0.02));

  width: calc(var(--width) * 0.9);
  height: var(--height);

  box-sizing: border-box;
  border-radius: calc(var(--height) * 0.5);

  border: calc(var(--border-width) / 1.5) solid black;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;
/*==================================*/
/*                                  */
/*            WITHDRAWAL            */
/*                                  */
/*==================================*/
export const WithdrawalButton = styled.div`
  --width: calc(var(--modal-width) * 0.98);
  --height: calc(var(--modal-height) - var(--modal-width));

  display: flex;
  width: var(--width);
  height: calc(var(--modal-height) - var(--modal-width));
  flex-direction: row;
  overflow: hidden;
  justify-content: right;
  align-items: end;
  Button {
    width: calc(var(--width) * 0.35);
    height: calc(var(--height) * 0.8);
    border-radius: 1vw;
    border: calc(var(--border-width)) solid black;
  }
`;

export const WithdrawalModalContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  transition: visibility 0s, opacity 0.3s ease-in-out;
`;

export const WithdrawalModalContent = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
  padding: 20px;
  text-align: center;
`;

export const WithdrawalModalMessage = styled.div`
  margin-bottom: 20px;
`;

export const ConfirmButton = styled.button`
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  padding: 8px 16px;
  margin-right: 10px;
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: #0062cc;
  }
`;

export const CancelButton = styled.button`
  background-color: #f1f1f1;
  border: none;
  border-radius: 4px;
  color: #333;
  font-size: 16px;
  font-weight: bold;
  padding: 8px 16px;
  margin-left: 10px;
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: #ddd;
  }
`;
