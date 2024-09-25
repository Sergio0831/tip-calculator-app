import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import User from '../Icons/User';
import Dollar from '../Icons/Dollar';
import ResetButton from '../ResetButton';
import { cn } from '../../lib/utils';

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
    <div
      className={cn(
        styles.calculator,
        ' md:flex-row rounded-t-3xl md:rounded-b-3xl py-8 px-6 md:px-8',
      )}>
      <div className="md:w-[46%] w-full">
        <label htmlFor="bill">Bill</label>
        <div className={styles['input-wrapper']}>
          <Dollar className={styles.icon} />
          <input
            type="number"
            id="bill"
            placeholder="0"
            value={bill || ''}
            min={0}
            onChange={handleBillChange}
          />
        </div>

        <div className={styles.tips}>
          <label className={styles['tips-label']}>Select Tip %</label>
          <div className={styles['tip-buttons']}>
            {[5, 10, 15, 25, 50].map((percentage) => (
              <button
                key={percentage}
                className={`${styles['tip-btn']} ${
                  tipPercentage === percentage ? styles.active : ''
                } `}
                onClick={() => handleTipSelection(percentage)}>
                {percentage}%
              </button>
            ))}
            <input
              type="number"
              className={styles['custom-tip']}
              placeholder="Custom"
              value={customTip || ''}
              min={0}
              onChange={handleCustomTipChange}
            />
          </div>
        </div>

        <div className={styles.people}>
          <label htmlFor="people">Number of People</label>
          {errorMessage && <small className={styles['error-message']}>{errorMessage}</small>}
        </div>
        <div className={styles['input-wrapper']}>
          <User className={styles.icon} />
          <input
            type="number"
            id="people"
            placeholder="0"
            value={people || ''}
            min={0}
            className={cn('', errorMessage && 'border-[var(--error)]')}
            onChange={handlePeopleChange}
          />
        </div>
      </div>

      <div className="flex-1 bg-[var(--very-dark-cyan)] text-[var(--white)] md:px-8 md:py-12 px-6 pb-6 pt-9 rounded-2xl grid gap-y-8">
        <div>
          <div className="flex justify-between mb-5 md:mb-12">
            <div className="grid">
              <span>Tip Amount</span>
              <span className="text-sm text-[var(--grayish-cyan)]">/ person</span>
            </div>
            <span id="tip-amount" className="text-4xl md:text-5xl text-[var(--strong-cyan)]">
              ${people > 0 ? calculateTipAmount().toFixed(2) : '0.00'}
            </span>
          </div>
          <div className="flex justify-between">
            <div className="grid">
              <span>Total</span>
              <span className="text-sm text-[var(--grayish-cyan)]">/ person</span>
            </div>
            <span id="total" className="text-4xl md:text-5xl text-[var(--strong-cyan)]">
              ${people > 0 ? calculateTotalPerPerson().toFixed(2) : '0.00'}
            </span>
          </div>
        </div>
        <ResetButton className="self-end" disabled={isDisabled} onClick={handleReset} name="reset">
          RESET
        </ResetButton>
      </div>
    </div>
  );
};

export default TipCalculator;
