import { cn } from '../../lib/utils';

interface DisplayAmountProps extends React.ComponentPropsWithoutRef<'div'> {
  label: string;
  subLabel: string;
  amount: string;
}

const DisplayAmount = ({ className, label, subLabel, amount }: DisplayAmountProps) => {
  return (
    <div className={cn('flex justify-between', className)}>
      <div className="grid">
        <span>{label}</span>
        <span className="text-sm text-[var(--grayish-cyan)]">/ {subLabel}</span>
      </div>
      <span id="tip-amount" className="text-4xl md:text-5xl text-[var(--strong-cyan)]">
        ${amount}
      </span>
    </div>
  );
};

export default DisplayAmount;
