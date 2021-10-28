import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import '@testing-library/jest-dom';
import { fireEvent, render, screen, within } from '@testing-library/react';
import ExchangeItem from './ExchangeItem';
import { WalletType } from '../../types';
import * as reduxHooks from '../../hooks/reduxHooks';

describe('ExchangeItem', () => {

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
    const wallet: WalletType = {
      name: "EUR",
      balance: 10,
      longName: "Euros",
      symbol: "€"
    }
    const tree = renderer
      .create(<ExchangeItem deduct wallet={wallet} handleWalletChange={() => { }} amount={0} handleAmountChange={() => { }} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('displays amount', () => {
    const wallet: WalletType = {
      name: "EUR",
      balance: 10,
      longName: "Euros",
      symbol: "€"
    }
    render(<ExchangeItem wallet={wallet} handleWalletChange={() => { }} amount={10} handleAmountChange={() => { }} />);
    const amountField = screen.getByTestId("amount");
    expect(amountField).toHaveDisplayValue('10');
  })

  it('calls handleAmountChange when amount is changed', () => {
    const wallet: WalletType = {
      name: "EUR",
      balance: 10,
      longName: "Euros",
      symbol: "€"
    }
    const handleAmountChangeMock = jest.fn();
    render(<ExchangeItem wallet={wallet} handleWalletChange={() => { }} amount={10} handleAmountChange={handleAmountChangeMock} />);
    fireEvent.change(screen.getByTestId('amount'), {target: {value: '20'}});
    expect(handleAmountChangeMock).toBeCalledWith(20);
  })

  it('displays modal when clicking on account picker', () => {
    const wallet: WalletType = {
      name: "EUR",
      balance: 10,
      longName: "Euros",
      symbol: "€"
    }
    render(<ExchangeItem wallet={wallet} handleWalletChange={() => { }} amount={0} handleAmountChange={() => { }} />);
    fireEvent.click(screen.getByText('EUR'));
    const modal = screen.getByTestId('modal');
    expect(modal).toBeDefined();
  })

  it('calls handleWalletChange when wallet is selected', () => {
    const wallet: WalletType = {
      name: "EUR",
      balance: 10,
      longName: "Euros",
      symbol: "€"
    }
    const handleWalletChangeMock = jest.fn();
    render(<ExchangeItem wallet={wallet} handleWalletChange={handleWalletChangeMock} amount={0} handleAmountChange={() => { }} />);
    fireEvent.click(screen.getByText('EUR'));
    const modal = screen.getByTestId('modal');
    fireEvent.click(within(modal).getByText('USD'));
    expect(handleWalletChangeMock).toBeCalledWith('USD');
  })

  it('can close modals', () => {
    const wallet: WalletType = {
      name: "EUR",
      balance: 10,
      longName: "Euros",
      symbol: "€"
    }
    render(<ExchangeItem wallet={wallet} handleWalletChange={() => { }} amount={0} handleAmountChange={() => { }} />);
    fireEvent.click(screen.getByText('EUR'));
    const modal = screen.getByTestId('modal');
    fireEvent.click(within(modal).getByText(/x/i));
    expect(screen.queryByTestId('modal')).toBeNull();
  })

  it('shows error when deducting and amount is larger than available balance', () => {
    const wallet: WalletType = {
      name: "EUR",
      balance: 10,
      longName: "Euros",
      symbol: "€"
    }
    render(<ExchangeItem deduct wallet={wallet} handleWalletChange={() => { }} amount={11} handleAmountChange={() => { }} />);
    expect(screen.getByText('Exceeds balance')).not.toBeNull();
  })

  it('does not show error when not deducting and amount is larger than available balance', () => {
    const wallet: WalletType = {
      name: "EUR",
      balance: 10,
      longName: "Euros",
      symbol: "€"
    }
    render(<ExchangeItem wallet={wallet} handleWalletChange={() => { }} amount={11} handleAmountChange={() => { }} />);
    expect(screen.queryByText('Exceeds balance')).toBeNull();
  })
})