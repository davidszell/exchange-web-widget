import { fetchExchangeRates } from "../actions"
import exchangeRatesReducer from "./exchangeRatesReducer"

describe('exchangeRatesReducer', () => {
    it('returns state by default', () => {
        const initialState = {
            base: "EUR",
            rates: {
            }
        }

        const newState = exchangeRatesReducer(initialState, {type: 'foo'})
        expect(newState).toEqual(initialState)
    })

    it('handles SET_EXCHANGE_RATES correctly', () => {
        const initialState = {
            base: "EUR",
            rates: {
            }
        }
        const payload = {
            base: "USD",
            rates: {
            }
        }

        const newState = exchangeRatesReducer(initialState, {type: 'SET_EXCHANGE_RATES', payload: payload})
        expect(newState).toEqual(payload)
    })
})