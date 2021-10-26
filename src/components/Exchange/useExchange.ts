import { useMemo, useState } from "react"
import { useAppSelector } from "../../reduxHooks";

export type WalletType = {
    name: string,
    balance: number,
    longName: string,
    symbol: string
}

export type ExchangeRatesType = {
    base: string,
    rates: {
        [id: string]: number
    }
}

export type ExchangeDirectionType = 'buy' | 'sell';

const useExchange = () => {

    const wallets = useAppSelector(state => state.wallets);
    const exchangeRates = useAppSelector(state => state.exchangeRates);

    const [fromWallet, setFromWallet] = useState<WalletType>(wallets[0]);
    const [toWallet, setToWallet] = useState<WalletType>(wallets[1]);
    const [fromAmount, setFromAmount] = useState<number>(0);
    const [toAmount, setToAmount] = useState<number>(0);
    const [direction, setDirection] = useState<ExchangeDirectionType>('sell');

    const exchangeRate: number = useMemo(() => {
        if (fromWallet.name == exchangeRates.base) {
            return exchangeRates.rates[toWallet.name];
        }
        const fromRate = exchangeRates.rates[fromWallet.name];
        const toRate = exchangeRates.rates[toWallet.name];

        return (toRate / fromRate);
        
    }, [fromWallet, toWallet, exchangeRates]);

    const handleFromWalletChange = (currencyName: string) => {
        if (fromWallet.name == currencyName) {
            return;
        }

        const newCurrency = wallets.find((item) => item.name == currencyName);

        if (!newCurrency) {
            return;
        }

        if (toWallet.name == currencyName) {
            setToWallet(fromWallet);
        }

        setFromWallet(newCurrency);
        setFromAmount(0);
        setToAmount(0);
    }

    const handleToWalletChange = (currencyName: string) => {
        if (toWallet.name == currencyName) {
            return;
        }

        const newCurrency = wallets.find((item) => item.name == currencyName);

        if (!newCurrency) {
            return;
        }

        if (fromWallet.name == currencyName) {
            setFromWallet(toWallet);
        }

        setToWallet(newCurrency);
        setFromAmount(0);
        setToAmount(0);
    }

    const handleFromAmountChange = (newAmount: number) => {
        setFromAmount(Math.max(newAmount, 0));
        setToAmount(newAmount * exchangeRate);
    }

    const handleToAmountChange = (newAmount: number) => {
        setToAmount(Math.max(newAmount, 0));
        setFromAmount(newAmount * exchangeRate);
    }

    const toggleDirection = () => {
        setDirection((prevDirection) => prevDirection == 'sell' ? 'buy' : 'sell');
    }

    return {
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
        toggleDirection
    }
}

export default useExchange;