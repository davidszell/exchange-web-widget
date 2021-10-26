import { useEffect, useMemo, useState } from "react"
import { fetchExchangeRates } from "../../actions";
import { useAppDispatch, useAppSelector } from "../../reduxHooks";
import { WalletType } from "../../types";

export type ExchangeDirectionType = 'buy' | 'sell';

const useExchange = () => {

    const wallets = useAppSelector(state => state.wallets);
    const exchangeRates = useAppSelector(state => state.exchangeRates);

    const [fromWallet, setFromWallet] = useState<WalletType>(wallets[0]);
    const [toWallet, setToWallet] = useState<WalletType>(wallets[1]);
    const [fromAmount, setFromAmount] = useState<number>(0);
    const [toAmount, setToAmount] = useState<number>(0);
    const [direction, setDirection] = useState<ExchangeDirectionType>('sell');

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchExchangeRates())

        const interval = setInterval(() => {
            dispatch(fetchExchangeRates());
        }, 10000);

        return () => clearInterval(interval)
    }, [])

    const exchangeRate: number = useMemo(() => {
        if (fromWallet.name == exchangeRates.base) {
            return exchangeRates.rates[toWallet.name];
        }
        const fromRate = exchangeRates.rates[fromWallet.name];
        const toRate = exchangeRates.rates[toWallet.name];

        return (toRate / fromRate);

    }, [fromWallet, toWallet, exchangeRates]);

    const handleFromWalletChange = (walletName: string) => {
        if (fromWallet.name == walletName) {
            return;
        }

        const newCurrency = wallets.find((item) => item.name == walletName);

        if (!newCurrency) {
            return;
        }

        if (toWallet.name == walletName) {
            setToWallet(fromWallet);
        }

        setFromWallet(newCurrency);
        setFromAmount(0);
        setToAmount(0);
    }

    const handleToWalletChange = (walletName: string) => {
        if (toWallet.name == walletName) {
            return;
        }

        const newCurrency = wallets.find((item) => item.name == walletName);

        if (!newCurrency) {
            return;
        }

        if (fromWallet.name == walletName) {
            setFromWallet(toWallet);
        }

        setToWallet(newCurrency);
        setFromAmount(0);
        setToAmount(0);
    }

    const handleFromAmountChange = (newAmount: number) => {
        if (newAmount > 0) {
            setFromAmount(newAmount);
            setToAmount(newAmount * exchangeRate);
        } else {
            setToAmount(0);
            setFromAmount(0);
        }

    }

    const handleToAmountChange = (newAmount: number) => {
        if (newAmount > 0) {
            setToAmount(newAmount);
            setFromAmount(newAmount / exchangeRate);
        } else {
            setToAmount(0);
            setFromAmount(0);
        }

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