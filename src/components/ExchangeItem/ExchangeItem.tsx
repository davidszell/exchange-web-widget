import React from "react";
import { WalletType } from "../Exchange/useExchange";

type ExchangeItemProps = {
    currency: WalletType,
    handleCurrencyChange: Function,
    amount: number,
    handleAmountChange: Function

}

const ExchangeItem = ({currency, handleCurrencyChange, amount, handleAmountChange}: ExchangeItemProps): JSX.Element => {
    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleAmountChange(event.target.value);
    }

    return (
        <div>
            <button onClick={() => {handleCurrencyChange("GBP")}}>{currency.name}</button>
            <p>Balance: {currency.balance}</p>
            <input type="number" placeholder="0" value={amount} onChange={handleOnChange} ></input>
        </div>
    );
}

export default ExchangeItem;