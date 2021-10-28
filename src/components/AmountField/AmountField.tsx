import React, { useEffect, useState } from 'react';
import { formatFloatFloor } from '../../helpers';
import { Input } from './AmountField.styled';

type AmountFieldPropType = {
  amount: number | null,
  handleAmountChange: (newAmount: number | null) => void
};

const AmountField = ({ amount, handleAmountChange }: AmountFieldPropType): JSX.Element => {
  const [displayValue, setDisplayValue] = useState<number | ''>('');

  useEffect(() => {
    setDisplayValue(amount === null ? '' : amount);
  }, [amount]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { valueAsNumber, value: valueFromInput } = event.target;
    if (valueFromInput === '' || Number.isNaN(valueAsNumber) || valueAsNumber <= 0) {
      handleAmountChange(null);
      return;
    }

    handleAmountChange(formatFloatFloor(valueAsNumber));
  };

  return (
    <Input
      data-testid="amount"
      type="number"
      value={displayValue}
      step="0.01"
      onChange={handleOnChange}
      placeholder="0"
    />
  );
};

export default AmountField;
