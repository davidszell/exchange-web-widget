import { act, renderHook } from '@testing-library/react-hooks';
import useExchange, { WalletType } from './useExchange';

describe('useExchange', () => {
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
        const newWallet: WalletType = {
            name: "GBP",
            balance: 20,
            longName: "British Pounds",
            symbol: "£"
        }
        const { result } = renderHook(useExchange)
        act(() => {
            result.current.handleFromWalletChange(newWallet.name)
        })
        expect(result.current.fromWallet).toEqual(newWallet)
    })

    it("updates the toWallet", () => {
        const newWallet: WalletType = {
            name: "GBP",
            balance: 20,
            longName: "British Pounds",
            symbol: "£"
        }
        const { result } = renderHook(useExchange)
        act(() => {
            result.current.handleToWalletChange(newWallet.name)
        })
        expect(result.current.toWallet).toEqual(newWallet)
    })

    it("updates swaps fromWallet with toWallet when updating fromWallet to toWallet", () => {
        const { result } = renderHook(useExchange)

        const initialFromWallet = result.current.fromWallet
        const initialToWallet = result.current.toWallet
        act(() => {
            result.current.handleFromWalletChange(initialToWallet.name)
        })
        expect(result.current.toWallet).toEqual(initialFromWallet)
    })

    it("updates swaps fromWallet with toWallet when updating toWallet to fromWallet", () => {
        const { result } = renderHook(useExchange)

        const initialFromWallet = result.current.fromWallet
        const initialToWallet = result.current.toWallet
        act(() => {
            result.current.handleToWalletChange(initialFromWallet.name)
        })
        expect(result.current.fromWallet).toEqual(initialToWallet)
    })

    it("clears fromAmount when updating fromWallet", () => {
        const { result } = renderHook(useExchange)

        act(() => {
            result.current.handleFromAmountChange(10)
        })
        act(() => {
            result.current.handleFromWalletChange("GBP")
        })
        expect(result.current.fromAmount).toEqual(0)
    })

    it("clears fromAmount when updating toWallet", () => {
        const { result } = renderHook(useExchange)

        act(() => {
            result.current.handleFromAmountChange(10)
        })
        act(() => {
            result.current.handleToWalletChange("GBP")
        })
        expect(result.current.fromAmount).toEqual(0)
    })

    it("clears toAmount when updating fromWallet", () => {
        const { result } = renderHook(useExchange)

        act(() => {
            result.current.handleToAmountChange(10)
        })
        act(() => {
            result.current.handleFromWalletChange("GBP")
        })
        expect(result.current.toAmount).toEqual(0)
    })

    it("clears toAmount when updating toWallet", () => {
        const { result } = renderHook(useExchange)

        act(() => {
            result.current.handleToAmountChange(10)
        })
        act(() => {
            result.current.handleToWalletChange("GBP")
        })
        expect(result.current.toAmount).toEqual(0)
    })
});