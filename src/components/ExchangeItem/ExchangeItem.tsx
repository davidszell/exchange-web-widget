import React, { useEffect, useState } from 'react';
import { WalletType } from '../../types';
import AmountField from '../AmountField';
import Modal from '../Modal';
import WalletPicker from '../WalletPicker';
import {
  Balance, Container, CurrencyButton, CurrencyContainer, Error, InfoContainer,
} from './ExchangeItem.styled';

type ExchangeItemProps = {
  wallet: WalletType,
  handleWalletChange: (walletName: string) => void,
  amount: number | null,
  handleAmountChange: (newAmount: number | null) => void,
  deduct?: boolean
};

const ExchangeItem = ({
  wallet, handleWalletChange, amount, handleAmountChange, deduct,
}: ExchangeItemProps): JSX.Element => {
  const [showWalletPicker, setShowWalletPicker] = useState<boolean>(false);
  const [exceedsBalance, setExceedsBalance] = useState<boolean>(false);

  useEffect(() => {
    setExceedsBalance(!!deduct && wallet.balance < (amount || 0));
  }, [amount, deduct, wallet.balance]);

  const handleOpenWalletPicker = () => {
    setShowWalletPicker(true);
  };

  const handleCloseWalletPicker = () => {
    setShowWalletPicker(false);
  };

  const handleWalletPicked = (walletName: string) => {
    handleWalletChange(walletName);
    setShowWalletPicker(false);
  };

  return (
    <Container className={exceedsBalance ? 'error' : ''}>
      <CurrencyContainer>
        <CurrencyButton onClick={handleOpenWalletPicker}>{wallet.name}</CurrencyButton>
        <AmountField
          amount={amount}
          handleAmountChange={handleAmountChange}
        />
      </CurrencyContainer>
      <InfoContainer>
        <Balance>
          Balance:
          {wallet.symbol}
          {wallet.balance}
        </Balance>
        {exceedsBalance && (
          <Error>Exceeds balance</Error>
        )}
      </InfoContainer>
      {showWalletPicker && (
        <Modal handleClose={handleCloseWalletPicker}>
          <WalletPicker handleWalletChange={handleWalletPicked} />
        </Modal>
      )}
    </Container>
  );
};

ExchangeItem.defaultProps = {
  deduct: false,
};

export default ExchangeItem;
