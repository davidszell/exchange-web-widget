import { AnyAction } from 'redux';
import { ExchangeRatesType } from '../types';

const initialState: ExchangeRatesType = {
  base: '',
  rates: {},
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
