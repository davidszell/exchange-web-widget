import React from 'react';
import { CloseButton, Container, Content } from './Modal.styled';

type ModalPropsType = {
  children: React.ReactNode,
  handleClose: () => void
};

const Modal = ({ children, handleClose }: ModalPropsType): JSX.Element => {
  const handleCloseClick = () => {
    handleClose();
  };

  return (
    <Container data-testid="modal">
      <Content>
        <CloseButton onClick={handleCloseClick}>X</CloseButton>
        { children }
      </Content>
    </Container>
  );
};

export default Modal;
