import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'jest-styled-components';
import Exchange from './Exchange';
import * as reduxHooks from '../../hooks/reduxHooks';
import * as useExchange from '../../hooks/useExchange';

jest.mock('../../hooks/useExchange', () => {
  const original = jest.requireActual('../../hooks/useExchange')
  return {
    __esModule: true,
    default: jest.fn(() => ({
      ...original.default(),
      exchangeRate: 0.85
    }))
  }
});

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
      .create(<Exchange />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Shows correct header', () => {
    render(<Exchange />);
    expect(screen.getByTestId('header')).toHaveTextContent(/^Sell [A-Z]{3}$/);
  });

  it('Shows correct header after exchange action change', () => {
    render(<Exchange />);
    fireEvent.click(screen.getByTestId('directionButton'));
    expect(screen.getByTestId('header')).toHaveTextContent(/^Buy [A-Z]{3}$/);
  });

  it('Shows correct button label', () => {
    render(<Exchange />);
    expect(screen.getByTestId('directionButton')).toHaveTextContent(/^ᐁ$/);
  });

  it('Shows correct button after exchange action change', () => {
    render(<Exchange />);
    fireEvent.click(screen.getByTestId('directionButton'));
    expect(screen.getByTestId('directionButton')).toHaveTextContent(/^ᐃ$/);
  });

  it('Shows correct exchange button label', () => {
    render(<Exchange />);
    expect(screen.getByTestId('exchangeButton')).toHaveTextContent(/^Sell [A-Z]{3} for [A-Z]{3}$/);
  });

  it('Shows correct exchange button label after exchange action change', () => {
    render(<Exchange />);
    fireEvent.click(screen.getByTestId('directionButton'));
    expect(screen.getByTestId('exchangeButton')).toHaveTextContent(/^Buy [A-Z]{3} with [A-Z]{3}$/);
  });

  it('Shows loading screen when echangeRate is null', () => {
    (useExchange.default as jest.Mock).mockImplementation(() => ({
      exchangeRate: null
    }))
    render(<Exchange />);
    expect(screen.queryByText('Loading...')).not.toBeNull();
  })
})