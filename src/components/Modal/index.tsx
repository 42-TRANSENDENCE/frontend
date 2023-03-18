import { Children, useCallback, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { CloseModalButton, CreateModal } from './styles';

const chat_backurl = 'http://127.0.0.1:3095';

export default function Modal({
  children,
  onCloseModal,
  show,
}: {
  children: any;
  onCloseModal: any;
  show: any;
}) {
  const stopPropagation = useCallback((e: any) => {
    e.stopPropagation();
  }, []);

  if (!show) return null;
  return (
    <CreateModal onClick={onCloseModal}>
      <div onClick={stopPropagation}>
        <CloseModalButton onClick={onCloseModal}>&times;</CloseModalButton>
        {children}
      </div>
    </CreateModal>
  );
}
