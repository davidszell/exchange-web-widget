import { useMemo, useState } from "react"

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

const useExchange = () => {
    const initialWallets: WalletType[] = [
        {
            name: "EUR",
            balance: 10,
            longName: "Euro",
            symbol: "€"
        },
        {
            name: "GBP",
            balance: 20,
            longName: "British Pounds",
            symbol: "£"
        },
        {
            name: "USD",
            balance: 30,
            longName: "US Dollars",
            symbol: "$"
        }
    ];

    const initialExchangeRates: ExchangeRatesType = {
        base: "EUR",
        rates: {
            "EUR": 1,
            "GBP": 0.85,
            "USD": 1.16
        }
    }

    const [exchangeRates, setExchangeRates] = useState(initialExchangeRates);
    const [wallets, setWallets] = useState(initialWallets);

    const [fromCurrency, setFromCurrency] = useState(wallets[0]);
    const [toCurrency, setToCurrency] = useState(wallets[2]);
    const [fromAmount, setFromAmount] = useState(0);
    const [toAmount, setToAmount] = useState(0);
    const [isSell, setSell] = useState(true);

    const exchangeRate: number = useMemo(() => {
        if (fromCurrency.name == exchangeRates.base) {
            return exchangeRates.rates[toCurrency.name];
        }
        const fromRate = exchangeRates.rates[fromCurrency.name];
        const toRate = exchangeRates.rates[toCurrency.name];

        return (toRate / fromRate);
        
    }, [fromCurrency, toCurrency, exchangeRates]);

    const handleFromCurrencyChange = (currencyName: string) => {
        if (fromCurrency.name == currencyName) {
            return;
        }

        const newCurrency = wallets.find((item) => item.name == currencyName);

        if (!newCurrency) {
            return;
        }

        if (toCurrency.name == currencyName) {
            setToCurrency(fromCurrency);
        }

        setFromCurrency(newCurrency);
        setFromAmount(0);
        setToAmount(0);
    }

    const handleToCurrencyChange = (currencyName: string) => {
        if (toCurrency.name == currencyName) {
            return;
        }

        const newCurrency = wallets.find((item) => item.name == currencyName);

        if (!newCurrency) {
            return;
        }

        if (fromCurrency.name == currencyName) {
            setFromCurrency(toCurrency);
        }

        setToCurrency(newCurrency);
        setFromAmount(0);
        setToAmount(0);
    }

    const handleFromAmountChange = (newAmount: number) => {
        setFromAmount(newAmount);
        setToAmount(newAmount * exchangeRate);
    }

    const handleToAmountChange = (newAmount: number) => {
        setToAmount(newAmount);
        setFromAmount(newAmount * exchangeRate);
    }

    const toggleSell = () => {
        setSell((prevIsSell) => !prevIsSell);
    }

    return {
        fromCurrency,
        toCurrency,
        fromAmount,
        toAmount,
        exchangeRate,
        isSell,
        handleFromCurrencyChange,
        handleToCurrencyChange,
        handleFromAmountChange,
        handleToAmountChange,
        toggleSell
    }
}

export default useExchange;