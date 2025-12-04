import { forwardRef } from "react";
import PropTypes from "prop-types";
import styles from "./Input.module.css";

const Input = forwardRef(
  (
    {
      type = "text",
      placeholder,
      name,
      label,
      required = false,
      disabled = false,
      ...props
    },
    ref
  ) => {
    return (
      <div className={styles.inputGroup}>
        {label && (
          <label htmlFor={name} className={styles.label}>
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          name={name}
          id={name}
          required={required}
          disabled={disabled}
          className={styles.input}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Input;
