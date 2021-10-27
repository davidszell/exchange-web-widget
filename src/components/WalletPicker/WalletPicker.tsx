import React from "react"
import { useAppSelector } from "../../reduxHooks";
import { WalletType } from "../../types";
import { Container } from "./WalletPicker.styled";

type WalletPickerProps = {
    handleWalletChange: Function
}

const WalletPicker = ({ handleWalletChange }: WalletPickerProps): JSX.Element => {
    const wallets: WalletType[] = useAppSelector(state => state.wallets)

    return (
        <Container>
            {wallets.map(item => (
                <li key={item.name} onClick={() => handleWalletChange(item.name)}>
                    <p data-testid="name">{item.name}</p>
                    <p data-testid="longName">{item.longName}</p>
                    <p data-testid="balance">{item.symbol} {item.balance}</p>
                </li>
            ))}
        </Container>
    )
}

export default WalletPicker;