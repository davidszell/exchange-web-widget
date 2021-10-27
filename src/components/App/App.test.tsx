import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components'
import App from './App';
import * as reduxHooks from '../../reduxHooks';

describe('App', () => {
    const useSelectorMock = jest.spyOn(reduxHooks, 'useAppSelector')
    const useDispatchMock = jest.spyOn(reduxHooks, 'useAppDispatch')

    beforeEach(() => {
        useSelectorMock.mockImplementation(selector => selector(mockStore));
        useDispatchMock.mockReturnValue(jest.fn())
    })
    afterEach(() => {
        useSelectorMock.mockClear()
        useDispatchMock.mockClear()
    })

    const mockStore = {
        wallets: [
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
            {
                name: "USD",
                balance: 30,
                longName: "US Dollars",
                symbol: "$"
            }
        ],
        exchangeRates: {
            base: "EUR",
            rates: {
                "EUR": 1,
                "GBP": 0.85,
                "USD": 1.16
            }
        }
    };
    it('matches snapshot', () => {
        const tree = renderer
            .create(<App />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    })
})