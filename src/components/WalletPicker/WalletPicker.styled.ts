import styled from 'styled-components';

export const Container = styled.ul`
    list-style: none;
    padding: 0;

    & li {
        border-bottom: 1px solid #ccc;
        cursor: pointer;
        color: #555;

        &:hover {
            color: #222;
        }
    }
`;
