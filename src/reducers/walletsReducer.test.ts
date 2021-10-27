import { fetchExchangeRates } from "../actions"
import { WalletType } from "../types"
import walletsReducer from "./walletsReducer"

describe('walletsReducer', () => {
    it('returns state by default', () => {
        const initialState: WalletType[] = []

        const newState = walletsReducer(initialState, {type: 'foo'})
        expect(newState).toEqual(initialState)
    })

    it('handles SET_WALLETS correctly', () => {
        const initialState: WalletType[] = []
        const payload = [
            {
                name: "EUR",
                balance: 10,
                longName: "Euro",
                symbol: "€"
            }
        ]

        const newState = walletsReducer(initialState, {type: 'SET_WALLETS', payload: payload})
        expect(newState).toEqual(payload)
    })
})