import React from 'react';
import renderer from 'react-test-renderer';
import {render, fireEvent, screen} from '@testing-library/react'
import '@testing-library/jest-dom';
import 'jest-styled-components';
import Exchange from './Exchange';

describe('Exchange', () => {
    it('matches snapshot', () => {
        const tree = renderer
            .create(<Exchange />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Shows correct header', () => {
        render(<Exchange />);
        expect(screen.getByTestId('header')).toHaveTextContent('Sell');
    });

    it('Shows correct header after direction change', () => {
        render(<Exchange />);
        fireEvent.click(screen.getByTestId('directionButton'));
        expect(screen.getByTestId('header')).toHaveTextContent('Buy');
    });

    it('Shows correct direction button label', () => {
        render(<Exchange />);
        expect(screen.getByTestId('directionButton')).toHaveTextContent('↓');
    });

    it('Shows correct direction button after direction change', () => {
        render(<Exchange />);
        fireEvent.click(screen.getByTestId('directionButton'));
        expect(screen.getByTestId('directionButton')).toHaveTextContent('↑');
    });

    it('Shows correct exchange button label', () => {
        render(<Exchange />);
        expect(screen.getByTestId('exchangeButton')).toHaveTextContent('Sell');
    });

    it('Shows correct exchange button label after direction change', () => {
        render(<Exchange />);
        fireEvent.click(screen.getByTestId('directionButton'));
        expect(screen.getByTestId('exchangeButton')).toHaveTextContent('Buy');
    });
})