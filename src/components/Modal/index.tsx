import { Children, useCallback, useState } from 'react';
import { CloseModalButton, CreateModal, InfoModalButton } from './styles';
import modalCloseButton from '../../assets/smallButton/modalCloseButton.svg';
import modalInfoButton from '../../assets/smallButton/modalQuestionButton.svg';

// const chat_backurl = `http://${import.meta.env.VITE_AWS_URL}`;

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
      <div onClick={stopPropagation}>
        {showCloseButton && (
          <CloseModalButton onClick={onCloseModal}>
            <img src={modalCloseButton} />
          </CloseModalButton>
        )}
        {showInfoButton && (
          <InfoModalButton tooltip={tooltipText}>
            <img src={modalInfoButton}/>
          </InfoModalButton>
        )}
        {children}
      </div>
    </CreateModal>
  );
}