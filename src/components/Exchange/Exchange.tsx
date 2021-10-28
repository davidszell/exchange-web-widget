import React from 'react';
import ExchangeItem from '../ExchangeItem';
import {
  Container, DirectionButton, ExchangeButton, Header, Heading, SubHeader,
} from './Exchange.styled';
import useExchange from './useExchange';

const Exchange = (): JSX.Element => {
  const {
    fromWallet,
    toWallet,
    fromAmount,
    toAmount,
    exchangeRate,
    direction,
    disableExchange,
    handleFromWalletChange,
    handleToWalletChange,
    handleFromAmountChange,
    handleToAmountChange,
    handleExchange,
    toggleDirection,
  } = useExchange();

  const handleExchangeDirectionChange = () => {
    toggleDirection();
  };

  if (Number.isNaN(exchangeRate)) {
    return (
      <p>Loading...</p>
    );
  }
  return (
    <Container>
      <Heading>
        <Header data-testid="header">
          {direction === 'sell' ? 'Sell' : 'Buy'}
          {' '}
          {fromWallet.name}
        </Header>
        <SubHeader data-testid="exchangeRate">
          {fromWallet.symbol}
          1 =
          {' '}
          {toWallet.symbol}
          {exchangeRate}
        </SubHeader>
      </Heading>
      <ExchangeItem
        wallet={fromWallet}
        handleWalletChange={handleFromWalletChange}
        amount={fromAmount}
        handleAmountChange={handleFromAmountChange}
      />
      <DirectionButton data-testid="directionButton" onClick={handleExchangeDirectionChange}>{direction === 'sell' ? '↓' : '↑'}</DirectionButton>
      <ExchangeItem
        wallet={toWallet}
        handleWalletChange={handleToWalletChange}
        amount={toAmount}
        handleAmountChange={handleToAmountChange}
      />
      <ExchangeButton data-testid="exchangeButton" onClick={handleExchange} disabled={disableExchange}>
        {direction === 'sell' ? 'Sell' : 'Buy'}
        {' '}
        {fromWallet.name}
        {' '}
        {direction === 'sell' ? 'for' : 'with'}
        {' '}
        {toWallet.name}
      </ExchangeButton>
    </Container>
  );
};

export default Exchange;
