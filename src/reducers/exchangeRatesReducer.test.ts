import { fetchExchangeRates } from "../actions"
import exchangeRatesReducer, { initialState } from "./exchangeRatesReducer"

describe('exchangeRatesReducer', () => {
    it('returns state by default', () => {
        const state = {
            base: "USD",
            rates: {
                
            }
        }

        const newState = exchangeRatesReducer(state, {type: 'foo'})
        expect(newState).toEqual(state)
    })

    it('uses initial state', () => {
        const newState = exchangeRatesReducer(undefined, {type: 'foo'})
        expect(newState).toEqual(initialState)
    })

    it('handles SET_EXCHANGE_RATES correctly', () => {
        const state = {
            base: "USD",
            rates: {
            }
        }

        const newState = exchangeRatesReducer(undefined, {type: 'SET_EXCHANGE_RATES', payload: state})
        expect(newState).toEqual(state)
    })
})