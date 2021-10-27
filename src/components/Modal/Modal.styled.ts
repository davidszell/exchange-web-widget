import styled from "styled-components";

export const Container = styled.div`
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Content = styled.div`
    width: 500px;
    max-height: 500px;
    overflow-y: auto;
    background-color: white;
`;

export const CloseButton = styled.button`
    
`;