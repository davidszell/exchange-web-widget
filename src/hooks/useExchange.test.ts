import { act, renderHook } from '@testing-library/react-hooks';
import useExchange from './useExchange';
import * as reduxHooks from './reduxHooks';

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

  it("returns null as default source amount", () => {
    const { result } = renderHook(useExchange)
    expect(result.current.sourceAmount).toBeNull()
  });

  it("returns null as default destination amount", () => {
    const { result } = renderHook(useExchange)
    expect(result.current.destinationAmount).toBeNull()
  });

  it("returns 'sell' as default exchange action", () => {
    const { result } = renderHook(useExchange)
    expect(result.current.exchangeAction).toBe('sell')
  });

  it("returns first wallet as default source wallet", () => {
    const { result } = renderHook(useExchange)
    expect(result.current.sourceWallet).toEqual(mockStore.wallets[0]);
  })

  it("returns second wallet elements as default destination wallet", () => {
    const { result } = renderHook(useExchange)
    expect(result.current.destinationWallet).toEqual(mockStore.wallets[1]);
  })

  it("updates the source amount", () => {
    const { result } = renderHook(useExchange)
    act(() => {
      result.current.handleSourceAmountChange(10)
    })
    expect(result.current.sourceAmount).toBe(10)
  })

  it("updates the destination amount", () => {
    const { result } = renderHook(useExchange)
    act(() => {
      result.current.handleDestinationAmountChange(10)
    })
    expect(result.current.destinationAmount).toBe(10)
  })

  it("doesn't allow negative source amount", () => {
    const { result } = renderHook(useExchange)
    act(() => {
      result.current.handleSourceAmountChange(-1)
    })
    expect(result.current.sourceAmount).toBeNull()
  })

  it("doesn't allow negative destination amount", () => {
    const { result } = renderHook(useExchange)
    act(() => {
      result.current.handleDestinationAmountChange(-1)
    })
    expect(result.current.destinationAmount).toBeNull()
  })

  it("updates the exchange action", () => {
    const { result } = renderHook(useExchange)
    act(() => {
      result.current.toggleExchangeAction()
    })
    expect(result.current.exchangeAction).toBe('buy')
  })

  it("updates the source wallet", () => {
    const { result } = renderHook(useExchange)
    act(() => {
      result.current.handleSourceWalletChange(mockStore.wallets[2].name)
    })
    expect(result.current.sourceWallet).toEqual(mockStore.wallets[2])
  })

  it("updates the destination wallet", () => {
    const { result } = renderHook(useExchange)
    act(() => {
      result.current.handleDestinationWalletChange(mockStore.wallets[2].name)
    })
    expect(result.current.destinationWallet).toEqual(mockStore.wallets[2])
  })

  it("doesn't update wallet when selecting same source wallet", () => {
    const { result } = renderHook(useExchange)
    act(() => {
      result.current.handleSourceAmountChange(10)
    })
    act(() => {
      result.current.handleSourceWalletChange(result.current.sourceWallet.name)
    })
    expect(result.current.sourceAmount).toEqual(10)
  })

  it("doesn't update wallet when selecting same destination wallet", () => {
    const { result } = renderHook(useExchange)
    act(() => {
      result.current.handleDestinationAmountChange(10)
    })
    act(() => {
      result.current.handleDestinationWalletChange(result.current.destinationWallet.name)
    })
    expect(result.current.destinationAmount).toEqual(10)
  })

  it("doesn't update wallet when selecting unknown source wallet", () => {
    const { result } = renderHook(useExchange)
    act(() => {
      result.current.handleSourceWalletChange("foo")
    })
    expect(result.current.sourceWallet).toEqual(mockStore.wallets[0])
  })

  it("doesn't update wallet when selecting unknown destination wallet", () => {
    const { result } = renderHook(useExchange)
    act(() => {
      result.current.handleDestinationWalletChange("foo")
    })
    expect(result.current.destinationWallet).toEqual(mockStore.wallets[1])
  })

  it("swaps source wallet with destination wallet when updating source wallet to destination wallet", () => {
    const { result } = renderHook(useExchange)
    act(() => {
      result.current.handleSourceWalletChange(mockStore.wallets[1].name)
    })
    expect(result.current.destinationWallet).toEqual(mockStore.wallets[0])
  })

  it("updates swaps source wallet with destination wallet when updating destination wallet to source wallet", () => {
    const { result } = renderHook(useExchange)
    act(() => {
      result.current.handleDestinationWalletChange(mockStore.wallets[0].name)
    })
    expect(result.current.sourceWallet).toEqual(mockStore.wallets[1])
  })

  it("clears source amount when updating source wallet", () => {
    const { result } = renderHook(useExchange)

    act(() => {
      result.current.handleSourceAmountChange(10)
    })
    act(() => {
      result.current.handleSourceWalletChange(mockStore.wallets[2].name)
    })
    expect(result.current.sourceAmount).toEqual(null)
  })

  it("clears source amount when updating destination wallet", () => {
    const { result } = renderHook(useExchange)

    act(() => {
      result.current.handleSourceAmountChange(10)
    })
    act(() => {
      result.current.handleDestinationWalletChange(mockStore.wallets[2].name)
    })
    expect(result.current.sourceAmount).toEqual(null)
  })

  it("clears destination amount when updating source wallet", () => {
    const { result } = renderHook(useExchange)

    act(() => {
      result.current.handleDestinationAmountChange(10)
    })
    act(() => {
      result.current.handleSourceWalletChange(mockStore.wallets[2].name)
    })
    expect(result.current.destinationAmount).toEqual(null);
  })

  it("clears destination amount when updating destination wallet", () => {
    const { result } = renderHook(useExchange)

    act(() => {
      result.current.handleDestinationAmountChange(10)
    })
    act(() => {
      result.current.handleDestinationWalletChange(mockStore.wallets[2].name)
    })
    expect(result.current.destinationAmount).toEqual(null)
  })

  it("destination amount is calculated from exchangeRates when changing source wallet", () => {
    const { result } = renderHook(useExchange)

    act(() => {
      result.current.handleSourceAmountChange(10)
    })
    expect(result.current.destinationAmount).toBeCloseTo(8.5)
  })

  it("source wallet is calculated from exchangeRates when changing destination amount", () => {
    const { result } = renderHook(useExchange)

    act(() => {
      result.current.handleDestinationAmountChange(10)
    })
    expect(result.current.sourceAmount).toBeCloseTo(11.76)
  })

  it("exchangeRate is set to null when exchangeRates has no rates", () => {
    const emptyExchangeRateMock = {
      ...mockStore,
      exchangeRates: {
        ...mockStore.exchangeRates,
        rates: {}
      }
    }
    useSelectorMock.mockImplementation(selector => selector(emptyExchangeRateMock));

    const { result } = renderHook(useExchange)
    expect(result.current.exchangeRate).toBeNull();
  })

  it("exchangeRate is set to null when source currency is not in exchangeRates", () => {
    const emptyExchangeRateMock = {
      ...mockStore,
      exchangeRates: {
        ...mockStore.exchangeRates,
        base: "USD",
        rates: {
          USD: 1,
          GBP: 2
        }
      }
    }
    useSelectorMock.mockImplementation(selector => selector(emptyExchangeRateMock));

    const { result } = renderHook(useExchange)
    expect(result.current.exchangeRate).toBeNull();
  })

  it("exchangeRate is set to null when destination currency is not in exchangeRates", () => {
    const emptyExchangeRateMock = {
      ...mockStore,
      exchangeRates: {
        ...mockStore.exchangeRates,
        base: "USD",
        rates: {
          USD: 1,
          EUR: 2
        }
      }
    }
    useSelectorMock.mockImplementation(selector => selector(emptyExchangeRateMock));

    const { result } = renderHook(useExchange)
    expect(result.current.exchangeRate).toBeNull();
  })

  it("exchangeRate is calculated correctly when source currency matches base currency", () => {
    useSelectorMock.mockImplementation(selector => selector(mockStore));

    const { result } = renderHook(useExchange)
    expect(result.current.exchangeRate).toBeCloseTo(0.85);
  })

  it("exchangeRate is calculated correctly when source currency doesn't match base currency", () => {
    const emptyExchangeRateMock = {
      ...mockStore,
      exchangeRates: {
        ...mockStore.exchangeRates,
        base: "USD",
        rates: {
          USD: 1,
          EUR: 2,
          GBP: 1.7
        }
      }
    }
    useSelectorMock.mockImplementation(selector => selector(emptyExchangeRateMock));

    const { result } = renderHook(useExchange)
    expect(result.current.exchangeRate).toBeCloseTo(0.85);
  })

  it("doesn't dispatch exchange when it is disabled", () => {
    const { result } = renderHook(useExchange);

    act(() => {
      result.current.handleSourceAmountChange(0);
    })
    const callNum = useDispatchMock.mock.calls.length;
    act(() => {
      result.current.handleExchange();
    })
    expect(useDispatchMock).toBeCalledTimes(callNum);
  })

  it("it dispatches exchange when it is not disabled", () => {
    const { result } = renderHook(useExchange);

    act(() => {
      result.current.handleSourceAmountChange(1);
    })
    const callNum = useDispatchMock.mock.calls.length;
    act(() => {
      result.current.handleExchange();
    })
    expect(useDispatchMock).not.toBeCalledTimes(callNum);
  })
});