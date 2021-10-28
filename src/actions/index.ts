import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import axios from 'axios';
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
  axios.get(`https://openexchangerates.org/api/latest.json?app_id=${process.env.API_KEY}`)
    .then((response) => {
      if (response.status === 200) {
        dispatch(setExchangeRates(response.data));
      }
    })
    .finally(resolve);
});

export const doExchange = (
  fromCurrency: string,
  toCurrency: string,
  exchangeAction: 'buy' | 'sell',
  sourceAmount: number | null,
  destinationAmount: number | null,
): ThunkAction<Promise<void>, RootState, void, AnyAction> => async (
  dispatch: ThunkDispatch<RootState, void, AnyAction>,
  getState: () => RootState,
): Promise<void> => new Promise<void>((resolve) => {
  // A BE call should be here validating and updating the wallets based on the request
  // Mocking server response

  const newState: WalletType[] = [];
  getState().wallets.forEach((wallet) => {
    if (wallet.name === fromCurrency) {
      let newBalance;
      if (exchangeAction === 'buy') {
        newBalance = wallet.balance + (sourceAmount || 0);
      } else {
        newBalance = wallet.balance - (sourceAmount || 0);
      }

      newState.push({
        ...wallet,
        balance: newBalance,
      });
    } else if (wallet.name === toCurrency) {
      let newBalance;
      if (exchangeAction === 'buy') {
        newBalance = wallet.balance - (destinationAmount || 0);
      } else {
        newBalance = wallet.balance + (destinationAmount || 0);
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
