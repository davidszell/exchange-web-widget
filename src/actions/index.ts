import { AnyAction } from "redux"
import { ThunkAction, ThunkDispatch } from "redux-thunk"
import { RootState } from "../store"
import { ExchangeRatesType, WalletType } from "../types"

export type SetExchangeRatesActionType = {
    type: 'SET_EXCHANGE_RATES',
    payload: ExchangeRatesType
}

export type SetWalletsActionType = {
    type: 'SET_WALLETS',
    payload: WalletType[]
}

export const setExchangeRates = (exchangeRates: ExchangeRatesType): SetExchangeRatesActionType => {
    return { type: 'SET_EXCHANGE_RATES', payload: exchangeRates }
}

export const setWallets = (wallets: WalletType[]): SetWalletsActionType => {
    return { type: 'SET_WALLETS', payload: wallets }
}

export const fetchExchangeRates = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
        return new Promise<void>((resolve) => {
            fetch(`https://openexchangerates.org/api/latest.json?app_id=${process.env.API_KEY}`)
                .then(response => response.json())
                .then(json => {
                    dispatch(setExchangeRates(json))
                })
                .finally(resolve)
        })
    }
}

export const doExchange = (fromCurrency: string, toCurrency: string, direction: 'buy' | 'sell', fromAmount: number, toAmount: number): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => RootState): Promise<void> => {
        return new Promise<void>((resolve) => {
            // API call for exchange should be called here
            // Saving new values in store as a mock implementation

            const newState: WalletType[] = [];
            getState().wallets.forEach(wallet => {
                if (wallet.name == fromCurrency) {
                    let amount = typeof fromAmount === 'string' ? parseFloat(fromAmount) : fromAmount
                    let newBalance;
                    if (direction == 'buy') {
                        newBalance = wallet.balance + amount;
                    } else {
                        newBalance = wallet.balance - amount;
                    }
                    newState.push({
                        ...wallet,
                        balance: newBalance
                    })
                } else if (wallet.name == toCurrency) {
                    let amount = typeof toAmount === 'string' ? parseFloat(toAmount) : toAmount
                    let newBalance;
                    if (direction == 'buy') {
                        newBalance = wallet.balance - amount;
                    } else {
                        newBalance = wallet.balance + amount;
                    }
                    newState.push({
                        ...wallet,
                        balance: newBalance
                    })
                } else {
                    newState.push(wallet);
                }
            })
            dispatch(setWallets(newState));
            resolve();
        })
    }
}