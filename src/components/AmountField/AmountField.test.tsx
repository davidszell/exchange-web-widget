import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import '@testing-library/jest-dom';
import AmountField from './AmountField';
import { fireEvent, render, screen } from '@testing-library/react';

describe('AmountField', () => {
  it('matches snapshot', () => {
    const tree = renderer
      .create(<AmountField amount={10} handleAmountChange={() => { }} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('renders correctly when defualt amount is set to number', () => {
    render(<AmountField amount={10} handleAmountChange={() => { }} />);
    expect(screen.getByTestId('amount')).toHaveDisplayValue('10');
  })

  it('renders correctly when defualt amount is set to null', () => {
    render(<AmountField amount={null} handleAmountChange={() => { }} />);
    expect(screen.getByTestId('amount')).toHaveDisplayValue('');
  })

  it('calls handleAmountChange when amount changes', () => {
    const handleAmountMock = jest.fn();
    render(<AmountField amount={10} handleAmountChange={handleAmountMock} />);
    fireEvent.change(screen.getByTestId('amount'), {target: {value: '20'}});
    expect(handleAmountMock).toBeCalled();
  })

  it('calls handleAmountChange with correct value', () => {
    const handleAmountMock = jest.fn();
    render(<AmountField amount={10} handleAmountChange={handleAmountMock} />);
    fireEvent.change(screen.getByTestId('amount'), {target: {value: '20'}});
    expect(handleAmountMock).toBeCalledWith(20);
  })

  it('calls handleAmountChange with null on non-number', () => {
    const handleAmountMock = jest.fn();
    render(<AmountField amount={10} handleAmountChange={handleAmountMock} />);
    fireEvent.change(screen.getByTestId('amount'), {target: {value: 'foo'}});
    expect(handleAmountMock).toBeCalledWith(null);
  })

  it('calls handleAmountChange with null on 0', () => {
    const handleAmountMock = jest.fn();
    render(<AmountField amount={10} handleAmountChange={handleAmountMock} />);
    fireEvent.change(screen.getByTestId('amount'), {target: {value: '0'}});
    expect(handleAmountMock).toBeCalledWith(null);
  })

  it('calls handleAmountChange with null on negative number', () => {
    const handleAmountMock = jest.fn();
    render(<AmountField amount={10} handleAmountChange={handleAmountMock} />);
    fireEvent.change(screen.getByTestId('amount'), {target: {value: '-1'}});
    expect(handleAmountMock).toBeCalledWith(null);
  })

  it('calls handleAmountChange with correct float formatting', () => {
    const handleAmountMock = jest.fn();
    render(<AmountField amount={10} handleAmountChange={handleAmountMock} />);
    fireEvent.change(screen.getByTestId('amount'), {target: {value: '1.234'}});
    expect(handleAmountMock).toBeCalledWith(1.23);
  })
})