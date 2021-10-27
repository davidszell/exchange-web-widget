import React, { MouseEventHandler } from "react";
import { CloseButton, Container, Content } from "./Modal.styled";

type ModalPropsType = {
    children: React.ReactNode,
    handleClose: Function
}

const Modal = ({ children, handleClose }: ModalPropsType): JSX.Element => {
    const handleCloseClick = (event: React.MouseEvent) => {
        handleClose();
    }

    return (
        <Container>
            <Content>
                <CloseButton onClick={handleCloseClick}>X</CloseButton>
                { children }
            </Content>
        </Container>
    )
}

export default Modal;