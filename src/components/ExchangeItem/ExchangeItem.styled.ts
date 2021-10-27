import styled from "styled-components";
import { Button } from "../Exchange/Exchange.styled";

export const Container = styled.div`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const CurrencyContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
`;

export const CurrencyButton = styled(Button)`
    &::after {
        content: '⮁';
        margin-left: 10px;
    }
`;

export const Amount = styled.input`
    flex: 1;
`;

export const Balance = styled.p`
    font-size: 0.8em;
    margin: 0;
    color: #777;
`;