import React from "react";
import ExchangeItem from "../ExchangeItem";
import { Container } from "./Exchange.styled";
import useExchange from "./useExchange";

const Exchange = (): JSX.Element => {
    const {
        fromWallet,
        toWallet,
        fromAmount,
        toAmount,
        exchangeRate,
        direction,
        handleFromWalletChange,
        handleToWalletChange,
        handleFromAmountChange,
        handleToAmountChange,
        handleExchange,
        toggleDirection
    } = useExchange();

    const handleExchangeDirectionChange = () => {
        toggleDirection();
    }

    return (
        <Container>
            <h1 data-testid="header">{direction == 'sell' ? "Sell" : "Buy"} {fromWallet.name}</h1>
            <p data-testid="exchangeRate">{fromWallet.symbol}1 = {toWallet.symbol}{exchangeRate}</p>
            <ExchangeItem wallet={fromWallet} handleWalletChange={handleFromWalletChange}
                amount={fromAmount} handleAmountChange={handleFromAmountChange} />
            <button data-testid="directionButton" onClick={handleExchangeDirectionChange}>{direction === 'sell' ? "↓" : "↑"}</button>
            <ExchangeItem wallet={toWallet} handleWalletChange={handleToWalletChange}
                amount={toAmount} handleAmountChange={handleToAmountChange} />
            <button data-testid="exchangeButton" onClick={handleExchange}>{direction === 'sell' ? "Sell" : "Buy"} {fromWallet.name} {direction === 'sell' ? "for" : "with"} {toWallet.name}</button>
        </Container>
    )
}

export default Exchange;