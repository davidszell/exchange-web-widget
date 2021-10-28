import { fetchExchangeRates } from "../actions"
import { WalletType } from "../types"
import walletsReducer, { initialState } from "./walletsReducer"

describe('walletsReducer', () => {
    it('returns state by default', () => {
        const state: WalletType[] = []

        const newState = walletsReducer(state, {type: 'foo'})
        expect(newState).toEqual(state)
    })

    it('uses initial state', () => {
        const newState = walletsReducer(undefined, {type: 'foo'})
        expect(newState).toEqual(initialState)
    })

    it('handles SET_WALLETS correctly', () => {
        const payload = [
            {
                name: "EUR",
                balance: 10,
                longName: "Euros",
                symbol: "€"
            }
        ]

        const newState = walletsReducer(undefined, {type: 'SET_WALLETS', payload: payload})
        expect(newState).toEqual(payload)
    })
})