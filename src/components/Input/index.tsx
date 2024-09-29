import { cn } from '../../lib/utils';

const Input = ({ className, type, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className={cn(
        'transition-colors border-2 border-[var(--very-light-grayish-cyan)] focus:border-[var(--strong-cyan)] outline-none placeholder:text-2xl text-[var(--very-dark-cyan)] rounded-md text-2xl focus:caret-[var(--strong-cyan)] w-full h-12 bg-[var(--very-light-grayish-cyan)] py-2 px-4',
        className,
      )}
      type={type}
      {...props}
    />
  );
};

export default Input;
