import React from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';
import { WalletType } from '../../types';
import {
  Balance, Container, InfoContainer, LongName, Name, WalletInfo,
} from './WalletPicker.styled';

type WalletPickerProps = {
  handleWalletChange: (newWallet: string) => void
};

const WalletPicker = ({ handleWalletChange }: WalletPickerProps): JSX.Element => {
  const wallets: WalletType[] = useAppSelector((state) => state.wallets);

  return (
    <Container>
      {wallets.map((item) => (
        <WalletInfo key={item.name} onClick={() => handleWalletChange(item.name)}>
          <Name data-testid="name">{item.name}</Name>
          <InfoContainer>
            <LongName data-testid="longName">{item.longName}</LongName>
            <Balance data-testid="balance">
              {item.symbol}
              {' '}
              {item.balance}
            </Balance>
          </InfoContainer>
        </WalletInfo>
      ))}
    </Container>
  );
};

export default WalletPicker;
