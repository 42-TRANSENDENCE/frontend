import { Children, useCallback, useState } from "react";
import { CloseModalButton, CreateModal, InfoModalButton } from "./styles";
import modalCloseButton from "../../assets/smallButton/modalCloseButton.svg";
import modalInfoButton from "../../assets/smallButton/modalQuestionButton.svg";

const chat_backurl = "http://127.0.0.1:3095";

export default function Modal({
  children,
  onCloseModal,
  show,
  showInfoButton,
  showCloseButton,
  tooltipText,
}: {
  children: any;
  onCloseModal: any;
  show: any;
  showInfoButton?: any;
  showCloseButton?: any;
  tooltipText?: any;
}) {
  const stopPropagation = useCallback((e: any) => {
    e.stopPropagation();
  }, []);

  if (!show) return null;
  return (
    <CreateModal onClick={onCloseModal}>
      <div
        onClick={stopPropagation}
        style={{
          backgroundColor: "#4495F7",
          borderRadius: "2rem",
          border: "0.3rem solid black",
        }}
      >
        {showCloseButton && (
          <CloseModalButton onClick={onCloseModal}>
            <img
              src={modalCloseButton}
              style={{
                width: "2rem",
                borderRadius: "2rem",
                border: "0.3rem solid black",
              }}
            />
          </CloseModalButton>
        )}
        {showInfoButton && (
          <InfoModalButton tooltip={tooltipText}>
            <img
              src={modalInfoButton}
              style={{
                width: "2rem",
                borderRadius: "2rem",
                border: "0.3rem solid black",
              }}
            />
          </InfoModalButton>
        )}
        {children}
      </div>
    </CreateModal>
  );
}
