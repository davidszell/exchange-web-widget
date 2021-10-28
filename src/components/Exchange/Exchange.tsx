import React from 'react';
import ExchangeItem from '../ExchangeItem';
import {
  Container, DirectionButton, ExchangeButton, Header, Heading, SubHeader,
} from './Exchange.styled';
import useExchange from '../../hooks/useExchange';

const Exchange = (): JSX.Element => {
  const {
    sourceWallet,
    destinationWallet,
    sourceAmount,
    destinationAmount,
    exchangeRate,
    exchangeAction,
    isExchangeDisabled,
    handleSourceWalletChange,
    handleDestinationWalletChange,
    handleSourceAmountChange,
    handleDestinationAmountChange,
    handleExchange,
    toggleExchangeAction,
  } = useExchange();

  if (exchangeRate === null) {
    return (
      <p>Loading...</p>
    );
  }
  return (
    <Container>
      <Heading>
        <Header data-testid="header">
          {exchangeAction === 'sell' ? 'Sell' : 'Buy'}
          {' '}
          {sourceWallet.name}
        </Header>
        <SubHeader data-testid="exchangeRate">
          {sourceWallet.symbol}
          1 =
          {' '}
          {destinationWallet.symbol}
          {exchangeRate}
        </SubHeader>
      </Heading>
      <ExchangeItem
        wallet={sourceWallet}
        handleWalletChange={handleSourceWalletChange}
        amount={sourceAmount}
        handleAmountChange={handleSourceAmountChange}
        deduct={exchangeAction === 'sell'}
      />
      <DirectionButton data-testid="directionButton" onClick={toggleExchangeAction}>{exchangeAction === 'sell' ? '↓' : '↑'}</DirectionButton>
      <ExchangeItem
        wallet={destinationWallet}
        handleWalletChange={handleDestinationWalletChange}
        amount={destinationAmount}
        handleAmountChange={handleDestinationAmountChange}
        deduct={exchangeAction === 'buy'}
      />
      <ExchangeButton data-testid="exchangeButton" onClick={handleExchange} disabled={isExchangeDisabled}>
        {exchangeAction === 'sell' ? 'Sell' : 'Buy'}
        {' '}
        {sourceWallet.name}
        {' '}
        {exchangeAction === 'sell' ? 'for' : 'with'}
        {' '}
        {destinationWallet.name}
      </ExchangeButton>
    </Container>
  );
};

export default Exchange;
