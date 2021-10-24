import React, { useState } from "react";
import ExchangeItem from "../ExchangeItem";
import { Container } from "./Exchange.styled";
import useExchange from "./useExchange";

const Exchange = (): JSX.Element => {
    const {fromCurrency, toCurrency, exchangeRate} = useExchange();
    const [isSell, setSell] = useState(true);

    const handleExchangeDirectionChange = () => {
        setSell((prevIsSell) => !prevIsSell);
    }

    return (
        <Container>
            <h1>{isSell ? "Sell" : "Buy"} {fromCurrency.name}</h1>
            <p>{fromCurrency.symbol}1 = {toCurrency.symbol}{exchangeRate}</p>
            <ExchangeItem currency={fromCurrency.name} balance={fromCurrency.balance} />
            <button onClick={handleExchangeDirectionChange}>{isSell ? "↓" : "↑"}</button>
            <ExchangeItem currency={toCurrency.name} balance={toCurrency.balance} />
            <button>{isSell ? "Sell" : "Buy"} {fromCurrency.name} to {toCurrency.name}</button>
        </Container>
    )
}

export default Exchange;