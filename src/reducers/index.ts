import { combineReducers } from "redux";
import exchangeRatesReducer from "./exchangeRatesReducer";
import walletsReducer from "./walletsReducer";

const rootReducer = combineReducers({
    wallets: walletsReducer,
    exchangeRates: exchangeRatesReducer
});

export default rootReducer;
