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
    padding: 10px;
    border-radius: 10px;
`;

export const CloseButton = styled.button`
    width: 2em;
    height: 2em;
    border: 2px solid #777;
    color: #777;
    background-color: white;
    border-radius: 50%;
    cursor: pointer;
    font-weight: 500;
    font-size: 1em;
    float: right;

    &:hover {
        border-color: #55F;
        color: #55F;
    }
`;