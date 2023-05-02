import { useState } from 'react';
import { WithdrawalModalContainer, WithdrawalModalContent, WithdrawalModalMessage, ConfirmButton, CancelButton } from './styles';

interface WithdrawalModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

function WithdrawalModal(props: WithdrawalModalProps) {
  const [isOpen, setIsOpen] = useState(true);

  const handleConfirm = () => {
    props.onConfirm();
    setIsOpen(false);
  };

  const handleCancel = () => {
    props.onCancel();
    setIsOpen(false);
  };

  return (
    <WithdrawalModalContainer isOpen={isOpen}>
      <WithdrawalModalContent>
        <WithdrawalModalMessage>{props.message}</WithdrawalModalMessage>
        <div>
          <ConfirmButton onClick={handleConfirm}>OK</ConfirmButton>
          <CancelButton onClick={handleCancel}>Cancel</CancelButton>
        </div>
      </WithdrawalModalContent>
    </WithdrawalModalContainer>
  );
}

export default WithdrawalModal;
