import axios from "axios";
import { doExchange, fetchExchangeRates, setExchangeRates, setWallets } from ".";
import { WalletType } from "../types";

jest.mock("axios");

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

  describe('doExchange', () => {
    const initialWallets: WalletType[] = [
      {
        name: "EUR",
        balance: 10,
        longName: "Euros",
        symbol: "€"
      },
      {
        name: "GBP",
        balance: 20,
        longName: "British Pounds",
        symbol: "£"
      },
    ]

    it('should update the wallets with the correct values when selling', async () => {
      const dispatchMock = jest.fn();
      const getStateMock = jest.fn(() => ({
        exchangeRates: {},
        wallets: initialWallets
      }));

      const expectedAction = setWallets([
        {
          balance: 9,
          longName: "Euros",
          name: "EUR",
          symbol: "€",
        },
        {
          balance: 22,
          longName: "British Pounds",
          name: "GBP",
          symbol: "£",
        }
      ])

      await doExchange('EUR', 'GBP', 'sell', 1, 2)(dispatchMock, getStateMock);
      expect(dispatchMock).toBeCalledWith(expectedAction);
    })

    it('should update the wallets with the correct values when buying', async () => {
      const dispatchMock = jest.fn();
      const getStateMock = jest.fn(() => ({
        exchangeRates: {},
        wallets: initialWallets
      }));

      const expectedAction = setWallets([
        {
          balance: 11,
          longName: "Euros",
          name: "EUR",
          symbol: "€",
        },
        {
          balance: 18,
          longName: "British Pounds",
          name: "GBP",
          symbol: "£",
        }
      ])

      await doExchange('EUR', 'GBP', 'buy', 1, 2)(dispatchMock, getStateMock);
      expect(dispatchMock).toBeCalledWith(expectedAction);
    })

    it('should not update the wallets not effected by the exchange', async () => {
      const dispatchMock = jest.fn();
      const getStateMock = jest.fn(() => ({
        exchangeRates: {},
        wallets: [
          ...initialWallets,
          {
            balance: 30,
            longName: "US Dollars",
            name: "USD",
            symbol: "$",
          }
        ]
      }));

      const expectedAction = setWallets([
        {
          balance: 11,
          longName: "Euros",
          name: "EUR",
          symbol: "€",
        },
        {
          balance: 18,
          longName: "British Pounds",
          name: "GBP",
          symbol: "£",
        },
        {
          balance: 30,
          longName: "US Dollars",
          name: "USD",
          symbol: "$",
        }
      ])

      await doExchange('EUR', 'GBP', 'buy', 1, 2)(dispatchMock, getStateMock);
      expect(dispatchMock).toBeCalledWith(expectedAction);
    })
  })

  describe('fetchExchangeRates', () => {
    const exchangeRateResponse = {
      status: 200,
      data: {
        base: "EUR",
        rates: {
          EUR: 1,
          GBP: 2,
          USD: 3
        }
      }
    }

    beforeEach(() => {
      (axios.get as jest.Mock).mockClear();
    })
    
    it('fetches exchange rates', async () => {
      (axios.get as jest.Mock).mockResolvedValue(exchangeRateResponse);
      const dispatchMock = jest.fn();
      const getStateMock = jest.fn(() => ({
        exchangeRates: {},
        wallets: []
      }));
      await fetchExchangeRates()(dispatchMock, getStateMock);
      expect(dispatchMock).toBeCalled();
    })
    
    it('updates status on successful request', async () => {
      (axios.get as jest.Mock).mockResolvedValue(exchangeRateResponse);
      const dispatchMock = jest.fn();
      const getStateMock = jest.fn(() => ({
        exchangeRates: {},
        wallets: []
      }));
      await fetchExchangeRates()(dispatchMock, getStateMock);
      expect(dispatchMock).toBeCalledWith(setExchangeRates(exchangeRateResponse.data));
    })
    
    it('does not update status on failed request', async () => {
      (axios.get as jest.Mock).mockResolvedValue({
        ...exchangeRateResponse,
        status: 404
      });
      const dispatchMock = jest.fn();
      const getStateMock = jest.fn(() => ({
        exchangeRates: {},
        wallets: []
      }));
      await fetchExchangeRates()(dispatchMock, getStateMock);
      expect(dispatchMock).not.toBeCalled();
    })
  })
})