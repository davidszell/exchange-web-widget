import React from "react";
import { WalletType } from "../Exchange/useExchange";

type ExchangeItemProps = {
    wallet: WalletType,
    handleWalletChange: Function,
    amount: number,
    handleAmountChange: Function

}

const ExchangeItem = ({wallet, handleWalletChange, amount, handleAmountChange}: ExchangeItemProps): JSX.Element => {
    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleAmountChange(event.target.value);
    }

    return (
        <div>
            <button onClick={() => {handleWalletChange("GBP")}}>{wallet.name}</button>
            <p>Balance: {wallet.balance}</p>
            <input type="number" placeholder="0" value={amount} onChange={handleOnChange} ></input>
        </div>
    );
}

export default ExchangeItem;