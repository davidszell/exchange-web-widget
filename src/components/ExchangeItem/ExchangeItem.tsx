import React, { useState } from "react";
import { WalletType } from "../../types";
import Modal from "../Modal";
import WalletPicker from "../WalletPicker";

type ExchangeItemProps = {
    wallet: WalletType,
    handleWalletChange: Function,
    amount: number,
    handleAmountChange: Function

}

const ExchangeItem = ({wallet, handleWalletChange, amount, handleAmountChange}: ExchangeItemProps): JSX.Element => {
    const [showWalletPicker, setShowWalletPicker] = useState<boolean>(false);

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleAmountChange(event.target.value);
    }

    const handleShowWalletPicker = () => {
        setShowWalletPicker(true);
    }

    const handleHideWalletPicker = () => {
        setShowWalletPicker(false);
    }

    const handleWalletPicked = (walletName: string) => {
        handleWalletChange(walletName);
        setShowWalletPicker(false);
    }

    return (
        <div>
            <button onClick={handleShowWalletPicker}>{wallet.name}</button>
            <p>Balance: {wallet.balance}</p>
            <input type="number" placeholder="0" value={amount} onChange={handleOnChange} ></input>
            {showWalletPicker ? (
                <Modal handleClose={handleHideWalletPicker}>
                    <WalletPicker handleWalletChange={handleWalletPicked} />
                </Modal>
            ) : ''}
        </div>
    );
}

export default ExchangeItem;