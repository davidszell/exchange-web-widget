import React, { useState } from "react";
import { WalletType } from "../../types";
import Modal from "../Modal";
import WalletPicker from "../WalletPicker";
import { Amount, Balance, Container, CurrencyButton, CurrencyContainer } from "./ExchangeItem.styled";

type ExchangeItemProps = {
    wallet: WalletType,
    handleWalletChange: Function,
    amount: number,
    handleAmountChange: Function

}

const ExchangeItem = ({ wallet, handleWalletChange, amount, handleAmountChange }: ExchangeItemProps): JSX.Element => {
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
        <Container>
            <CurrencyContainer>
                <CurrencyButton onClick={handleShowWalletPicker}>{wallet.name}</CurrencyButton>
                <Amount type="number" placeholder="0" value={amount} onChange={handleOnChange} ></Amount>
            </CurrencyContainer>
            <Balance>Balance: {wallet.symbol}{wallet.balance}</Balance>
            {showWalletPicker ? (
                <Modal handleClose={handleHideWalletPicker}>
                    <WalletPicker handleWalletChange={handleWalletPicked} />
                </Modal>
            ) : ''}
        </Container>
    );
}

export default ExchangeItem;