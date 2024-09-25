import { cn } from '../../lib/utils';

const ResetButton = ({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      type="reset"
      aria-label="reset"
      className={cn(
        'transition-colors bg-[var(--strong-cyan)] text-[var(--very-dark-cyan)] text-xl py-2 px-8 h-12 rounded hover:bg-[#9FE8DF] focus-visible:bg-[#9FE8DF] outline-none disabled:bg-[#0D686D] disabled:text-[#00474B]',
        className,
      )}
      {...props}>
      {children}
    </button>
  );
};

export default ResetButton;
