import styled from 'styled-components';

export const Container = styled.ul`
  list-style: none;
  padding: 0;
`;

export const WalletInfo = styled.li`
  display: flex;
  flex-direction: row;
  gap: 40px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
  color: #054A92;
  padding: 10px 40px;

  &:hover {
    color: #157ae2;
  }
`;

export const Name = styled.p`
  display: flex;
  align-items: center;
  margin: 0;
  font-size: 1.2em;
  font-weight: 500px;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex: 1;
`;

export const LongName = styled.p`
  margin: 0;
`;

export const Balance = styled.p`
  margin: 0;
  font-size: 0.8em;
`;
