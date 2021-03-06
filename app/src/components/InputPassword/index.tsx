import { InputHTMLAttributes, useState } from 'react'
import { FiEye, FiEyeOff, FiLock } from 'react-icons/fi'
import styles from './styles.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string
  label: string
}

export default function InputPassword({
  placeholder,
  label,
  ...rest
}: InputProps) {
  const [focusedInput, setFocusedInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  function handleFocusInput(selected: string) {
    setFocusedInput(selected)
  }

  function handleTogglePasswordState() {
    setShowPassword(!showPassword)
  }

  return (
    <div className={styles.input__container} id={
      focusedInput === label ? styles.active : styles.disabled
    }>
      <FiLock size="25px" />
      <div>
        <label htmlFor={`input__id__${label}`}>{label}</label>
        <input
          required
          {...rest}
          type={showPassword ? "text" : "password"}
          onFocus={() => handleFocusInput(label)}
          onBlur={() => handleFocusInput('')}
          placeholder={placeholder}
          id={`input__id__${label}`}
        />
      </div>
      {showPassword ?
        <FiEye
          data-testid="eye-on"
          size="25px"
          onClick={() => handleTogglePasswordState()}
        /> :
        <FiEyeOff
          data-testid="eye-off"
          size="25px"
          onClick={() => handleTogglePasswordState()}
        />}
    </div>
  )
}
