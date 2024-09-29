import { cn } from '../../lib/utils';
import Input from '../Input';
import Label from '../Label';

interface InputWithLabelAndIconProps {
  label: string;
  icon: React.ReactNode;
  type?: 'number' | 'text';
  name: string;
  value: string | number;
  placeholder: string;
  errorMessage?: string;
  handelChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputWithLabelAndIcon = ({
  label,
  icon,
  type = 'number',
  name,
  value,
  placeholder,
  errorMessage,
  handelChange,
}: InputWithLabelAndIconProps) => {
  return (
    <>
      <div className="flex justify-between">
        <Label label={label} name={name} className="mb-2" />
        {errorMessage && <small className="text-[var(--error)]">{errorMessage}</small>}
      </div>
      <div className="relative flex items-center">
        <span className="absolute left-4">{icon}</span>
        <Input
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          className={cn(
            errorMessage && 'border-2 border-[var(--error)] focus:border-[var(--error)]',
          )}
          value={value}
          onChange={handelChange}
        />
      </div>
    </>
  );
};

export default InputWithLabelAndIcon;
