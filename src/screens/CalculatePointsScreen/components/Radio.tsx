import styles from "../styles.module.scss";

interface RadioOption {
  value: number | string;
  label: string;
  marquee?: boolean;
}

interface RadioProps {
  value: number | string;
  options: RadioOption[];
  onChange: (value: number | string) => void;
  style?: React.CSSProperties;
  allowUnselect?: boolean;
}

function Radio({ value, allowUnselect, options, onChange, style }: RadioProps) {
  return (
    <div className={styles.radio} style={style}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={`${styles.radioButton} ${
            value === option.value ? styles.active : styles.inactive
          }`}
          onClick={() => {
            if (allowUnselect && value === option.value) {
              onChange("");
            } else {
              onChange(option.value);
            }
          }}
        >
          {option.marquee && (
            <div className={styles.marquee}>{option.label}</div>
          )}
          {!option.marquee && option.label}
        </button>
      ))}
    </div>
  );
}

export default Radio;
