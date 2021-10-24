import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import ExchangeItem from './ExchangeItem';
import { WalletType } from '../Exchange/useExchange';

describe('ExchangeItem', () => {
    it('matches snapshot', () => {
        const currency: WalletType = {
            name: "EUR",
            balance: 10,
            longName: "Euro",
            symbol: "€"
        }
        const tree = renderer
            .create(<ExchangeItem currency={currency} handleCurrencyChange={() => {}} amount={0} handleAmountChange={() => {}} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    })
})