import { useMemo, useState } from "react"

const useExchange = () => {
    type WalletType = {
        name: string,
        balance: number,
        longName: string,
        symbol: string
    }

    const wallets: WalletType[] = [
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

    type ExchangeRatesType = {
        base: string,
        rates: {
            [id: string]: number
        }
    }

    const exchangeRates: ExchangeRatesType = {
        base: "EUR",
        rates: {
            "EUR": 1,
            "GBP": 0.85,
            "USD": 1.16
        }
    }

    const [fromCurrency, setFromCurrency] = useState(wallets[0]);
    const [toCurrency, setToCurrency] = useState(wallets[2]);

    const exchangeRate = useMemo(() => {
        if (fromCurrency.name == exchangeRates.base) {
            return exchangeRates.rates[toCurrency.name].toFixed(2);
        }
        const fromRate = exchangeRates.rates[fromCurrency.name];
        const toRate = exchangeRates.rates[toCurrency.name];

        return (toRate / fromRate).toFixed(2);
        
    }, [fromCurrency, toCurrency]);

    return {
        fromCurrency,
        toCurrency,
        exchangeRate
    }
}

export default useExchange;