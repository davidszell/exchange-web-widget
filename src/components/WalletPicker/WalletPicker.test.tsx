import { fireEvent, render, screen, within } from '@testing-library/react';
import React from 'react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';
import 'jest-styled-components';
import WalletPicker from './WalletPicker';
import * as reduxHooks from '../../reduxHooks';

describe('WalletPicker', () => {
    const useSelectorMock = jest.spyOn(reduxHooks, 'useAppSelector')

    beforeEach(() => {
        useSelectorMock.mockImplementation(selector => selector(mockStore));
    })
    afterEach(() => {
        useSelectorMock.mockClear()
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
        exchangeRates: {}
    };

    it('matches snapshot', () => {
        const tree = renderer
            .create(<WalletPicker handleWalletChange={() => {}} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('renders a list', () => {
        render(<WalletPicker handleWalletChange={() => {}} />)
        const list = screen.getByRole('list')
        expect(list).toBeDefined()
    })

    it('lists all wallets from store', () => {
        render(<WalletPicker handleWalletChange={() => {}} />)
        const list = screen.getByRole('list')
        const items = within(list).getAllByRole('listitem')
        expect(items.length = 3)
    })

    it('renders wallet item name', async () => {
        render(<WalletPicker handleWalletChange={() => {}} />)
        const list = screen.getByRole('list')
        const items = within(list).getAllByRole('listitem')
        const name = within(items[0]).getByTestId('name')
        expect(name).toHaveTextContent(mockStore.wallets[0].name)
    })

    it('renders wallet item longname', () => {
        render(<WalletPicker handleWalletChange={() => {}} />)
        const list = screen.getByRole('list')
        const items = within(list).getAllByRole('listitem')
        const name = within(items[0]).getByTestId('longName')
        expect(name).toHaveTextContent(mockStore.wallets[0].longName)
    })

    it('renders wallet item balance', () => {
        const balanceText = `${mockStore.wallets[0].symbol} ${mockStore.wallets[0].balance}`
        render(<WalletPicker handleWalletChange={() => {}} />)
        const list = screen.getByRole('list')
        const items = within(list).getAllByRole('listitem')
        const name = within(items[0]).getByTestId('balance')
        expect(name).toHaveTextContent(balanceText)
    })

    it('calls handleWalletChange function when clicking on list item', () => {
        const handleWalletChangeMock = jest.fn()
        render(<WalletPicker handleWalletChange={handleWalletChangeMock} />)
        const list = screen.getByRole('list')
        const items = within(list).getAllByRole('listitem')
        fireEvent.click(items[0])
        expect(handleWalletChangeMock).toBeCalled()
    })

    it('calls handleWalletChange function with the wallet name', () => {
        const handleWalletChangeMock = jest.fn()
        render(<WalletPicker handleWalletChange={handleWalletChangeMock} />)
        const list = screen.getByRole('list')
        const items = within(list).getAllByRole('listitem')
        fireEvent.click(items[0])
        expect(handleWalletChangeMock).toBeCalledWith(mockStore.wallets[0].name)
    })
})