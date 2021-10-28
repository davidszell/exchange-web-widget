import styled from 'styled-components';

export const Input = styled.input`
  flex: 1;
  border: none;
  text-align: right;
  font-size: 1.3em;
  padding: 10px;
  border-radius: 5px;
  -moz-appearance: textfield;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
