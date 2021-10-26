import { act, renderHook } from '@testing-library/react-hooks';
import useExchange from './useExchange';
import * as reduxHooks from '../../reduxHooks';

describe('useExchange', () => {
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

    it("returns 0 as default fromAmount", () => {
        const { result } = renderHook(useExchange)
        expect(result.current.fromAmount).toBe(0)
    });

    it("returns 0 as default toAmount", () => {
        const { result } = renderHook(useExchange)
        expect(result.current.toAmount).toBe(0)
    });

    it("returns 'sell' as default exchange direction", () => {
        const { result } = renderHook(useExchange)
        expect(result.current.direction).toBe('sell')
    });

    it("returns first wallet elements as default fromAmount", () => {
        const { result } = renderHook(useExchange)
        expect(result.current.fromWallet).toEqual(mockStore.wallets[0]);
    })

    it("returns second wallet elements as default toAmount", () => {
        const { result } = renderHook(useExchange)
        expect(result.current.toWallet).toEqual(mockStore.wallets[1]);
    })

    it("updates the fromAmount", () => {
        const { result } = renderHook(useExchange)
        act(() => {
            result.current.handleFromAmountChange(10)
        })
        expect(result.current.fromAmount).toBe(10)
    })

    it("updates the toAmount", () => {
        const { result } = renderHook(useExchange)
        act(() => {
            result.current.handleToAmountChange(10)
        })
        expect(result.current.toAmount).toBe(10)
    })

    it("doesn't allow negative fromAmount", () => {
        const { result } = renderHook(useExchange)
        act(() => {
            result.current.handleFromAmountChange(-1)
        })
        expect(result.current.fromAmount).toBe(0)
    })

    it("doesn't allow negative toAmount", () => {
        const { result } = renderHook(useExchange)
        act(() => {
            result.current.handleToAmountChange(-1)
        })
        expect(result.current.toAmount).toBe(0)
    })

    it("updates the direction", () => {
        const { result } = renderHook(useExchange)
        act(() => {
            result.current.toggleDirection()
        })
        expect(result.current.direction).toBe('buy')
    })

    it("updates the fromWallet", () => {
        const { result } = renderHook(useExchange)
        act(() => {
            result.current.handleFromWalletChange(mockStore.wallets[2].name)
        })
        expect(result.current.fromWallet).toEqual(mockStore.wallets[2])
    })

    it("updates the toWallet", () => {
        const { result } = renderHook(useExchange)
        act(() => {
            result.current.handleToWalletChange(mockStore.wallets[2].name)
        })
        expect(result.current.toWallet).toEqual(mockStore.wallets[2])
    })

    it("updates swaps fromWallet with toWallet when updating fromWallet to toWallet", () => {
        const { result } = renderHook(useExchange)
        act(() => {
            result.current.handleFromWalletChange(mockStore.wallets[1].name)
        })
        expect(result.current.toWallet).toEqual(mockStore.wallets[0])
    })

    it("updates swaps fromWallet with toWallet when updating toWallet to fromWallet", () => {
        const { result } = renderHook(useExchange)
        act(() => {
            result.current.handleToWalletChange(mockStore.wallets[0].name)
        })
        expect(result.current.fromWallet).toEqual(mockStore.wallets[1])
    })

    it("clears fromAmount when updating fromWallet", () => {
        const { result } = renderHook(useExchange)

        act(() => {
            result.current.handleFromAmountChange(10)
        })
        act(() => {
            result.current.handleFromWalletChange(mockStore.wallets[2].name)
        })
        expect(result.current.fromAmount).toEqual(0)
    })

    it("clears fromAmount when updating toWallet", () => {
        const { result } = renderHook(useExchange)

        act(() => {
            result.current.handleFromAmountChange(10)
        })
        act(() => {
            result.current.handleToWalletChange(mockStore.wallets[2].name)
        })
        expect(result.current.fromAmount).toEqual(0)
    })

    it("clears toAmount when updating fromWallet", () => {
        const { result } = renderHook(useExchange)

        act(() => {
            result.current.handleToAmountChange(10)
        })
        act(() => {
            result.current.handleFromWalletChange(mockStore.wallets[2].name)
        })
        expect(result.current.toAmount).toEqual(0)
    })

    it("clears toAmount when updating toWallet", () => {
        const { result } = renderHook(useExchange)

        act(() => {
            result.current.handleToAmountChange(10)
        })
        act(() => {
            result.current.handleToWalletChange(mockStore.wallets[2].name)
        })
        expect(result.current.toAmount).toEqual(0)
    })

    it("toAmount is calculated from exchangeRates when changing fromAmount", () => {
        const { result } = renderHook(useExchange)

        act(() => {
            result.current.handleFromAmountChange(10)
        })
        expect(result.current.toAmount).toBeCloseTo(8.5)
    })

    it("fromAmount is calculated from exchangeRates when changing toAmount", () => {
        const { result } = renderHook(useExchange)

        act(() => {
            result.current.handleToAmountChange(10)
        })
        expect(result.current.fromAmount).toBeCloseTo(11.76)
    })

    it("updates toAmount correctly when trying to set fromAmount to a negative number", () => {
        const { result } = renderHook(useExchange)

        act(() => {
            result.current.handleFromAmountChange(-1)
        })
        expect(result.current.toAmount).toBe(0)
    })

    it("updates fromAmount correctly when trying to set toAmount to a negative number", () => {
        const { result } = renderHook(useExchange)

        act(() => {
            result.current.handleToAmountChange(-1)
        })
        expect(result.current.fromAmount).toBe(0)
    })
});