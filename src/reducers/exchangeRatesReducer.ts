import { AnyAction } from "redux";

export type ExchangeRatesState = {
    base: string,
    rates: {
        [id: string]: number
    }
}

const initialState: ExchangeRatesState = {
    base: "EUR",
    rates: {
        "EUR": 1,
        "GBP": 0.85,
        "USD": 1.16
    }
}

const exchangeRatesReducer = (state = initialState, action: AnyAction) => {
        return state;
}

export default exchangeRatesReducer;