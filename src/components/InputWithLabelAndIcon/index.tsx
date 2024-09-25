import styles from './styles.module.css';

interface InputWithLabelAndIconProps {
  label: string;
  icon: React.ReactNode;
  type?: 'number' | 'text';
  name: string;
  placeholder: string;
}

const InputWithLabelAndIcon = ({
  label,
  icon,
  type = 'number',
  name,
  placeholder,
}: InputWithLabelAndIconProps) => {
  return (
    <div className={styles.container}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <div className={styles.inputContainer}>
        <span className={styles.icon}>{icon}</span>
        <input
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          className={styles.input}
          min={0}
        />
      </div>
    </div>
  );
};

export default InputWithLabelAndIcon;
