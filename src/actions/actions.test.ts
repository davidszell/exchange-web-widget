import { setExchangeRates, setWallets } from "."

describe('actions', () => {
  it('setExchangeRates returns the correct action', () => {
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

  it('setWallets returns the correct action', () => {
    const setWalletsAction = {
      type: 'SET_WALLETS',
      payload: [
        {
          name: "EUR",
          balance: 10,
          longName: "Euros",
          symbol: "€"
      }
      ]
    }

    expect(setWallets(setWalletsAction.payload)).toEqual(setWalletsAction);
  })
})