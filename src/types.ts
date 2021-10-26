export type ExchangeRatesType = {
    base: string,
    rates: {
        [id: string]: number
    }
}

export type WalletType = {
    name: string,
    balance: number,
    longName: string,
    symbol: string
}