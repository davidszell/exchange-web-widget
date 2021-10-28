import { useEffect, useMemo, useState } from 'react';
import { doExchange, fetchExchangeRates } from '../../actions';
import { useAppDispatch, useAppSelector } from '../../reduxHooks';
import { ExchangeRatesType, WalletType } from '../../types';

export type ExchangeDirectionType = 'buy' | 'sell';

const useExchange = () => {
  const wallets: WalletType[] = useAppSelector((state) => state.wallets);
  const exchangeRates: ExchangeRatesType = useAppSelector((state) => state.exchangeRates);

  const [fromWallet, setFromWallet] = useState<WalletType>(wallets[0]);
  const [toWallet, setToWallet] = useState<WalletType>(wallets[1]);
  const [fromAmount, setFromAmount] = useState<number | null>(null);
  const [toAmount, setToAmount] = useState<number | null>(null);
  const [direction, setDirection] = useState<ExchangeDirectionType>('sell');
  const [disableExchange, setDisableExchange] = useState<boolean>(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchExchangeRates());

    const interval = setInterval(() => {
      dispatch(fetchExchangeRates());
    }, 10000);

    return () => clearInterval(interval);
  }, [dispatch]);

  useEffect(() => {
    setFromWallet((prevFromWallet) => wallets.find((wallet) => wallet.name === prevFromWallet.name) || wallets[0]);
    setToWallet((prevToWallet) => wallets.find((wallet) => wallet.name === prevToWallet.name) || wallets[1]);
  }, [wallets]);

  useEffect(() => {
    setDisableExchange(toAmount === null
      || fromAmount === null
      || fromAmount === 0
      || toAmount === 0
      || (direction === 'sell' && fromAmount > fromWallet.balance)
      || (direction === 'buy' && toAmount > toWallet.balance));
  }, [direction, fromAmount, fromWallet.balance, toAmount, toWallet.balance]);

  const roundRates = (value: number) => Number(`${Math.round(Number(`${value}e2`))}e-2`);

  const exchangeRate: number = useMemo(() => {
    if (fromWallet.name === exchangeRates.base) {
      return exchangeRates.rates[toWallet.name];
    }
    const fromRate = exchangeRates.rates[fromWallet.name];
    const toRate = exchangeRates.rates[toWallet.name];

    return toRate / fromRate;
  }, [fromWallet, toWallet, exchangeRates]);

  const handleFromWalletChange = (walletName: string) => {
    if (fromWallet.name === walletName) {
      return;
    }

    const newCurrency = wallets.find((item) => item.name === walletName);

    if (!newCurrency) {
      return;
    }

    if (toWallet.name === walletName) {
      setToWallet(fromWallet);
    }

    setFromWallet(newCurrency);
    setFromAmount(0);
    setToAmount(0);
  };

  const handleToWalletChange = (walletName: string) => {
    if (toWallet.name === walletName) {
      return;
    }

    const newCurrency = wallets.find((item) => item.name === walletName);

    if (!newCurrency) {
      return;
    }

    if (fromWallet.name === walletName) {
      setFromWallet(toWallet);
    }

    setToWallet(newCurrency);
    setFromAmount(0);
    setToAmount(0);
  };

  const handleFromAmountChange = (newAmount: number | null) => {
    if (newAmount !== null && newAmount > 0) {
      setFromAmount(newAmount);
      setToAmount(roundRates(newAmount * exchangeRate));
    } else {
      setToAmount(null);
      setFromAmount(null);
    }
  };

  const handleToAmountChange = (newAmount: number) => {
    if (newAmount !== null && newAmount > 0) {
      setToAmount(newAmount);
      setFromAmount(roundRates(newAmount / exchangeRate));
    } else {
      setToAmount(null);
      setFromAmount(null);
    }
  };

  const toggleDirection = () => {
    setDirection((prevDirection) => (prevDirection === 'sell' ? 'buy' : 'sell'));
  };

  const handleExchange = () => {
    dispatch(doExchange(fromWallet.name, toWallet.name, direction, fromAmount, toAmount));
    setFromAmount(0);
    setToAmount(0);
  };

  return {
    fromWallet,
    toWallet,
    fromAmount,
    toAmount,
    exchangeRate,
    direction,
    disableExchange,
    handleFromWalletChange,
    handleToWalletChange,
    handleFromAmountChange,
    handleToAmountChange,
    handleExchange,
    toggleDirection,
  };
};

export default useExchange;
