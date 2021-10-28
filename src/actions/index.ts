import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { RootState } from '../store';
import { ExchangeRatesType, WalletType } from '../types';

export type SetExchangeRatesActionType = {
  type: 'SET_EXCHANGE_RATES',
  payload: ExchangeRatesType
};

export type SetWalletsActionType = {
  type: 'SET_WALLETS',
  payload: WalletType[]
};

export const setExchangeRates = (
  exchangeRates: ExchangeRatesType,
): SetExchangeRatesActionType => ({ type: 'SET_EXCHANGE_RATES', payload: exchangeRates });

export const setWallets = (wallets: WalletType[]): SetWalletsActionType => ({ type: 'SET_WALLETS', payload: wallets });

export const fetchExchangeRates = (): ThunkAction<Promise<void>, RootState, void, AnyAction> => async (
  dispatch: ThunkDispatch<RootState, void, AnyAction>,
): Promise<void> => new Promise<void>((resolve) => {
  fetch(`https://openexchangerates.org/api/latest.json?app_id=${process.env.API_KEY}`)
    .then((response) => {
      if (response.status !== 200) {
        throw new Error('Failed to fetch exchange rates');
      }
      return response.json();
    })
    .then((json) => dispatch(setExchangeRates(json)))
    .finally(resolve);
});

export const doExchange = (
  fromCurrency: string,
  toCurrency: string,
  direction: 'buy' | 'sell',
  fromAmount: number | null,
  toAmount: number | null,
): ThunkAction<Promise<void>, RootState, void, AnyAction> => async (
  dispatch: ThunkDispatch<RootState, void, AnyAction>,
  getState: () => RootState,
): Promise<void> => new Promise<void>((resolve) => {
  // API call for exchange should be called here
  // Saving new values in store as a mock implementation

  const newState: WalletType[] = [];
  getState().wallets.forEach((wallet) => {
    if (wallet.name === fromCurrency) {
      let newBalance;
      if (direction === 'buy') {
        newBalance = wallet.balance + (fromAmount || 0);
      } else {
        newBalance = wallet.balance - (fromAmount || 0);
      }
      newState.push({
        ...wallet,
        balance: newBalance,
      });
    } else if (wallet.name === toCurrency) {
      let newBalance;
      if (direction === 'buy') {
        newBalance = wallet.balance - (toAmount || 0);
      } else {
        newBalance = wallet.balance + (toAmount || 0);
      }
      newState.push({
        ...wallet,
        balance: newBalance,
      });
    } else {
      newState.push(wallet);
    }
  });
  dispatch(setWallets(newState));
  resolve();
});
