import { AnyAction } from "redux"
import { ThunkAction, ThunkDispatch } from "redux-thunk"
import { ExchangeRatesType } from "../types"

export type SetExchangeRatesActionType = {
    type: 'SET_EXCHANGE_RATES',
    payload: ExchangeRatesType
}

export const setExchangeRates = (exchangeRates: ExchangeRatesType) => {
    return { type: 'SET_EXCHANGE_RATES', payload: exchangeRates }
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