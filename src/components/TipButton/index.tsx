import { cn } from '../../lib/utils';

const TipButton = ({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={cn(
        'transition-colors outline-none focus-visible:bg-[#9fe8df] focus-visible:text-[var(--very-dark-cyan)] hover:bg-[#9fe8df] hover:text-[var(--very-dark-cyan)] h-12 rounded-md bg-[var(--very-dark-cyan)] text-[var(--white)] py-2 px-4 text-2xl',
        className,
      )}
      {...props}
    />
  );
};

export default TipButton;
