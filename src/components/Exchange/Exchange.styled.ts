import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px;
  border: 2px solid #157ae2;
  border-radius: 10px;
  width: 500px;
  color: #222;
  gap: 20px;
`;

export const Heading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Header = styled.h1`
  margin: 0;
  color: #222;
`;

export const SubHeader = styled.p`
  margin: 0;
  color: #777;
  font-size: 0.8em;
`;

export const Button = styled.button`
  border: 1px solid #157ae2;
  color: #157ae2;
  background-color: white;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    color: white;
    background-color: #157ae2;
  }
`;

export const ExchangeButton = styled(Button)`
  width: 100%;
`;

export const DirectionButton = styled(Button)`
  border-color: #777;
  color: #777;
  font-size: 1.2em;

  &:hover {
    border-color: #157ae2;
    color: #157ae2;
    background-color: white;
  }
`;
