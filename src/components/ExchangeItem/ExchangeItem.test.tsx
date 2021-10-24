import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import ExchangeItem from './ExchangeItem';

describe('ExchangeItem', () => {
    it('matches snapshot', () => {
        const tree = renderer
            .create(<ExchangeItem currency="EUR" balance={10} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    })
})