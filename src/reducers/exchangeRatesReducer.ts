import { AnyAction } from 'redux';
import { ExchangeRatesType } from '../types';

const initialState: ExchangeRatesType = {
  base: 'EUR',
  rates: {
    EUR: 1,
    GBP: 0.85,
    USD: 1.16,
  },
};

const exchangeRatesReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case 'SET_EXCHANGE_RATES':
      return action.payload;
    default:
      return state;
  }
};

export default exchangeRatesReducer;
