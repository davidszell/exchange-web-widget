import { useEffect, useState } from 'react';
import { doExchange, fetchExchangeRates } from '../actions';
import { useAppDispatch, useAppSelector } from './reduxHooks';
import { ExchangeRatesType, WalletType } from '../types';
import { formatFloatRound } from '../helpers';

export type ExchangeActionType = 'buy' | 'sell';

const useExchange = () => {
  const wallets: WalletType[] = useAppSelector((state) => state.wallets);
  const exchangeRates: ExchangeRatesType = useAppSelector((state) => state.exchangeRates);

  const [sourceWallet, setSourceWallet] = useState<WalletType>(wallets[0]);
  const [destinationWallet, setDestinationWallet] = useState<WalletType>(wallets[1]);
  const [sourceAmount, setSourceAmount] = useState<number | null>(null);
  const [destinationAmount, setDestinationAmount] = useState<number | null>(null);
  const [exchangeAction, setExchangeAction] = useState<ExchangeActionType>('sell');
  const [isExchangeDisabled, setExchangeDisabled] = useState<boolean>(true);
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchExchangeRates());

    const interval = setInterval(() => {
      dispatch(fetchExchangeRates());
    }, 10000);

    return () => clearInterval(interval);
  }, [dispatch]);

  useEffect(() => {
    setSourceWallet((prevWallet) => wallets.find((wallet) => wallet.name === prevWallet.name) || wallets[0]);
    setDestinationWallet((prevWallet) => wallets.find((wallet) => wallet.name === prevWallet.name) || wallets[1]);
  }, [wallets]);

  useEffect(() => {
    setExchangeDisabled(
      sourceAmount === null
      || destinationAmount === null
      || (exchangeAction === 'sell' && sourceAmount > sourceWallet.balance)
      || (exchangeAction === 'buy' && destinationAmount > destinationWallet.balance),
    );
  }, [exchangeAction, sourceAmount, sourceWallet.balance, destinationAmount, destinationWallet.balance]);

  useEffect(() => {
    if (Object.keys(exchangeRates.rates).length === 0) {
      setExchangeRate(null);
      return;
    }

    const sourceRate = exchangeRates.rates[sourceWallet.name];
    const destinationRate = exchangeRates.rates[destinationWallet.name];

    if (sourceRate == null || destinationRate == null) {
      setExchangeRate(null);
      return;
    }

    if (sourceWallet.name === exchangeRates.base) {
      setExchangeRate(exchangeRates.rates[destinationWallet.name]);
    } else {
      setExchangeRate(destinationRate / sourceRate);
    }
  }, [sourceWallet, destinationWallet, exchangeRates]);

  const clearAmounts = () => {
    setSourceAmount(null);
    setDestinationAmount(null);
  };

  const handleSourceWalletChange = (walletName: string) => {
    if (sourceWallet.name === walletName) {
      return;
    }

    const newWallet = wallets.find((item) => item.name === walletName);

    if (!newWallet) {
      return;
    }

    if (destinationWallet.name === walletName) {
      setDestinationWallet(sourceWallet);
    }

    setSourceWallet(newWallet);
    clearAmounts();
  };

  const handleDestinationWalletChange = (walletName: string) => {
    if (destinationWallet.name === walletName) {
      return;
    }

    const newWallet = wallets.find((item) => item.name === walletName);

    if (!newWallet) {
      return;
    }

    if (sourceWallet.name === walletName) {
      setSourceWallet(destinationWallet);
    }

    setDestinationWallet(newWallet);
    clearAmounts();
  };

  const handleSourceAmountChange = (newAmount: number | null) => {
    if (exchangeRate !== null && newAmount !== null && newAmount > 0) {
      setSourceAmount(newAmount);
      setDestinationAmount(formatFloatRound(newAmount * exchangeRate));
    } else {
      clearAmounts();
    }
  };

  const handleDestinationAmountChange = (newAmount: number | null) => {
    if (exchangeRate !== null && newAmount !== null && newAmount > 0) {
      setDestinationAmount(newAmount);
      setSourceAmount(formatFloatRound(newAmount / exchangeRate));
    } else {
      clearAmounts();
    }
  };

  const toggleExchangeAction = () => {
    setExchangeAction((prevExchangeAction) => (prevExchangeAction === 'sell' ? 'buy' : 'sell'));
  };

  const handleExchange = () => {
    if (!isExchangeDisabled) {
      dispatch(doExchange(sourceWallet.name, destinationWallet.name, exchangeAction, sourceAmount, destinationAmount));
      clearAmounts();
    }
  };

  return {
    exchangeAction,
    exchangeRate,
    isExchangeDisabled,
    sourceWallet,
    destinationWallet,
    sourceAmount,
    destinationAmount,
    handleExchange,
    handleSourceWalletChange,
    handleDestinationWalletChange,
    handleSourceAmountChange,
    handleDestinationAmountChange,
    toggleExchangeAction,
  };
};

export default useExchange;
