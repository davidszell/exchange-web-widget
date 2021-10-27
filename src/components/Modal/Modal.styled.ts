import styled from 'styled-components';
import { Button } from '../Exchange/Exchange.styled';

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
    padding: 10px;
    border-radius: 10px;
    position: relative;
`;

export const CloseButton = styled(Button)`
    position: absolute;
    right: 10px;
    top: 10px;
`;
