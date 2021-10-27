import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'jest-styled-components';
import Exchange from './Exchange';
import * as reduxHooks from '../../reduxHooks';

describe('Exchange', () => {
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
      .create(<Exchange />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Shows correct header', () => {
    render(<Exchange />);
    expect(screen.getByTestId('header')).toHaveTextContent(/^Sell [A-Z]{3}$/);
  });

  it('Shows correct header after direction change', () => {
    render(<Exchange />);
    fireEvent.click(screen.getByTestId('directionButton'));
    expect(screen.getByTestId('header')).toHaveTextContent(/^Buy [A-Z]{3}$/);
  });

  it('Shows correct direction button label', () => {
    render(<Exchange />);
    expect(screen.getByTestId('directionButton')).toHaveTextContent(/^↓$/);
  });

  it('Shows correct direction button after direction change', () => {
    render(<Exchange />);
    fireEvent.click(screen.getByTestId('directionButton'));
    expect(screen.getByTestId('directionButton')).toHaveTextContent(/^↑$/);
  });

  it('Shows correct exchange button label', () => {
    render(<Exchange />);
    expect(screen.getByTestId('exchangeButton')).toHaveTextContent(/^Sell [A-Z]{3} for [A-Z]{3}$/);
  });

  it('Shows correct exchange button label after direction change', () => {
    render(<Exchange />);
    fireEvent.click(screen.getByTestId('directionButton'));
    expect(screen.getByTestId('exchangeButton')).toHaveTextContent(/^Buy [A-Z]{3} with [A-Z]{3}$/);
  });
})