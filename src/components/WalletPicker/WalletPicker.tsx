import React from "react"
import { useAppSelector } from "../../reduxHooks";
import { Container } from "./WalletPicker.styled";

type WalletPickerProps = {
    handleWalletChange: Function
}

const WalletPicker = ({ handleWalletChange }: WalletPickerProps): JSX.Element => {
    const wallets = useAppSelector(state => state.wallets)

    return (
        <Container>
            <ul>
                {wallets.map(item => (
                    <li key={item.name} onClick={() => handleWalletChange(item.name)}>
                        <p data-testid="name">{item.name}</p>
                        <p data-testid="longName">{item.longName}</p>
                        <p data-testid="balance">{item.symbol} {item.balance}</p>
                    </li>
                ))}
            </ul>
        </Container>
    )
}

export default WalletPicker;