import { cn } from '../../lib/utils';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  name?: string;
  label: string;
}

const Label = ({ name, label, className }: LabelProps) => {
  return (
    <label htmlFor={name} className={cn('text-[var(--dark-grayish-cyan)] block', className)}>
      {label}
    </label>
  );
};

export default Label;
