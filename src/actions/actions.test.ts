import { setExchangeRates } from "."

describe('actions', () => {
    describe('setExchangeRates', () => {
        it('should return the correct action', () => {
            const setExchangeRatesAction = {
                type: 'SET_EXCHANGE_RATES',
                payload: {
                    base: "EUR",
                    rates: {
                        "EUR": 1,
                        "GBP": 0.85,
                        "USD": 1.16
                    }
                }
            }
            expect(setExchangeRates(setExchangeRatesAction.payload)).toEqual(setExchangeRatesAction);
        })
    })
})