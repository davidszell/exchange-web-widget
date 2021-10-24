import React from "react";

type ExchangeItemProps = {
    currency: string,
    balance: number
}

const ExchangeItem = ({currency, balance}: ExchangeItemProps): JSX.Element => {
    return (
        <div>
            <button>{currency}</button>
            <p>Balance: {balance}</p>
            <input type="number" placeholder="0"></input>
        </div>
    );
}

export default ExchangeItem;