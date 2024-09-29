import { useEffect, useState } from 'react';
import User from '../Icons/User';
import Dollar from '../Icons/Dollar';
import ResetButton from '../ResetButton';
import DisplayAmount from '../DisplayAmount';
import InputWithLabelAndIcon from '../InputWithLabelAndIcon';
import Label from '../Label';
import Input from '../Input';
import TipButton from '../TipButton';

const TipCalculator = () => {
  const [bill, setBill] = useState<number>(0);
  const [people, setPeople] = useState<number>(0);
  const [tipPercentage, setTipPercentage] = useState<number | null>(null);
  const [customTip, setCustomTip] = useState<number | null>(null);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    if (bill > 0 && people > 0 && (tipPercentage !== null || customTip !== null)) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [bill, people, tipPercentage, customTip]);

  const handleBillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBill(parseFloat(e.target.value) || 0);
  };

  const handlePeopleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (value === 0) {
      setErrorMessage("Can't be zero");
    } else {
      setErrorMessage('');
      setPeople(value);
    }
  };

  const handleTipSelection = (percentage: number) => {
    setTipPercentage(percentage);
    setCustomTip(null);
  };

  const handleCustomTipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setCustomTip(value || null);
    setTipPercentage(null);
  };

  const calculateTipAmount = () => {
    const tip = tipPercentage !== null ? tipPercentage : customTip || 0;
    return (bill * (tip / 100)) / people;
  };

  const calculateTotalPerPerson = () => {
    return bill / people + calculateTipAmount();
  };

  const handleReset = () => {
    setBill(0);
    setPeople(0);
    setTipPercentage(null);
    setCustomTip(null);
    setErrorMessage('');
  };

  return (
    <div className="calculator bg-[var(--white)] flex flex-col justify-between gap-x-12 gap-y-2 md:flex-row rounded-t-3xl md:rounded-b-3xl py-8 px-6 md:px-8">
      <div className="md:w-[46%] w-full">
        <InputWithLabelAndIcon
          icon={<Dollar />}
          label="Bill"
          type="number"
          name="bill"
          placeholder="0"
          value={bill || ''}
          handelChange={handleBillChange}
        />
        <div className="my-10">
          <Label className="mb-4" label="Select Tip %" />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-3">
            {[5, 10, 15, 25, 50].map((percentage) => (
              <TipButton
                key={percentage}
                name={`${percentage}%`}
                className={
                  tipPercentage === percentage ? 'bg-[#9fe8df] text-[var(--very-dark-cyan)]' : ''
                }
                onClick={() => handleTipSelection(percentage)}>
                {percentage}%
              </TipButton>
            ))}
            <Input
              type="number"
              className="placeholder:text-[#547878] placeholder:opacity-100"
              placeholder="Custom"
              value={customTip || ''}
              onChange={handleCustomTipChange}
            />
          </div>
        </div>

        <InputWithLabelAndIcon
          icon={<User />}
          label="Number of People"
          type="number"
          name="people"
          placeholder="0"
          value={people || ''}
          errorMessage={errorMessage}
          handelChange={handlePeopleChange}
        />
      </div>

      <div className="flex-1 bg-[var(--very-dark-cyan)] text-[var(--white)] md:px-8 md:py-12 px-6 pb-6 pt-9 rounded-2xl grid gap-y-8">
        <div>
          <DisplayAmount
            className="mb-5 md:mb-12"
            label="Tip Amount"
            subLabel="person"
            amount={people > 0 ? calculateTipAmount().toFixed(2) : '0.00'}
          />
          <DisplayAmount
            label="Total"
            subLabel="person"
            amount={people > 0 ? calculateTotalPerPerson().toFixed(2) : '0.00'}
          />
        </div>
        <ResetButton className="self-end" disabled={isDisabled} onClick={handleReset} name="reset">
          RESET
        </ResetButton>
      </div>
    </div>
  );
};

export default TipCalculator;
