import React from "react";
import ExchangeItem from "../ExchangeItem";
import { Container } from "./Exchange.styled";
import useExchange from "./useExchange";

const Exchange = (): JSX.Element => {
    const {
        fromCurrency,
        toCurrency,
        fromAmount,
        toAmount,
        exchangeRate,
        isSell,
        handleFromCurrencyChange,
        handleToCurrencyChange,
        handleFromAmountChange,
        handleToAmountChange,
        toggleSell
    } = useExchange();

    const handleExchangeDirectionChange = () => {
        toggleSell();
    }

    return (
        <Container>
            <h1 data-testid="header">{isSell ? "Sell" : "Buy"} {fromCurrency.name}</h1>
            <p data-testid="exchangeRate">{fromCurrency.symbol}1 = {toCurrency.symbol}{exchangeRate}</p>
            <ExchangeItem currency={fromCurrency} handleCurrencyChange={handleFromCurrencyChange}
                amount={fromAmount} handleAmountChange={handleFromAmountChange} />
            <button data-testid="directionButton" onClick={handleExchangeDirectionChange}>{isSell ? "↓" : "↑"}</button>
            <ExchangeItem currency={toCurrency} handleCurrencyChange={handleToCurrencyChange}
                amount={toAmount} handleAmountChange={handleToAmountChange} />
            <button data-testid="exchangeButton">{isSell ? "Sell" : "Buy"} {fromCurrency.name} to {toCurrency.name}</button>
        </Container>
    )
}

export default Exchange;