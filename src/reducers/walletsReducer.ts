import { AnyAction } from "redux";

export type WalletType = {
    name: string,
    balance: number,
    longName: string,
    symbol: string
}

type WalletsState = WalletType[]

const initialState: WalletsState = [
    {
        name: "EUR",
        balance: 10,
        longName: "Euro",
        symbol: "€"
    },
    {
        name: "GBP",
        balance: 20,
        longName: "British Pounds",
        symbol: "£"
    },
    {
        name: "USD",
        balance: 30,
        longName: "US Dollars",
        symbol: "$"
    }
]

const walletsReducer = (state = initialState, action: AnyAction) => {
        return state;
}

export default walletsReducer;