import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import Exchange from './Exchange';

describe('Exchange', () => {
    it('matches snapshot', () => {
        const tree = renderer
            .create(<Exchange />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    })
})