import { AnyAction } from 'redux';
import { WalletType } from '../types';

export const initialState: WalletType[] = [
  {
    name: 'EUR',
    balance: 10,
    longName: 'Euros',
    symbol: '€',
  },
  {
    name: 'GBP',
    balance: 20,
    longName: 'British Pounds',
    symbol: '£',
  },
  {
    name: 'USD',
    balance: 30,
    longName: 'US Dollars',
    symbol: '$',
  },
];

const walletsReducer = (state = initialState, action: AnyAction): WalletType[] => {
  switch (action.type) {
    case 'SET_WALLETS':
      return action.payload;
    default:
      return state;
  }
};

export default walletsReducer;
