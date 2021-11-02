import { InputHTMLAttributes, useState } from 'react'
import styles from './styles.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string
  label: string
}

export default function Input({ placeholder, label, ...rest }: InputProps) {
  const [focusedInput, setFocusedInput] = useState('')

  function handleFocusInput(selected: string) {
    setFocusedInput(selected)
  }

  return (
    <div className={styles.input__container}>
      <label htmlFor='input__id'>{label}</label>
      <input
        {...rest}
        className={
          focusedInput === label || rest.value ? styles.active : styles.disabled
        }
        onFocus={() => handleFocusInput(label)}
        onBlur={() => handleFocusInput('')}
        placeholder={placeholder}
        id='input__id'
      />
    </div>
  )
}
