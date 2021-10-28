import React, { useEffect, useState } from 'react';
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
    if (valueFromInput === '' || Number.isNaN(valueAsNumber)) {
      handleAmountChange(null);
    }

    const adjustedValue = Number(`${Math.floor(Number(`${valueAsNumber}e2`))}e-2`);

    handleAmountChange(adjustedValue);
  };

  return (
    <Input
      type="number"
      value={displayValue}
      step="0.01"
      onChange={handleOnChange}
      placeholder="0"
    />
  );
};

export default AmountField;
