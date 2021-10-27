import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import ExchangeItem from './ExchangeItem';
import { WalletType } from '../../types';

describe('ExchangeItem', () => {
    it('matches snapshot', () => {
        const wallet: WalletType = {
            name: "EUR",
            balance: 10,
            longName: "Euros",
            symbol: "€"
        }
        const tree = renderer
            .create(<ExchangeItem wallet={wallet} handleWalletChange={() => {}} amount={0} handleAmountChange={() => {}} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    })
})