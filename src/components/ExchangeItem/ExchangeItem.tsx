import React, { useState } from 'react';
import { WalletType } from '../../types';
import AmountField from '../AmountField';
import Modal from '../Modal';
import WalletPicker from '../WalletPicker';
import {
  Balance, Container, CurrencyButton, CurrencyContainer,
} from './ExchangeItem.styled';

type ExchangeItemProps = {
  wallet: WalletType,
  handleWalletChange: (walletName: string) => void,
  amount: number | null,
  handleAmountChange: (newAmount: number | null) => void

};

const ExchangeItem = ({
  wallet, handleWalletChange, amount, handleAmountChange,
}: ExchangeItemProps): JSX.Element => {
  const [showWalletPicker, setShowWalletPicker] = useState<boolean>(false);

  const handleShowWalletPicker = () => {
    setShowWalletPicker(true);
  };

  const handleHideWalletPicker = () => {
    setShowWalletPicker(false);
  };

  const handleWalletPicked = (walletName: string) => {
    handleWalletChange(walletName);
    setShowWalletPicker(false);
  };

  return (
    <Container>
      <CurrencyContainer>
        <CurrencyButton onClick={handleShowWalletPicker}>{wallet.name}</CurrencyButton>
        <AmountField
          amount={amount}
          handleAmountChange={handleAmountChange}
        />
      </CurrencyContainer>
      <Balance>
        Balance:
        {wallet.symbol}
        {wallet.balance}
      </Balance>
      {showWalletPicker ? (
        <Modal handleClose={handleHideWalletPicker}>
          <WalletPicker handleWalletChange={handleWalletPicked} />
        </Modal>
      ) : ''}
    </Container>
  );
};

export default ExchangeItem;
